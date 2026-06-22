import { useEffect, useMemo, useState, type ReactNode } from "react";

import { useTheme } from "../../theme/ThemeProvider";
import {
  fetchRepoFileContent,
  fetchRepoTree,
  findFirstFilePath,
  flattenFilePaths,
  toGitHubFileUrl,
  toGitHubRepoUrl,
  type RepoNode,
} from "./githubRepo";
import { dsaRepoSource } from "./repoSources";

type TreeItemProps = {
  node: RepoNode;
  depth: number;
  expandedPaths: Record<string, boolean>;
  onToggleDirectory: (path: string) => void;
  selectedPath: string;
  onSelectFile: (path: string) => void;
  isDark: boolean;
};

type FileKind = "markdown" | "code" | "text";
type ViewerMode = "preview" | "raw";
type MarkdownBlock =
  | { type: "heading"; level: number; content: string }
  | { type: "paragraph"; content: string }
  | { type: "list"; items: string[]; ordered: boolean }
  | { type: "code"; content: string; language: string };

const markdownExtensions = new Set([".md", ".markdown"]);
const codeExtensions = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".json",
  ".py",
  ".java",
  ".cpp",
  ".c",
  ".go",
  ".rs",
]);

function getFileExtension(path: string) {
  const dotIndex = path.lastIndexOf(".");
  return dotIndex >= 0 ? path.slice(dotIndex).toLowerCase() : "";
}

function getFileKind(path: string): FileKind {
  const extension = getFileExtension(path);

  if (markdownExtensions.has(extension)) {
    return "markdown";
  }

  if (codeExtensions.has(extension)) {
    return "code";
  }

  return "text";
}

function getLanguageLabel(path: string) {
  const extension = getFileExtension(path).replace(".", "");
  return extension ? extension.toUpperCase() : "TEXT";
}

function parseMarkdownBlocks(content: string): MarkdownBlock[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];
  let listOrdered = false;
  let inCodeBlock = false;
  let codeLanguage = "";
  let codeLines: string[] = [];

  const flushParagraph = () => {
    if (!paragraphBuffer.length) {
      return;
    }

    blocks.push({
      type: "paragraph",
      content: paragraphBuffer.join(" ").trim(),
    });
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!listBuffer.length) {
      return;
    }

    blocks.push({
      type: "list",
      items: [...listBuffer],
      ordered: listOrdered,
    });
    listBuffer = [];
  };

  const flushCode = () => {
    if (!codeLines.length) {
      return;
    }

    blocks.push({
      type: "code",
      content: codeLines.join("\n"),
      language: codeLanguage || "text",
    });
    codeLines = [];
    codeLanguage = "";
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("```")) {
      if (inCodeBlock) {
        flushCode();
        inCodeBlock = false;
      } else {
        flushParagraph();
        flushList();
        inCodeBlock = true;
        codeLanguage = trimmedLine.replace(/^```/, "").trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    if (!trimmedLine) {
      flushParagraph();
      flushList();
      return;
    }

    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        content: headingMatch[2],
      });
      return;
    }

    const unorderedListMatch = trimmedLine.match(/^[-*]\s+(.*)$/);
    if (unorderedListMatch) {
      flushParagraph();
      listOrdered = false;
      listBuffer.push(unorderedListMatch[1]);
      return;
    }

    const orderedListMatch = trimmedLine.match(/^\d+\.\s+(.*)$/);
    if (orderedListMatch) {
      flushParagraph();
      listOrdered = true;
      listBuffer.push(orderedListMatch[1]);
      return;
    }

    if (listBuffer.length) {
      flushList();
    }

    paragraphBuffer.push(trimmedLine);
  });

  flushParagraph();
  flushList();
  flushCode();

  return blocks;
}

function CodeView({
  content,
  isDark,
  language,
  compact = false,
}: {
  content?: string;
  isDark: boolean;
  language: string;
  compact?: boolean;
}) {
  const safeContent = content ?? "";
  const lines = safeContent.split("\n");

  return (
    <div
      className={
        isDark
          ? "overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/90"
          : "overflow-hidden rounded-2xl border border-slate-200 bg-white"
      }
    >
      <div
        className={
          isDark
            ? "border-b border-slate-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400"
            : "border-b border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500"
        }
      >
        {language}
      </div>
      <div className={compact ? "max-h-[22rem] overflow-auto" : "max-h-[70vh] overflow-auto"}>
        {lines.map((line, index) => (
          <div
            key={`${index}-${line}`}
            className={
              isDark
                ? "grid grid-cols-[48px_minmax(0,1fr)] border-b border-slate-900/70 text-sm last:border-b-0"
                : "grid grid-cols-[48px_minmax(0,1fr)] border-b border-slate-100 text-sm last:border-b-0"
            }
          >
            <span
              className={
                isDark
                  ? "select-none px-3 py-2 text-right text-xs text-slate-500"
                  : "select-none px-3 py-2 text-right text-xs text-slate-400"
              }
            >
              {index + 1}
            </span>
            <code
              className={
                isDark
                  ? "whitespace-pre-wrap break-words px-3 py-2 leading-6 text-slate-300"
                  : "whitespace-pre-wrap break-words px-3 py-2 leading-6 text-slate-700"
              }
            >
              {line || " "}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarkdownPreview({ content, isDark }: { content: string; isDark: boolean }) {
  const blocks = useMemo(() => parseMarkdownBlocks(content), [content]);

  const renderBlock = (block: MarkdownBlock, index: number): ReactNode => {
    if (block.type === "heading") {
      const classNameByLevel = {
        1: "text-3xl font-semibold tracking-tight",
        2: "text-2xl font-semibold tracking-tight",
        3: "text-xl font-semibold",
        4: "text-lg font-semibold",
        5: "text-base font-semibold uppercase tracking-[0.18em]",
        6: "text-sm font-semibold uppercase tracking-[0.18em]",
      } as const;

      return (
        <h4
          key={`${block.type}-${index}`}
          className={`${classNameByLevel[block.level as keyof typeof classNameByLevel] ?? classNameByLevel[4]} ${
            isDark ? "text-slate-100" : "text-slate-900"
          }`}
        >
          {block.content}
        </h4>
      );
    }

    if (block.type === "paragraph") {
      return (
        <p
          key={`${block.type}-${index}`}
          className={isDark ? "text-sm leading-7 text-slate-300" : "text-sm leading-7 text-slate-700"}
        >
          {block.content}
        </p>
      );
    }

    if (block.type === "list") {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag
          key={`${block.type}-${index}`}
          className={
            isDark
              ? "space-y-2 pl-5 text-sm leading-7 text-slate-300"
              : "space-y-2 pl-5 text-sm leading-7 text-slate-700"
          }
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ListTag>
      );
    }

    return (
      <CodeView
        key={`${block.type}-${index}`}
        content={block.content}
        isDark={isDark}
        language={(block.language || "text").toUpperCase()}
        compact
      />
    );
  };

  return <div className="space-y-4">{blocks.map((block, index) => renderBlock(block, index))}</div>;
}

function getParentPaths(filePath: string) {
  const segments = filePath.split("/").filter(Boolean);
  return segments.slice(0, -1).map((_, index) => segments.slice(0, index + 1).join("/"));
}

function TreeItem({
  node,
  depth,
  expandedPaths,
  onToggleDirectory,
  selectedPath,
  onSelectFile,
  isDark,
}: TreeItemProps) {
  const isDirectory = node.type === "directory";
  const isExpanded = expandedPaths[node.path] ?? depth < 1;
  const isSelected = selectedPath === node.path;
  const itemPadding = 14 + depth * 14;

  if (isDirectory) {
    return (
      <div>
        <button
          type="button"
          onClick={() => onToggleDirectory(node.path)}
          className={
            isDark
              ? "flex w-full items-center gap-2 rounded-xl py-2 pr-3 text-left text-sm text-slate-200 transition hover:bg-slate-800"
              : "flex w-full items-center gap-2 rounded-xl py-2 pr-3 text-left text-sm text-slate-700 transition hover:bg-slate-100"
          }
          style={{ paddingLeft: itemPadding }}
        >
          <span className={isDark ? "text-slate-400" : "text-slate-500"}>{isExpanded ? "▾" : "▸"}</span>
          <span className="font-medium">{node.name}</span>
        </button>

        {isExpanded ? (
          <div className="space-y-1">
            {(node.children ?? []).map((child) => (
              <TreeItem
                key={child.path}
                node={child}
                depth={depth + 1}
                expandedPaths={expandedPaths}
                onToggleDirectory={onToggleDirectory}
                selectedPath={selectedPath}
                onSelectFile={onSelectFile}
                isDark={isDark}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelectFile(node.path)}
      className={
        isSelected
          ? isDark
            ? "flex w-full items-center gap-2 rounded-xl bg-cyan-400/15 py-2 pr-3 text-left text-sm font-medium text-cyan-200 transition"
            : "flex w-full items-center gap-2 rounded-xl bg-cyan-50 py-2 pr-3 text-left text-sm font-medium text-cyan-700 transition"
          : isDark
            ? "flex w-full items-center gap-2 rounded-xl py-2 pr-3 text-left text-sm text-slate-300 transition hover:bg-slate-800"
            : "flex w-full items-center gap-2 rounded-xl py-2 pr-3 text-left text-sm text-slate-600 transition hover:bg-slate-100"
      }
      style={{ paddingLeft: itemPadding + 16 }}
    >
      <span className={isDark ? "text-slate-500" : "text-slate-400"}>•</span>
      <span className="truncate">{node.name}</span>
    </button>
  );
}

export function DsaExplorer() {
  const { isDark } = useTheme();
  const [treeRoot, setTreeRoot] = useState<RepoNode | null>(null);
  const [treeError, setTreeError] = useState("");
  const [isTreeLoading, setIsTreeLoading] = useState(true);
  const [expandedPaths, setExpandedPaths] = useState<Record<string, boolean>>({});
  const [selectedFilePath, setSelectedFilePath] = useState("");
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [viewerMode, setViewerMode] = useState<ViewerMode>("raw");

  useEffect(() => {
    let isCancelled = false;

    async function loadTree() {
      setIsTreeLoading(true);
      setTreeError("");

      try {
        const root = await fetchRepoTree(dsaRepoSource);

        if (isCancelled) {
          return;
        }

        const initialPath = findFirstFilePath(root);
        const initialExpandedPaths = getParentPaths(initialPath).reduce<Record<string, boolean>>(
          (accumulator, path) => {
            accumulator[path] = true;
            return accumulator;
          },
          {},
        );

        setTreeRoot(root);
        setExpandedPaths(initialExpandedPaths);
        setSelectedFilePath(initialPath);
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setTreeError(error instanceof Error ? error.message : "Unable to load DSA repository");
      } finally {
        if (!isCancelled) {
          setIsTreeLoading(false);
        }
      }
    }

    loadTree();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function loadFile() {
      if (!selectedFilePath || fileContents[selectedFilePath]) {
        return;
      }

      setIsFileLoading(true);
      setFileError("");

      try {
        const content = await fetchRepoFileContent(dsaRepoSource, selectedFilePath);

        if (isCancelled) {
          return;
        }

        setFileContents((current) => ({
          ...current,
          [selectedFilePath]: content,
        }));
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setFileError(error instanceof Error ? error.message : "Unable to load file content");
      } finally {
        if (!isCancelled) {
          setIsFileLoading(false);
        }
      }
    }

    loadFile();

    return () => {
      isCancelled = true;
    };
  }, [fileContents, selectedFilePath]);

  useEffect(() => {
    const nextKind = getFileKind(selectedFilePath);
    setViewerMode(nextKind === "markdown" ? "preview" : "raw");
  }, [selectedFilePath]);

  const fileCount = useMemo(() => (treeRoot ? flattenFilePaths(treeRoot).length : 0), [treeRoot]);
  const selectedContent = selectedFilePath ? fileContents[selectedFilePath] ?? "" : "";
  const hasSelectedContent = Boolean(selectedFilePath && fileContents[selectedFilePath] !== undefined);
  const selectedFileKind = getFileKind(selectedFilePath);
  const selectedLanguage = getLanguageLabel(selectedFilePath);

  const panelClass = isDark
    ? "rounded-3xl border border-slate-800 bg-slate-900/80 shadow-lg shadow-slate-950/20"
    : "rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/70";

  const codePanelClass = isDark
    ? "rounded-2xl border border-slate-800 bg-slate-950/90"
    : "rounded-2xl border border-slate-200 bg-slate-50";

  const handleToggleDirectory = (path: string) => {
    setExpandedPaths((current) => ({
      ...current,
      [path]: !current[path],
    }));
  };

  const handleSelectFile = (filePath: string) => {
    setSelectedFilePath(filePath);
    setExpandedPaths((current) => {
      const next = { ...current };
      getParentPaths(filePath).forEach((path) => {
        next[path] = true;
      });
      return next;
    });
  };

  return (
    <div className="mt-4 grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className={`h-fit lg:sticky lg:top-24 ${panelClass}`}>
        <div className={isDark ? "border-b border-slate-800 p-4" : "border-b border-slate-200 p-4"}>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={toGitHubRepoUrl(dsaRepoSource)}
              target="_blank"
              rel="noreferrer"
              className={
                isDark
                  ? "rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300"
                  : "rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:border-cyan-300"
              }
            >
              Open repo
            </a>
            <span
              className={
                isDark
                  ? "rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300"
                  : "rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
              }
            >
              {fileCount} files
            </span>
          </div>
        </div>

        <div className="max-h-[72vh] overflow-auto p-3">
          {isTreeLoading ? (
            <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>Loading repo structure...</p>
          ) : treeError ? (
            <div className={isDark ? "rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200" : "rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"}>
              {treeError}
            </div>
          ) : treeRoot?.children?.length ? (
            <div className="space-y-1">
              {treeRoot.children.map((node) => (
                <TreeItem
                  key={node.path}
                  node={node}
                  depth={0}
                  expandedPaths={expandedPaths}
                  onToggleDirectory={handleToggleDirectory}
                  selectedPath={selectedFilePath}
                  onSelectFile={handleSelectFile}
                  isDark={isDark}
                />
              ))}
            </div>
          ) : (
            <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>No supported files found.</p>
          )}
        </div>
      </aside>

      <section>
        <article className={`${panelClass} p-5 sm:p-6`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className={isDark ? "text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300" : "text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700"}>
                DSA
              </p>
              <h3 className="mt-2 break-all text-xl font-semibold">
                {selectedFilePath || "Choose a file from the DSA sidebar"}
              </h3>
              {selectedFilePath ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  <span
                    className={
                      isDark
                        ? "rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300"
                        : "rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600"
                    }
                  >
                    {selectedFileKind}
                  </span>
                  <span
                    className={
                      isDark
                        ? "rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200"
                        : "rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700"
                    }
                  >
                    {selectedLanguage}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {selectedFileKind === "markdown" && selectedFilePath ? (
                <>
                  <button
                    type="button"
                    onClick={() => setViewerMode("preview")}
                    className={
                      viewerMode === "preview"
                        ? isDark
                          ? "rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-sm font-semibold text-cyan-200"
                          : "rounded-full border border-slate-900 bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white"
                        : isDark
                          ? "rounded-full border border-slate-700 px-3 py-1.5 text-sm font-semibold text-slate-300"
                          : "rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600"
                    }
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewerMode("raw")}
                    className={
                      viewerMode === "raw"
                        ? isDark
                          ? "rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-sm font-semibold text-cyan-200"
                          : "rounded-full border border-slate-900 bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white"
                        : isDark
                          ? "rounded-full border border-slate-700 px-3 py-1.5 text-sm font-semibold text-slate-300"
                          : "rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600"
                    }
                  >
                    Raw
                  </button>
                </>
              ) : null}

              {selectedFilePath ? (
                <a
                  href={toGitHubFileUrl(dsaRepoSource, selectedFilePath)}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    isDark
                      ? "rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
                      : "rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                  }
                >
                  View on GitHub
                </a>
              ) : null}
            </div>
          </div>

          <div className={`mt-4 ${codePanelClass}`}>
            {isFileLoading ? (
              <div className="p-5">
                <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>Loading file content...</p>
              </div>
            ) : fileError ? (
              <div className={isDark ? "m-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200" : "m-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"}>
                {fileError}
              </div>
            ) : selectedFilePath && !hasSelectedContent ? (
              <div className="p-5">
                <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>
                  Loading file content...
                </p>
              </div>
            ) : selectedFilePath ? (
              <div className="p-5">
                {selectedFileKind === "markdown" && viewerMode === "preview" ? (
                  <MarkdownPreview content={selectedContent} isDark={isDark} />
                ) : (
                  <CodeView content={selectedContent} isDark={isDark} language={selectedLanguage} />
                )}
              </div>
            ) : (
              <div className="p-5">
                <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>
                  Select any file from the repo tree to inspect its content here.
                </p>
              </div>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}

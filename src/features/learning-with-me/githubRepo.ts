import type { LearningRepoSource } from "./repoSources";

type GitHubTreeEntry = {
  path: string;
  type: "tree" | "blob";
};

export type RepoNode = {
  name: string;
  path: string;
  type: "directory" | "file";
  children?: RepoNode[];
};

const ignoredNames = new Set([".DS_Store"]);

function getExtension(path: string) {
  const dotIndex = path.lastIndexOf(".");
  return dotIndex >= 0 ? path.slice(dotIndex).toLowerCase() : "";
}

function isAllowedFile(path: string, source: LearningRepoSource) {
  const fileName = path.split("/").pop() ?? path;

  if (ignoredNames.has(fileName) || fileName.startsWith(".")) {
    return false;
  }

  const extension = getExtension(path);
  return source.contentExtensions.includes(extension);
}

function createDirectoryNode(name: string, path: string): RepoNode {
  return {
    name,
    path,
    type: "directory",
    children: [],
  };
}

function createFileNode(name: string, path: string): RepoNode {
  return {
    name,
    path,
    type: "file",
  };
}

function sortNodes(nodes: RepoNode[]) {
  nodes.sort((left, right) => {
    if (left.type !== right.type) {
      return left.type === "directory" ? -1 : 1;
    }

    return left.name.localeCompare(right.name);
  });

  nodes.forEach((node) => {
    if (node.children) {
      sortNodes(node.children);
    }
  });
}

export function buildRepoTree(entries: GitHubTreeEntry[], source: LearningRepoSource) {
  const root = createDirectoryNode(source.repo, "");

  entries.forEach((entry) => {
    if (entry.type !== "blob" || !isAllowedFile(entry.path, source)) {
      return;
    }

    const segments = entry.path.split("/").filter(Boolean);
    let currentNode = root;

    segments.forEach((segment, index) => {
      const nextPath = segments.slice(0, index + 1).join("/");
      const isFile = index === segments.length - 1;

      if (!currentNode.children) {
        currentNode.children = [];
      }

      let nextNode = currentNode.children.find((child) => child.path === nextPath);

      if (!nextNode) {
        nextNode = isFile ? createFileNode(segment, nextPath) : createDirectoryNode(segment, nextPath);
        currentNode.children.push(nextNode);
      }

      currentNode = nextNode;
    });
  });

  sortNodes(root.children ?? []);
  return root;
}

export function flattenFilePaths(node: RepoNode): string[] {
  if (node.type === "file") {
    return [node.path];
  }

  return (node.children ?? []).flatMap((child) => flattenFilePaths(child));
}

export function findFirstFilePath(root: RepoNode) {
  const filePaths = flattenFilePaths(root);
  const preferredReadme = filePaths.find((path) => /README\.md$/i.test(path));
  return preferredReadme ?? filePaths[0] ?? "";
}

export async function fetchRepoTree(source: LearningRepoSource) {
  const response = await fetch(
    `https://api.github.com/repos/${source.owner}/${source.repo}/git/trees/${source.branch}?recursive=1`,
  );

  if (!response.ok) {
    throw new Error(`GitHub tree request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as { tree?: GitHubTreeEntry[] };
  return buildRepoTree(payload.tree ?? [], source);
}

export async function fetchRepoFileContent(source: LearningRepoSource, filePath: string) {
  const response = await fetch(
    `https://raw.githubusercontent.com/${source.owner}/${source.repo}/${source.branch}/${filePath}`,
  );

  if (!response.ok) {
    throw new Error(`GitHub file request failed with status ${response.status}`);
  }

  return response.text();
}

export function toGitHubRepoUrl(source: LearningRepoSource) {
  return `https://github.com/${source.owner}/${source.repo}`;
}

export function toGitHubFileUrl(source: LearningRepoSource, filePath: string) {
  return `${toGitHubRepoUrl(source)}/blob/${source.branch}/${filePath}`;
}

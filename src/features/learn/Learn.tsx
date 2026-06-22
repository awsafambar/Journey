import { useEffect, useMemo, useState } from "react";

import { labItems, labSections } from "./labContent";
import { useTheme } from "../../theme/ThemeProvider";

const initialItemId = labItems[0]?.id ?? "";
const overviewTab = "overview";
const previewTab = "preview";
const codeTab = "code";

export const Learn = () => {
  const [selectedId, setSelectedId] = useState(initialItemId);
  const [activeTab, setActiveTab] = useState(overviewTab);
  const [activeCodeFileIndex, setActiveCodeFileIndex] = useState(0);
  const { isDark } = useTheme();

  const selectedItem = useMemo(
    () => labItems.find((item) => item.id === selectedId) ?? labItems[0],
    [selectedId],
  );

  useEffect(() => {
    setActiveTab(overviewTab);
    setActiveCodeFileIndex(0);
  }, [selectedId]);

  const panelClass = isDark
    ? "rounded-3xl border border-slate-800 bg-slate-900/80 shadow-lg shadow-slate-950/20"
    : "rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/70";

  const selectedCodeFile = selectedItem?.codeFiles[activeCodeFileIndex] ?? selectedItem?.codeFiles[0];
  const availableTabs = [
    { id: overviewTab, label: selectedItem?.kind === "note" ? "Notes" : "Guide" },
    ...(selectedItem?.preview ? [{ id: previewTab, label: "Preview" }] : []),
    ...(selectedItem?.codeFiles.length ? [{ id: codeTab, label: "View Code" }] : []),
  ];

  return (
    <div className={isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}>
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className={`h-fit lg:sticky lg:top-24 ${panelClass}`}>
            <div className="p-3">
              <div className="px-2 pb-3">
                <p className={isDark ? "text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300" : "text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700"}>
                  Frontend Labs
                </p>
              </div>
              {labSections.map((section) => {
                const sectionItems = labItems.filter((item) => item.sectionId === section.id);

                return (
                  <div key={section.id} className="mb-4 last:mb-0">
                    <div className="px-2 pb-2">
                      <p className={isDark ? "text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300" : "text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-700"}>
                        {section.title}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      {sectionItems.map((item) => {
                        const isActive = item.id === selectedItem?.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setSelectedId(item.id)}
                            className={[
                              "w-full rounded-2xl px-3 py-2.5 text-left transition",
                              isDark
                                ? isActive
                                  ? "bg-slate-800 text-white"
                                  : "bg-slate-950/70 text-slate-300 hover:bg-slate-800/70"
                                : isActive
                                  ? "bg-slate-900 text-white"
                                  : "bg-slate-50 text-slate-700 hover:bg-slate-100",
                            ].join(" ")}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm font-semibold">{item.title}</span>
                              <span className={isActive ? "rounded-full bg-white/15 px-2 py-1 text-[11px] uppercase tracking-[0.2em]" : isDark ? "rounded-full bg-slate-800 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-400" : "rounded-full bg-white px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-500"}>
                                {item.kind}
                              </span>
                            </div>
                            <p className={isActive ? "mt-1.5 text-sm leading-5 text-white/80" : isDark ? "mt-1.5 text-sm leading-5 text-slate-400" : "mt-1.5 text-sm leading-5 text-slate-500"}>
                              {item.summary}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {selectedItem ? (
            <div className="space-y-4">
              <article className={`${panelClass} p-5 sm:p-6`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={isDark ? "rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200" : "rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700"}>
                    {selectedItem.kind}
                  </span>
                  {selectedItem.focus.map((tag) => (
                    <span
                      key={tag}
                      className={isDark ? "rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300" : "rounded-full border border-slate-200 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600"}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {availableTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={
                        activeTab === tab.id
                          ? isDark
                            ? "rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-sm font-semibold text-cyan-200"
                            : "rounded-full border border-slate-900 bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white"
                          : isDark
                            ? "rounded-full border border-slate-700 px-3 py-1.5 text-sm font-semibold text-slate-300"
                            : "rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600"
                      }
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <h2 className="mt-4 text-2xl font-semibold">{selectedItem.title}</h2>
                <p className={isDark ? "mt-2 max-w-3xl text-sm leading-6 text-slate-300" : "mt-2 max-w-3xl text-sm leading-6 text-slate-600"}>
                  {selectedItem.summary}
                </p>

                <div
                  className={
                    isDark
                      ? "mt-4 rounded-2xl border border-slate-800 bg-slate-950/90 p-4"
                      : "mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  }
                >
                  {activeTab === overviewTab ? (
                    <div className="space-y-4">
                      {selectedItem.instructions?.length ? (
                        <div className="space-y-2">
                          {selectedItem.instructions.map((instruction) => (
                            <p
                              key={instruction}
                              className={isDark ? "text-sm leading-6 text-slate-300" : "text-sm leading-6 text-slate-700"}
                            >
                              {instruction}
                            </p>
                          ))}
                        </div>
                      ) : null}

                      {selectedItem.note ? (
                        <pre
                          className={
                            isDark
                              ? "overflow-x-auto whitespace-pre-wrap break-words text-sm leading-6 text-slate-300"
                              : "overflow-x-auto whitespace-pre-wrap break-words text-sm leading-6 text-slate-700"
                          }
                        >
                          {selectedItem.note}
                        </pre>
                      ) : (
                        <p className={isDark ? "text-sm leading-6 text-slate-300" : "text-sm leading-6 text-slate-700"}>
                          Use the preview and code tabs to inspect this lab.
                        </p>
                      )}
                    </div>
                  ) : null}

                  {activeTab === previewTab && selectedItem.preview ? (
                    <div
                      className={
                        isDark
                          ? "overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 p-4"
                          : "overflow-hidden rounded-2xl border border-slate-200 bg-white p-4"
                      }
                    >
                      {selectedItem.preview}
                    </div>
                  ) : null}

                  {activeTab === codeTab && selectedCodeFile ? (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.codeFiles.map((file, index) => (
                          <button
                            key={file.label}
                            type="button"
                            onClick={() => setActiveCodeFileIndex(index)}
                            className={
                              activeCodeFileIndex === index
                                ? isDark
                                  ? "rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200"
                                  : "rounded-full border border-slate-900 bg-slate-900 px-3 py-1 text-xs font-semibold text-white"
                                : isDark
                                  ? "rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300"
                                  : "rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
                            }
                          >
                            {file.label}
                          </button>
                        ))}
                      </div>
                      <pre
                        className={
                          isDark
                            ? "max-h-[60vh] overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-sm leading-6 text-slate-300"
                            : "max-h-[60vh] overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700"
                        }
                      >
                        {selectedCodeFile.content}
                      </pre>
                    </div>
                  ) : null}
                </div>
              </article>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

import { useState } from "react";

import { DsaExplorer } from "./DsaExplorer";
import { useTheme } from "../../theme/ThemeProvider";

const dsaView = "dsa";
const lldView = "lld";
const hldView = "hld";

export function LearningWithMe() {
  const [activeView, setActiveView] = useState(dsaView);
  const { isDark } = useTheme();

  const learningTracks = [
    {
      id: dsaView,
      title: "DSA",
    },
    {
      id: lldView,
      title: "LLD",
    },
    {
      id: hldView,
      title: "HLD",
    },
  ];

  const pageClass = isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900";
  const cardClass = isDark
    ? "rounded-3xl border border-slate-800 bg-slate-900/80 shadow-lg shadow-slate-950/20"
    : "rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/70";

  return (
    <div className={pageClass}>
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div>
          <p className={isDark ? "text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300" : "text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700"}>
            Learning With Me
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {learningTracks.map((track) => (
            <button
              key={track.id}
              type="button"
              onClick={() => setActiveView(track.id)}
              className={
                activeView === track.id
                  ? isDark
                    ? "rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200"
                    : "rounded-full border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                  : isDark
                    ? "rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300"
                    : "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600"
              }
            >
              {track.title}
            </button>
          ))}
        </div>

        {activeView === dsaView ? <DsaExplorer /> : null}

        {activeView === lldView || activeView === hldView ? (
          <article className={`${cardClass} mt-4 p-5`}>
            <p className={isDark ? "text-sm leading-6 text-slate-300" : "text-sm leading-6 text-slate-600"}>
              {activeView === lldView ? "LLD section" : "HLD section"} will be added later using
              the same compact structure.
            </p>
          </article>
        ) : null}
      </section>
    </div>
  );
}

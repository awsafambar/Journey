import { useTheme } from "../../theme/ThemeProvider";
import { vlogEntries, vlogsPageConfig } from "./data";

export function Vlogs() {
  const { isDark } = useTheme();
  const pageClass = isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900";
  const cardClass = isDark
    ? "rounded-3xl border border-slate-800 bg-slate-900/80 shadow-lg shadow-slate-950/20"
    : "rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60";
  const mutedText = isDark ? "text-slate-300" : "text-slate-600";
  const subtleText = isDark ? "text-slate-400" : "text-slate-500";
  const accentText = isDark ? "text-cyan-300" : "text-cyan-700";

  return (
    <div className={pageClass}>
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className={`text-sm font-semibold uppercase tracking-[0.28em] ${accentText}`}>
            Vlogs
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {vlogsPageConfig.title}
          </h1>
          <p className={`mt-4 text-base leading-7 sm:text-lg sm:leading-8 ${mutedText}`}>
            {vlogsPageConfig.intro}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {vlogsPageConfig.primaryActionEnabled && vlogsPageConfig.primaryActionUrl ? (
            <a
              href={vlogsPageConfig.primaryActionUrl}
              target="_blank"
              rel="noreferrer"
              className={
                isDark
                  ? "rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                  : "rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              }
            >
              {vlogsPageConfig.primaryActionLabel}
            </a>
          ) : (
            <button
              type="button"
              disabled
              title="Add your channel link later to enable this action."
              className={
                isDark
                  ? "cursor-not-allowed rounded-full border border-slate-700 bg-slate-900/70 px-5 py-2.5 text-sm font-semibold text-slate-400"
                  : "cursor-not-allowed rounded-full border border-slate-200 bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-400"
              }
            >
              {vlogsPageConfig.primaryActionLabel}
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {vlogsPageConfig.workflowCards.map((card) => (
            <article key={card.title} className={`${cardClass} p-5`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentText}`}>
                {card.title}
              </p>
              <p className={`mt-3 text-sm leading-6 ${mutedText}`}>{card.description}</p>
            </article>
          ))}
        </div>

        <section className="mt-6">
          <article className={`${cardClass} p-5 sm:p-6`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className={`text-sm font-semibold uppercase tracking-[0.24em] ${accentText}`}>
                  Video Feed
                </p>
                <p className={`mt-2 text-sm leading-6 ${subtleText}`}>
                  This section is ready for manual vlog entries now and can later connect to YouTube.
                </p>
              </div>
              <span
                className={
                  isDark
                    ? "rounded-full border border-slate-700 px-3 py-1 text-sm font-semibold text-slate-300"
                    : "rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600"
                }
              >
                {vlogEntries.length} entries
              </span>
            </div>

            {vlogEntries.length ? (
              <div className="mt-5 grid gap-4">
                {vlogEntries.map((entry) => (
                  <article
                    key={`${entry.title}-${entry.date}`}
                    className={
                      isDark
                        ? "rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
                        : "rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    }
                  >
                    <div className={`flex flex-wrap items-center gap-3 text-sm ${subtleText}`}>
                      <span>{entry.date}</span>
                      <span className={isDark ? "h-1 w-1 rounded-full bg-slate-600" : "h-1 w-1 rounded-full bg-slate-300"} />
                      <a
                        href={entry.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={accentText}
                      >
                        Watch
                      </a>
                    </div>
                    <h2 className="mt-3 text-xl font-semibold">{entry.title}</h2>
                    <p className={`mt-2 text-sm leading-6 ${mutedText}`}>{entry.summary}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div
                className={
                  isDark
                    ? "mt-5 rounded-2xl border border-dashed border-slate-700 bg-slate-950/70 p-6"
                    : "mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6"
                }
              >
                <p className={`text-sm leading-6 ${mutedText}`}>
                  No videos added yet. When you are ready, manual entries can be added in
                  `src/features/vlogs/data.ts`.
                </p>
              </div>
            )}
          </article>
        </section>
      </section>
    </div>
  );
}

import { certifications, highlights, projects, resumeConfig, skillGroups, strengths } from "../portfolio/data";
import { useTheme } from "../../theme/ThemeProvider";

export function About() {
  const { isDark } = useTheme();

  const pageClass = isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900";
  const cardClass = isDark
    ? "rounded-3xl border border-slate-800 bg-slate-900/80 shadow-lg shadow-slate-950/20"
    : "rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/70";
  const mutedText = isDark ? "text-slate-300" : "text-slate-600";
  const subtleText = isDark ? "text-slate-400" : "text-slate-500";
  const accentText = isDark ? "text-cyan-300" : "text-cyan-700";

  return (
    <div className={pageClass}>
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <article className={`${cardClass} p-5 sm:p-6`}>
            <p className={`text-sm font-semibold uppercase tracking-[0.28em] ${accentText}`}>
              About Me
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Built for real product delivery.</h1>
            <div className={`mt-4 space-y-3 text-[15px] leading-7 ${mutedText}`}>
              {strengths.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
            <div className="mt-5">
              {resumeConfig.enabled ? (
                <a
                  href={resumeConfig.publicPath}
                  download
                  className={
                    isDark
                      ? "inline-flex rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                      : "inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                  }
                >
                  {resumeConfig.label}
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Add your latest CV PDF to enable direct download."
                  className={
                    isDark
                      ? "cursor-not-allowed rounded-full border border-slate-700 bg-slate-900/70 px-5 py-2.5 text-sm font-semibold text-slate-400"
                      : "cursor-not-allowed rounded-full border border-slate-200 bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-400"
                  }
                >
                  {resumeConfig.label}
                </button>
              )}
            </div>
          </article>

          <div className="grid gap-5 sm:grid-cols-3">
            {highlights.map((item) => (
              <article key={item.label} className={`${cardClass} p-5`}>
                <p className={`text-xs uppercase tracking-[0.22em] ${subtleText}`}>{item.label}</p>
                <p className="mt-2.5 text-2xl font-semibold">{item.value}</p>
                <p className={`mt-2 text-sm leading-6 ${mutedText}`}>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <article key={group.title} className={`${cardClass} p-5 sm:p-6`}>
              <h2 className="text-lg font-semibold">{group.title}</h2>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className={
                      isDark
                        ? "rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300"
                        : "rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600"
                    }
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          <section className="space-y-5">
            {projects.map((project) => (
              <article key={project.name} className={`${cardClass} p-5 sm:p-6`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className={`text-sm uppercase tracking-[0.2em] ${subtleText}`}>{project.client}</p>
                    <h2 className="mt-2 text-2xl font-semibold">{project.name}</h2>
                  </div>
                  <p className={`text-sm ${subtleText}`}>{project.duration}</p>
                </div>

                <p className={`mt-3.5 text-[15px] leading-7 ${mutedText}`}>{project.summary}</p>

                <div className="mt-3.5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className={
                        isDark
                          ? "rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300"
                          : "rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600"
                      }
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-4 grid gap-2">
                  {project.impact.map((item) => (
                    <p
                      key={item}
                      className={
                        isDark
                          ? "rounded-2xl bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-300"
                          : "rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
                      }
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <section className="space-y-5">
            <article className={`${cardClass} p-5 sm:p-6`}>
              <p className={`text-sm font-semibold uppercase tracking-[0.28em] ${accentText}`}>
                Education
              </p>
              <p className={`mt-3.5 text-[15px] leading-7 ${mutedText}`}>
                Bachelor of Technology in Information Technology
              </p>
            </article>

            <article className={`${cardClass} p-5 sm:p-6`}>
              <p className={`text-sm font-semibold uppercase tracking-[0.28em] ${accentText}`}>
                Certifications
              </p>
              <div className={`mt-3.5 space-y-3 text-sm leading-6 ${mutedText}`}>
                {certifications.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </article>
          </section>
        </div>
      </section>
    </div>
  );
}

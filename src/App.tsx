import "./App.css";
import { Link } from "react-router-dom";

import { resumeConfig } from "./features/portfolio/data";
import { useTheme } from "./theme/ThemeProvider";

function App() {
  const { isDark } = useTheme();
  const profileImageSrc = "/images/awsaf-profile.png";

  const pageClass = isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900";
  const mutedText = isDark ? "text-slate-300" : "text-slate-600";
  const accentText = isDark ? "text-cyan-300" : "text-cyan-700";
  const homeLinks = [
    { label: "About Me", to: "/about" },
    { label: "Learning With Me", to: "/learning-with-me" },
    { label: "Frontend Labs", to: "/frontend-labs" },
    { label: "Vlogs", to: "/vlogs" },
  ];

  return (
    <div className={`${pageClass} overflow-hidden`}>
      <section className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid w-full items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <p className={`text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[3.25rem] ${accentText}`}>
              Awsaf Ambar
            </p>
            <h1 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]">
              Frontend developer building clean, thoughtful web experiences.
            </h1>
            <p className={`mt-4 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${mutedText}`}>
              I enjoy turning ideas into responsive interfaces that feel simple, useful, and easy
              to trust. I love life, love code, keep learning across the stack, explore Gen AI with
              curiosity, and stay comfortable picking up whatever helps solve the problem well.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {resumeConfig.enabled ? (
                <a
                  href={resumeConfig.publicPath}
                  download
                  className={
                    isDark
                      ? "rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                      : "rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
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
              {homeLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    isDark
                      ? "rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
                      : "rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-100"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative h-[40vh] w-full max-w-[16rem] overflow-hidden sm:h-[46vh] sm:max-w-[18rem] lg:h-[72vh] lg:max-h-[38rem] lg:max-w-[25rem]">
              <img
                src={profileImageSrc}
                alt="Awsaf Ambar"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-[center_top]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

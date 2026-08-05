import "./App.css";
import { Link } from "react-router-dom";

import { resumeConfig } from "./features/portfolio/data";
import { useTheme } from "./theme/ThemeProvider";

const profileImageSrc = "/images/profile.png";

function App() {
  const { isDark } = useTheme();

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
            <h1 className="mt-1 max-w-2xl text-xl font-semibold tracking-tight sm:text-xl lg:text-[1rem] lg:leading-[1.15]">
              Frontend developer building clean, thoughtful web experiences.
            </h1>
            <p className={`mt-4 max-w-xl text-[0.5rem] font-normal leading-7 sm:text-sm sm:leading-7 ${mutedText}`}>
              I enjoy turning ideas into responsive interfaces that feel simple, useful, and easy
              to trust. I love life, love code, keep learning across the stack, explore Gen AI with
              curiosity, and stay comfortable picking up whatever helps solve the problem well.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {homeLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    isDark
                      ? "inline-flex items-center rounded-full border border-slate-700 px-5 py-2.5 text-base font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
                      : "inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-base font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-100"
                  }
                >
                  {item.label}
                </Link>
              ))}
              {resumeConfig.enabled ? (
                <a
                  href={resumeConfig.publicPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    isDark
                      ? "inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-2.5 text-base font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
                      : "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-base font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-100"
                  }
                >
                  <svg className="h-4 w-4 shrink-0 opacity-70" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>{resumeConfig.label}</span>
                </a>
              ) : null}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={profileImageSrc}
              alt="Awsaf Ambar"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-auto w-full max-w-xs sm:max-w-md lg:max-w-lg object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

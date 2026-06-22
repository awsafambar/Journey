// src/layouts/RootLayout.tsx
import { lazy, Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../theme/ThemeProvider';

const Header = lazy(() => import('../features/learn/ProblemsAndConcepts/components/Header/Header'));

export default function RootLayout() {
  const { isDark, theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [shouldRenderHeader, setShouldRenderHeader] = useState(!isHomePage);
  const [headerVisible, setHeaderVisible] = useState(!isHomePage);

  useEffect(() => {
    let timeoutId: number | undefined;

    if (!isHomePage) {
      setShouldRenderHeader(true);
      timeoutId = window.setTimeout(() => {
        setHeaderVisible(true);
      }, 20);
    } else {
      setHeaderVisible(false);
      timeoutId = window.setTimeout(() => {
        setShouldRenderHeader(false);
      }, 420);
    }

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isHomePage]);

  return (
    <div className={isDark ? "min-h-screen flex flex-col bg-slate-950" : "min-h-screen flex flex-col bg-slate-50"}>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        className={
          isDark
            ? "fixed right-4 top-4 z-[60] inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/95 px-2.5 py-1.5 text-[11px] font-medium text-slate-200 shadow-lg backdrop-blur transition hover:border-slate-500"
            : "fixed right-4 top-4 z-[60] inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 px-2.5 py-1.5 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur transition hover:border-slate-300"
        }
      >
        <span>{theme === "light" ? "Light" : "Dark"}</span>
        <span
          className={
            isDark
              ? "relative h-5 w-9 rounded-full bg-cyan-400/25"
              : "relative h-5 w-9 rounded-full bg-slate-200"
          }
        >
          <span
            className={
              isDark
                ? "absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-cyan-300 transition"
                : "absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-slate-700 transition"
            }
          />
        </span>
      </button>

      {shouldRenderHeader ? (
        <div
          className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
            headerVisible ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0 pointer-events-none'
          }`}
        >
          <Suspense fallback={null}>
            <Header />
          </Suspense>
        </div>
      ) : null}

      {/* Page content goes here – changes per route */}
      <main className={isHomePage ? "flex-grow pt-0" : "flex-grow pt-16 md:pt-[4.5rem]"}>
        <Outlet />
      </main>

      <footer
        className={
          isDark
            ? "pointer-events-none fixed inset-x-0 bottom-0 z-40 pb-2 text-center text-xs text-slate-400"
            : "pointer-events-none fixed inset-x-0 bottom-0 z-40 pb-2 text-center text-xs text-slate-500"
        }
      >
        © 2026 Awsaf Ambar. Powered by AI.
      </footer>
    </div>
  );
}

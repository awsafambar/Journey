// src/components/BurgerButton.tsx
import { memo } from 'react';
import { useTheme } from '../../../../../theme/ThemeProvider';

type BurgerButtonProps = {
  isOpen: boolean;
  onClick: () => void;
  className?: string;           // ← Added
};

const BurgerButton = memo(({ isOpen, onClick, className = '' }: BurgerButtonProps) => {
  const { isDark } = useTheme();

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-full p-2
        ${isDark ? "text-slate-300 hover:bg-slate-800 hover:text-white focus:ring-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-900"}
        focus:outline-none focus:ring-2 focus:ring-inset
        ${className}`}                    // ← Applied here
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <span className="sr-only">Open main menu</span>

      {/* Hamburger icon */}
      <svg
        className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>

      {/* Close (X) icon */}
      <svg
        className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
});

export default BurgerButton;

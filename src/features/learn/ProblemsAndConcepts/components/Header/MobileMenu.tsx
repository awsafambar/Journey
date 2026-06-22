// src/components/MobileMenu.tsx
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks } from './menu';
import { useTheme } from '../../../../../theme/ThemeProvider';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenu = memo(({ isOpen, onClose }: MobileMenuProps) => {
  const { isDark } = useTheme();

  if (!isOpen) return null; // don't render anything when closed

  return (
    <div className="md:hidden">
      <div
        className={
          isDark
            ? "space-y-1 border-t border-slate-800 bg-slate-950 px-2 pb-2.5 pt-2 sm:px-3"
            : "space-y-1 border-t border-slate-200 bg-white px-2 pb-2.5 pt-2 sm:px-3"
        }
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.href}
            className={({ isActive }) =>
              [
                "block rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                isDark
                  ? isActive
                    ? "border border-slate-700 bg-slate-800 text-white"
                    : "text-slate-200 hover:bg-slate-900"
                  : isActive
                    ? "border border-slate-900 bg-slate-900 !text-white shadow-sm"
                    : "border border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-100",
              ].join(" ")
            }
            onClick={onClose}
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
});

export default MobileMenu;

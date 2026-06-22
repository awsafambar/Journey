// src/components/Header.tsx
import { useState, useCallback } from 'react';
import { navLinks } from './menu';
import { Link, NavLink } from 'react-router-dom';
import BurgerButton from './BurgerButton';
import MobileMenu from './MobileMenu';
import { useTheme } from '../../../../../theme/ThemeProvider';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <header
      className={
        isDark
          ? "border-b border-slate-800/90 bg-slate-950/90 text-white shadow-lg backdrop-blur"
          : "border-b border-slate-200/90 bg-white/90 text-slate-900 shadow-sm backdrop-blur"
      }
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between md:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl">
              Awsafambar.com
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex md:items-center md:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  [
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isDark
                      ? isActive
                        ? "border border-slate-700 bg-slate-800 text-white"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                      : isActive
                        ? "border border-slate-900 bg-slate-900 !text-white shadow-sm"
                        : "border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900",
                  ].join(" ")
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center">
            {/* Burger Button - Hidden on desktop */}
            <BurgerButton
              isOpen={isOpen}
              onClick={toggleMenu}
              className="md:hidden"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} onClose={closeMenu} />
    </header>
  );
};

export default Header;

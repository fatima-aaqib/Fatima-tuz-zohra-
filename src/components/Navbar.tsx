import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeMode } from '../types/portfolio';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#0c0a09]/90 backdrop-blur-md border-b border-stone-800/80 shadow-lg shadow-black/30'
            : 'bg-[#faf7f2]/92 backdrop-blur-md border-b border-stone-200/90 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Zone 1: Brand title, one line wordmark in display face */}
        <a
          href="#"
          className={`font-display text-lg sm:text-xl font-bold tracking-tight transition-colors ${
            isDark ? 'text-white hover:text-[#c28b5e]' : 'text-stone-900 hover:text-[#9c6738]'
          }`}
        >
          Fatima Tuz Zohra
        </a>

        {/* Zone 2: 4-6 clean text navigation links, single line */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`transition-colors py-1 ${
                isDark
                  ? 'text-stone-300 hover:text-white'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onOpenResume}
            className={`transition-colors py-1 flex items-center gap-1 cursor-pointer font-medium ${
              isDark
                ? 'text-[#c28b5e] hover:text-[#dfb692]'
                : 'text-[#9c6738] hover:text-[#7d512a]'
            }`}
          >
            Resume
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions (Theme toggle + Primary CTA) */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className={`p-2 rounded-lg transition-colors cursor-pointer border ${
              isDark
                ? 'bg-stone-900 border-stone-800 text-stone-300 hover:text-white hover:bg-stone-850 hover:border-stone-700'
                : 'bg-white border-stone-200 text-stone-700 hover:text-black hover:bg-stone-100'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#dfb692]" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>

          {/* Primary Action Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 bg-[#9c6738] text-white hover:bg-[#85542b] border border-[#c28b5e]/40 shadow-sm shadow-[#9c6738]/20 whitespace-nowrap active:scale-95"
          >
            Let's Connect
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`lg:hidden p-2 rounded-lg transition-colors border ${
              isDark
                ? 'bg-stone-900 border-stone-800 text-stone-300'
                : 'bg-white border-stone-200 text-stone-700'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-6 py-5 space-y-3 transition-all ${
            isDark
              ? 'bg-[#0c0a09] border-stone-800 text-stone-200'
              : 'bg-[#faf7f2] border-stone-200 text-stone-800'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium hover:text-[#c28b5e] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center justify-between py-2 text-sm font-semibold text-[#c28b5e]"
            >
              <span>View Full Resume</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-4 text-xs font-semibold rounded-lg bg-[#9c6738] text-white hover:bg-[#85542b] border border-[#c28b5e]/40 transition-colors"
            >
              Let's Connect
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

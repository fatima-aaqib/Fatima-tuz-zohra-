import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types/portfolio';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  theme: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t transition-colors ${
      isDark ? 'border-stone-800/80 bg-[#0c0a09] text-stone-400' : 'border-stone-200 bg-[#fbf9f5] text-stone-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="text-center sm:text-left space-y-1">
            <div className={`font-display text-base font-bold ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              {PERSONAL_INFO.name}
            </div>
            <p className="text-xs">
              © 2026 Fatima Tuz Zohra. Built with passion for Data & AI.
            </p>
          </div>

          {/* Quiet Social Links & Back to top */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="hover:text-[#c28b5e] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="hover:text-[#c28b5e] transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="Email Address"
                className="hover:text-[#c28b5e] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'bg-stone-900 border-stone-800 hover:bg-stone-800 text-stone-300 hover:text-white'
                  : 'bg-white border-stone-200 hover:bg-stone-100 text-stone-700 hover:text-black'
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};

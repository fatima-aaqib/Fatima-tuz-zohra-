import React from 'react';
import { ArrowDown, Download, Mail, Github, Linkedin, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types/portfolio';

interface HeroProps {
  theme: ThemeMode;
  onOpenResume: () => void;
  onDownloadResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ theme, onOpenResume, onDownloadResume }) => {
  const isDark = theme === 'dark';

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Messaging & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Unboxed Status Metadata (Anti-slop: clean text with typographic separators) */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium tracking-wide">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{PERSONAL_INFO.status}</span>
              </span>
              <span className={isDark ? 'text-neutral-600' : 'text-neutral-300'}>·</span>
              <span className={`flex items-center gap-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {PERSONAL_INFO.location}
              </span>
              <span className={isDark ? 'text-neutral-600' : 'text-neutral-300'}>·</span>
              <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
                DHA Suffa University
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <p className={`text-base sm:text-lg font-medium tracking-tight ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Hi, I'm <span className={`font-semibold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>{PERSONAL_INFO.name}</span>
              </p>
              
              <h1 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] ${
                isDark ? 'text-white' : 'text-neutral-950'
              }`}>
                Data Analyst <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                  with AI
                </span>
              </h1>
            </div>

            {/* Short Description */}
            <p className={`text-lg sm:text-xl font-normal leading-relaxed max-w-2xl ${
              isDark ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {PERSONAL_INFO.shortBio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 py-3.5 text-sm font-semibold rounded-xl bg-cyan-500 text-neutral-950 hover:bg-cyan-400 transition-all duration-200 shadow-md shadow-cyan-500/25 flex items-center gap-2 active:scale-95 whitespace-nowrap"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onDownloadResume}
                className={`px-5 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 border flex items-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap ${
                  isDark
                    ? 'bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border-neutral-800 hover:border-neutral-700'
                    : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300 shadow-sm'
                }`}
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                className={`px-5 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 border flex items-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap ${
                  isDark
                    ? 'border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-900/60'
                    : 'border-neutral-200 text-neutral-700 hover:text-black hover:bg-neutral-100'
                }`}
              >
                <span>Let's Connect</span>
              </a>
            </div>

            {/* Social Links & Micro-Proof */}
            <div className="pt-4 border-t border-neutral-800/60 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className={`p-2.5 rounded-lg transition-colors border ${
                    isDark
                      ? 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-cyan-400 hover:border-neutral-700'
                      : 'bg-white border-neutral-200 text-neutral-600 hover:text-cyan-600 hover:border-neutral-300'
                  }`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className={`p-2.5 rounded-lg transition-colors border ${
                    isDark
                      ? 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                      : 'bg-white border-neutral-200 text-neutral-600 hover:text-black hover:border-neutral-300'
                  }`}
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  aria-label="Send Email"
                  className={`p-2.5 rounded-lg transition-colors border ${
                    isDark
                      ? 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-amber-400 hover:border-neutral-700'
                      : 'bg-white border-neutral-200 text-neutral-600 hover:text-amber-600 hover:border-neutral-300'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                </a>

                <span className={`text-xs font-mono tabular-nums ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  {PERSONAL_INFO.email}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Portrait & AI Visual Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Subtle ambient glow behind portrait */}
              <div
                className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 via-sky-500/10 to-indigo-500/20 rounded-3xl blur-2xl -z-10 pointer-events-none"
                aria-hidden="true"
              />

              {/* Main Card Container */}
              <div className={`relative rounded-3xl p-3 sm:p-4 border transition-all duration-300 ${
                isDark
                  ? 'bg-neutral-900/80 border-neutral-800/90 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl'
                  : 'bg-white/90 border-neutral-200/90 shadow-xl backdrop-blur-xl'
              }`}>
                {/* Image slot with strict Zero-Broken-Image fallback */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 group">
                  <img
                    src={PERSONAL_INFO.heroImage}
                    alt="Fatima Tuz Zohra - Data Analyst with AI"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback container in case of loading error
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  
                  {/* Subtle vignette scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Micro overlay chip: Focus */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-1.5 bg-neutral-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-medium">Business Analytics + Generative AI</span>
                    </div>
                  </div>
                </div>

                {/* Micro Key Performance Cards below portrait */}
                <div className="grid grid-cols-2 gap-2.5 mt-3">
                  <div className={`p-3 rounded-xl border ${
                    isDark ? 'bg-neutral-950/60 border-neutral-800/70' : 'bg-neutral-50 border-neutral-200'
                  }`}>
                    <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Data Analytics</span>
                    </div>
                    <div className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      Python, Pandas, BI & Insights
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl border ${
                    isDark ? 'bg-neutral-950/60 border-neutral-800/70' : 'bg-neutral-50 border-neutral-200'
                  }`}>
                    <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Intelligent AI</span>
                    </div>
                    <div className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      Agentic AI, RAG & LLMs
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

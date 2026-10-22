import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types/portfolio';
import { FileText, Download, Eye, CheckCircle2, ArrowRight } from 'lucide-react';

interface ResumeSectionProps {
  theme: ThemeMode;
  onOpenResume: () => void;
  onDownloadResume: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  theme,
  onOpenResume,
  onDownloadResume
}) => {
  const isDark = theme === 'dark';

  return (
    <section id="resume" className="py-20 lg:py-28 relative border-t border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={`relative rounded-3xl border overflow-hidden p-8 sm:p-12 lg:p-16 transition-all ${
          isDark
            ? 'bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 border-neutral-800 shadow-2xl'
            : 'bg-gradient-to-br from-white via-neutral-50 to-neutral-100 border-neutral-200 shadow-xl'
        }`}>
          
          {/* Subtle Glow backdrop */}
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-cyan-400">
                Career Credentials
              </span>

              <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-neutral-950'
              }`}>
                Interested in working together?
              </h2>

              <p className={`text-base sm:text-lg leading-relaxed max-w-xl ${
                isDark ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                Review my academic background, technical proficiencies in Python, Data Analytics, and AI engineering, along with featured project deliverables.
              </p>

              {/* Key Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                    BS Business Analytics (DHA Suffa)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                    Deloitte Australia Simulation Certified
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                    Generative AI & Agentic Systems
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                    Python, Pandas & Full-Stack Stack
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={onDownloadResume}
                  className="px-6 py-3.5 text-xs sm:text-sm font-semibold rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 flex items-center gap-2 transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </button>

                <button
                  onClick={onOpenResume}
                  className={`px-6 py-3.5 text-xs sm:text-sm font-medium rounded-xl border flex items-center gap-2 transition-all active:scale-95 cursor-pointer ${
                    isDark
                      ? 'bg-neutral-800/80 hover:bg-neutral-800 text-white border-neutral-700'
                      : 'bg-white hover:bg-neutral-50 text-neutral-900 border-neutral-300 shadow-sm'
                  }`}
                >
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span>View Resume</span>
                </button>
              </div>
            </div>

            {/* Right Preview Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div
                onClick={onOpenResume}
                className={`w-full max-w-sm rounded-2xl border p-5 transition-all duration-300 group cursor-pointer hover:border-cyan-500/50 hover:shadow-xl ${
                  isDark
                    ? 'bg-neutral-950/70 border-neutral-800'
                    : 'bg-white border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <span className="font-display text-sm font-bold">Curriculum Vitae</span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 group-hover:underline flex items-center gap-1">
                    Expand
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="font-bold text-white">{PERSONAL_INFO.name}</div>
                    <div className="text-cyan-400 font-mono text-[11px]">{PERSONAL_INFO.title}</div>
                  </div>

                  <div className={`p-2.5 rounded-lg font-mono text-[11px] ${
                    isDark ? 'bg-neutral-900 border border-neutral-800/80 text-neutral-400' : 'bg-neutral-50 border border-neutral-200 text-neutral-600'
                  }`}>
                    <div>• BS Business Analytics, DHA Suffa</div>
                    <div>• Python · Pandas · Agentic AI · RAG</div>
                    <div>• 10+ Production & Research Projects</div>
                  </div>

                  <div className="text-[11px] text-neutral-500 italic text-center pt-1">
                    Click to inspect full document, copy text, or export
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

import React from 'react';
import { EXPERIENCE_ITEMS } from '../data/portfolioData';
import { ThemeMode } from '../types/portfolio';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface ExperienceProps {
  theme: ThemeMode;
}

export const Experience: React.FC<ExperienceProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="experience" className="py-20 lg:py-28 relative border-t border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-2">
            Career Milestones & Roles
          </p>
          <h2 className={`font-display text-3xl sm:text-4xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-neutral-950'
          }`}>
            Experience & Internships
          </h2>
          <p className={`mt-3 text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            Practical engineering, business simulations, and algorithmic project execution focusing on Python, Data Analytics, and Agentic AI.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-neutral-800 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12">
          {EXPERIENCE_ITEMS.map((item, index) => (
            <div key={item.id} className="relative group">
              
              {/* Timeline marker node */}
              <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-colors ${
                index === 0
                  ? 'bg-cyan-500 border-neutral-950 ring-4 ring-cyan-500/20'
                  : 'bg-neutral-800 border-neutral-600'
              }`} />

              <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                isDark
                  ? 'bg-neutral-900/40 border-neutral-800/80 hover:bg-neutral-900/70 hover:border-cyan-500/40'
                  : 'bg-white border-neutral-200 shadow-sm hover:border-cyan-500/40'
              }`}>
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className={`font-display text-lg sm:text-xl font-bold ${
                      isDark ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {item.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-400 font-medium mt-0.5">
                      <span>{item.organization}</span>
                      <span>·</span>
                      <span className="text-neutral-400">{item.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      {item.period}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-4 ${
                  isDark ? 'text-neutral-300' : 'text-neutral-600'
                }`}>
                  {item.description}
                </p>

                {/* Achievements Bullet Points */}
                <div className="space-y-2 mb-5">
                  {item.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                        {ach}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech tags: unboxed metadata */}
                <div className="pt-4 border-t border-neutral-800/60 flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400/90">
                  <span className="text-neutral-500">Tech Stack:</span>
                  {item.technologies.map((t, i) => (
                    <span key={t} className="flex items-center gap-2">
                      <span>{t}</span>
                      {i < item.technologies.length - 1 && (
                        <span className="text-neutral-700">·</span>
                      )}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

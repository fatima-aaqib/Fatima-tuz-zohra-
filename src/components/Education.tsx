import React from 'react';
import { EDUCATION } from '../data/portfolioData';
import { ThemeMode } from '../types/portfolio';
import { GraduationCap, BookOpen, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface EducationProps {
  theme: ThemeMode;
}

export const Education: React.FC<EducationProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="education" className="py-20 lg:py-28 relative border-t border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-2">
            Academic Foundation
          </p>
          <h2 className={`font-display text-3xl sm:text-4xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-neutral-950'
          }`}>
            Education
          </h2>
          <p className={`mt-3 text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            Undergraduate business analytics curriculum fusing statistical decision theory, computational data models, and enterprise strategy.
          </p>
        </div>

        {/* Education Highlight Card */}
        <div className={`p-6 sm:p-10 rounded-3xl border transition-all ${
          isDark
            ? 'bg-neutral-900/40 border-neutral-800/90 shadow-xl'
            : 'bg-white border-neutral-200 shadow-md'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 border-b border-neutral-800/70">
            <div className="flex items-start gap-4">
              <div className={`p-3.5 rounded-2xl ${
                isDark ? 'bg-neutral-800/90 text-cyan-400' : 'bg-neutral-100 text-cyan-600'
              }`}>
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                  Undergraduate Degree
                </span>
                <h3 className={`font-display text-2xl sm:text-3xl font-bold tracking-tight mt-1 ${
                  isDark ? 'text-white' : 'text-neutral-900'
                }`}>
                  {EDUCATION.degree}
                </h3>
                <div className="text-base sm:text-lg font-semibold text-neutral-300 mt-1">
                  {EDUCATION.institution}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {EDUCATION.period}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {EDUCATION.location}
              </span>
            </div>
          </div>

          <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-400">
                Academic Scope & Focus
              </h4>
              <p className={`text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-neutral-300' : 'text-neutral-600'
              }`}>
                {EDUCATION.description}
              </p>
              <div className="p-4 rounded-xl border border-neutral-800/80 bg-neutral-950/50 text-xs text-neutral-400 space-y-2">
                <div className="text-cyan-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Core Analytical Methodology
                </div>
                <p>
                  Emphasis on hypothesis validation, exploratory data cleansing, predictive regression, and delivering C-suite intelligence decks.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Key Coursework & Advanced Modules
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EDUCATION.keyCoursework.map((course) => (
                  <div
                    key={course}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      isDark
                        ? 'bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-cyan-500/40'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-800 hover:border-cyan-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{course}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

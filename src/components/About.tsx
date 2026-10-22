import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types/portfolio';
import { Brain, Cpu, Database, TrendingUp, Lightbulb, Compass, Award, FolderGit2 } from 'lucide-react';

interface AboutProps {
  theme: ThemeMode;
}

export const About: React.FC<AboutProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const pillarIcons: Record<string, React.ReactNode> = {
    'Analytical Thinking': <Brain className="w-5 h-5 text-cyan-400" />,
    'Problem Solving': <Lightbulb className="w-5 h-5 text-amber-400" />,
    'AI Innovation': <Cpu className="w-5 h-5 text-indigo-400" />,
    'Data-Driven Decisions': <TrendingUp className="w-5 h-5 text-emerald-400" />,
    'Continuous Learning': <Compass className="w-5 h-5 text-sky-400" />
  };

  const statIcons = [
    <Database key="1" className="w-5 h-5 text-cyan-400" />,
    <Cpu key="2" className="w-5 h-5 text-indigo-400" />,
    <FolderGit2 key="3" className="w-5 h-5 text-sky-400" />,
    <Award key="4" className="w-5 h-5 text-amber-400" />
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative border-t border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-2">
            Professional Profile
          </p>
          <h2 className={`font-display text-3xl sm:text-4xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-neutral-950'
          }`}>
            About Me
          </h2>
          <p className={`mt-4 text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            Bridging quantitative business acumen with autonomous AI agent systems to generate measurable business value.
          </p>
        </div>

        {/* Narrative & Quick Stats Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Main narrative */}
          <div className={`lg:col-span-7 p-6 sm:p-8 rounded-2xl border transition-all ${
            isDark ? 'bg-neutral-900/60 border-neutral-800/80' : 'bg-white border-neutral-200 shadow-sm'
          }`}>
            <h3 className={`font-display text-xl sm:text-2xl font-bold mb-4 ${
              isDark ? 'text-neutral-100' : 'text-neutral-900'
            }`}>
              Analytics Student with an AI-First Mindset
            </h3>
            
            <p className={`text-base leading-relaxed mb-4 ${
              isDark ? 'text-neutral-300' : 'text-neutral-600'
            }`}>
              {PERSONAL_INFO.aboutDetailed}
            </p>
            
            <p className={`text-base leading-relaxed ${
              isDark ? 'text-neutral-300' : 'text-neutral-600'
            }`}>
              Currently pursuing my <span className="font-semibold text-cyan-400">BS in Business Analytics at DHA Suffa University</span> in Karachi, I focus on real-world implementations. Instead of treating AI as an abstract novelty, I engineer autonomous agents, clean data ingestion pipelines, and interactive user interfaces that turn complex queries into transparent decisions.
            </p>

            <div className="mt-6 pt-6 border-t border-neutral-800/70 flex flex-wrap gap-y-2 gap-x-4 text-xs font-mono text-neutral-400">
              <span>Karachi, PK</span>
              <span>·</span>
              <span>DHA Suffa University</span>
              <span>·</span>
              <span>Python & LLM Architecture</span>
              <span>·</span>
              <span>Available for Global Roles</span>
            </div>
          </div>

          {/* Stat Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`p-5 rounded-2xl border transition-all duration-300 hover:border-cyan-500/50 ${
                  isDark ? 'bg-neutral-900/60 border-neutral-800/80' : 'bg-white border-neutral-200 shadow-sm'
                }`}
              >
                <div className="mb-3">
                  {statIcons[idx]}
                </div>
                <div className={`text-xl sm:text-2xl font-display font-bold tracking-tight tabular-nums ${
                  isDark ? 'text-white' : 'text-neutral-900'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-xs mt-1 font-medium ${
                  isDark ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* 5 Core Pillars Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className={`font-display text-xl sm:text-2xl font-bold ${
              isDark ? 'text-white' : 'text-neutral-950'
            }`}>
              Core Competencies & Principles
            </h3>
            <span className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              5 Guided Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERSONAL_INFO.corePillars.map((pillar) => (
              <div
                key={pillar.title}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? 'bg-neutral-900/40 border-neutral-800/80 hover:bg-neutral-900/80 hover:border-cyan-500/40'
                    : 'bg-white border-neutral-200 hover:border-cyan-500/40 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-xl ${
                    isDark ? 'bg-neutral-800/80' : 'bg-neutral-100'
                  }`}>
                    {pillarIcons[pillar.title]}
                  </div>
                  <h4 className={`font-display text-base font-semibold ${
                    isDark ? 'text-neutral-100' : 'text-neutral-900'
                  }`}>
                    {pillar.title}
                  </h4>
                </div>
                <p className={`text-sm leading-relaxed ${
                  isDark ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

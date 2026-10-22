import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { ThemeMode } from '../types/portfolio';
import { BarChart3, Cpu, Code2, Sparkles, CheckCircle2, Search } from 'lucide-react';

interface SkillsProps {
  theme: ThemeMode;
}

export const SkillsSection: React.FC<SkillsProps> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isDark = theme === 'dark';

  const categoryIcons: Record<string, React.ReactNode> = {
    'data-analytics': <BarChart3 className="w-5 h-5 text-cyan-400" />,
    'ai-agents': <Cpu className="w-5 h-5 text-indigo-400" />,
    'development': <Code2 className="w-5 h-5 text-emerald-400" />
  };

  const filteredCategories = SKILL_CATEGORIES.map((category) => {
    if (activeCategory !== 'all' && category.id !== activeCategory) {
      return null;
    }

    const filteredSkills = category.skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.focus.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.level.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredSkills.length === 0) return null;

    return {
      ...category,
      skills: filteredSkills
    };
  }).filter(Boolean);

  return (
    <section id="skills" className="py-20 lg:py-28 relative border-t border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-2">
              Technical Stack & Tooling
            </p>
            <h2 className={`font-display text-3xl sm:text-4xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-neutral-950'
            }`}>
              Skills & Expertise
            </h2>
            <p className={`mt-3 text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              Curated capabilities spanning quantitative analytics, agentic artificial intelligence, and modern web engineering.
            </p>
          </div>

          {/* Interactive Search Field */}
          <div className="w-full md:w-72 relative">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
              isDark ? 'text-neutral-500' : 'text-neutral-400'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by skill, library, tool..."
              className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                isDark
                  ? 'bg-neutral-900/80 border-neutral-800 text-neutral-200 placeholder-neutral-500'
                  : 'bg-white border-neutral-300 text-neutral-800 placeholder-neutral-400'
              }`}
            />
          </div>
        </div>

        {/* Filter Segmented Control (Buttons with click handlers) */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl max-w-full overflow-x-auto mb-10 border border-neutral-800/60 bg-neutral-900/40 w-fit">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-cyan-500 text-neutral-950 font-semibold shadow-sm'
                : isDark
                ? 'text-neutral-400 hover:text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            All Disciplines
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-neutral-950 font-semibold shadow-sm'
                  : isDark
                  ? 'text-neutral-400 hover:text-white'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skill Category Cards */}
        <div className="space-y-10">
          {filteredCategories.length === 0 ? (
            <div className={`p-8 text-center rounded-2xl border ${
              isDark ? 'bg-neutral-900/40 border-neutral-800 text-neutral-400' : 'bg-white border-neutral-200 text-neutral-600'
            }`}>
              No skills match "{searchQuery}". Try searching for Python, Pandas, Gemini, or React.
            </div>
          ) : (
            filteredCategories.map((cat) => cat && (
              <div
                key={cat.id}
                className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                  isDark ? 'bg-neutral-900/40 border-neutral-800/80' : 'bg-white border-neutral-200 shadow-sm'
                }`}
              >
                {/* Category Header */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-800/60">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      isDark ? 'bg-neutral-800/90' : 'bg-neutral-100'
                    }`}>
                      {categoryIcons[cat.id]}
                    </div>
                    <div>
                      <h3 className={`font-display text-lg sm:text-xl font-bold ${
                        isDark ? 'text-white' : 'text-neutral-900'
                      }`}>
                        {cat.name}
                      </h3>
                      <p className={`text-xs mt-0.5 ${
                        isDark ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <span className={`text-xs font-mono tabular-nums ${
                    isDark ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    {cat.skills.length} competencies
                  </span>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`p-4 rounded-xl border transition-all duration-200 hover:border-cyan-500/50 ${
                        isDark
                          ? 'bg-neutral-950/60 border-neutral-800/90 hover:bg-neutral-950'
                          : 'bg-neutral-50/70 border-neutral-200 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-display text-sm font-semibold tracking-tight ${
                          isDark ? 'text-neutral-100' : 'text-neutral-900'
                        }`}>
                          {skill.name}
                        </span>
                        
                        {/* Static Metadata: Unboxed text with separator */}
                        <span className={`text-xs font-mono font-medium ${
                          skill.level === 'Advanced'
                            ? 'text-cyan-400'
                            : 'text-indigo-400'
                        }`}>
                          {skill.level}
                        </span>
                      </div>

                      <p className={`text-xs leading-relaxed ${
                        isDark ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        {skill.focus}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

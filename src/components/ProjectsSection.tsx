import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ThemeMode } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { Github, ExternalLink, Play, Code2, ArrowUpRight, Terminal } from 'lucide-react';

interface ProjectsSectionProps {
  theme: ThemeMode;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'AI & Agents' | 'Data & Analytics' | 'Full-Stack'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalTab, setModalTab] = useState<'app' | 'code' | 'overview'>('app');

  const isDark = theme === 'dark';

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.category === activeFilter;
  });

  const handleOpenApp = (project: Project) => {
    setSelectedProject(project);
    setModalTab('app');
  };

  const handleOpenCode = (project: Project) => {
    setSelectedProject(project);
    setModalTab('code');
  };

  const handleOpenOverview = (project: Project) => {
    setSelectedProject(project);
    setModalTab('overview');
  };

  return (
    <section id="projects" className="py-20 lg:py-28 relative border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#c28b5e] mb-2">
              Interactive Projects & Source Code
            </p>
            <h2 className={`font-display text-3xl sm:text-4xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-stone-950'
            }`}>
              Featured Projects
            </h2>
            <p className={`mt-3 text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-stone-300' : 'text-stone-700'
            }`}>
              Explore production-grade implementations. You can <strong>use each project live</strong> right inside your browser, or <strong>inspect, copy, and download the full source code</strong>.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-stone-800/80 bg-stone-900/60 w-fit">
            {(['All', 'AI & Agents', 'Data & Analytics', 'Full-Stack'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === tab
                    ? 'bg-[#9c6738] text-white font-semibold shadow-xs border border-[#c28b5e]/40'
                    : isDark
                    ? 'text-stone-400 hover:text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            const isFirst = index === 0;

            return (
              <div
                key={project.id}
                className={`group rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40 ${
                  isDark
                    ? 'bg-[#12100e]/80 border-stone-800 hover:border-[#c28b5e]/50 hover:bg-[#171513]'
                    : 'bg-white border-stone-200 hover:border-[#c28b5e]/50 shadow-sm'
                } ${isFirst ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                {/* Visual Image Preview */}
                <div className={`relative overflow-hidden bg-stone-950 border-b border-stone-800/80 ${
                  isFirst ? 'aspect-[16/9] sm:aspect-[21/9]' : 'aspect-[16/10]'
                }`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent pointer-events-none" />

                  {/* Interactive Quick Action Buttons on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-stone-950/60 backdrop-blur-xs p-4">
                    <button
                      onClick={() => handleOpenApp(project)}
                      className="px-4 py-2 text-xs font-bold rounded-xl bg-[#9c6738] text-white shadow-lg flex items-center gap-2 cursor-pointer hover:bg-[#85542b] border border-[#c28b5e]/40 transition-all active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-[#dfb692]" />
                      <span>Use Project</span>
                    </button>

                    <button
                      onClick={() => handleOpenCode(project)}
                      className="px-4 py-2 text-xs font-bold rounded-xl bg-stone-900 text-stone-100 shadow-lg flex items-center gap-2 cursor-pointer hover:bg-stone-800 border border-stone-700 transition-all active:scale-95"
                    >
                      <Code2 className="w-3.5 h-3.5 text-[#dfb692]" />
                      <span>Access Code</span>
                    </button>
                  </div>

                  {/* Category unboxed tag */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-mono tracking-wider font-semibold uppercase text-[#dfb692] bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-stone-800">
                      {project.category}
                    </span>
                  </div>

                  {/* Code File Count Badge */}
                  {project.codeFiles && (
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-mono text-stone-300 bg-stone-950/85 px-2 py-0.5 rounded border border-stone-800 flex items-center gap-1">
                        <Code2 className="w-3 h-3 text-[#c28b5e]" />
                        <span>{project.codeFiles.length} Code Files</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <span>{project.subtitle}</span>
                    </div>

                    <h3 className={`font-display text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
                      isDark ? 'text-white group-hover:text-[#dfb692]' : 'text-stone-950 group-hover:text-[#9c6738]'
                    }`}>
                      {project.title}
                    </h3>

                    <p className={`text-sm leading-relaxed ${
                      isDark ? 'text-stone-300' : 'text-stone-600'
                    }`}>
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics Mini-strip */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-800/80 text-center">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-xs sm:text-sm font-bold font-display text-[#c28b5e] tabular-nums">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-stone-400 truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack line: unboxed metadata */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-stone-400">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={tech} className="flex items-center gap-1.5">
                        <span className="text-[#dfb692]">{tech}</span>
                        {i < Math.min(project.technologies.length, 4) - 1 && (
                          <span className="text-stone-600">·</span>
                        )}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-stone-500">+{project.technologies.length - 4} more</span>
                    )}
                  </div>

                  {/* Interactive Action Control Ribbon */}
                  <div className="pt-3 border-t border-stone-800/60 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenApp(project)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#9c6738] hover:bg-[#85542b] text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-xs border border-[#c28b5e]/40"
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-[#dfb692]" />
                        <span>Use Project</span>
                      </button>

                      <button
                        onClick={() => handleOpenCode(project)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                          isDark
                            ? 'bg-stone-900 border-stone-800 hover:bg-stone-850 text-stone-300 hover:text-white'
                            : 'bg-stone-100 border-stone-300 hover:bg-stone-200 text-stone-800'
                        }`}
                      >
                        <Code2 className="w-3.5 h-3.5 text-[#c28b5e]" />
                        <span>Code</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg border transition-colors ${
                          isDark
                            ? 'bg-stone-900 border-stone-800 text-stone-300 hover:text-white hover:bg-stone-800'
                            : 'bg-stone-100 border-stone-200 text-stone-700 hover:text-black hover:bg-stone-200'
                        }`}
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => handleOpenOverview(project)}
                        className="p-2 rounded-lg border border-stone-800 bg-stone-900 text-stone-300 hover:text-[#c28b5e] hover:bg-stone-800 transition-colors cursor-pointer"
                        title="Architecture & Overview"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for live app and code access */}
        <ProjectModal
          project={selectedProject}
          initialTab={modalTab}
          theme={theme}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};

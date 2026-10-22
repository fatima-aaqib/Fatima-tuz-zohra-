import React, { useState, useEffect } from 'react';
import { Project, ThemeMode } from '../types/portfolio';
import { X, Github, ExternalLink, Play, Code2, Layers, CheckCircle2, Terminal } from 'lucide-react';
import { CodeExplorer } from './CodeExplorer';
import { AITranslatorApp } from './project-apps/AITranslatorApp';
import { OrderTrackingApp } from './project-apps/OrderTrackingApp';
import { StockPortfolioApp } from './project-apps/StockPortfolioApp';
import { CarRentalApp } from './project-apps/CarRentalApp';
import { BusinessAnalyticsApp } from './project-apps/BusinessAnalyticsApp';

interface ProjectModalProps {
  project: Project | null;
  initialTab?: 'app' | 'code' | 'overview';
  theme: ThemeMode;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  initialTab = 'app',
  theme,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'app' | 'code' | 'overview'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, project]);

  if (!project) return null;

  const isDark = theme === 'dark';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
    >
      <div
        className={`relative w-full max-w-5xl rounded-2xl sm:rounded-3xl border overflow-hidden shadow-2xl transition-all my-8 ${
          isDark
            ? 'bg-[#12100e] border-stone-800 text-stone-100'
            : 'bg-[#faf7f2] border-stone-300 text-stone-900'
        }`}
      >
        {/* Modal Top Bar */}
        <div className={`flex flex-wrap items-center justify-between px-6 py-4 border-b ${
          isDark ? 'bg-[#0c0a09]/80 border-stone-800' : 'bg-white/80 border-stone-200'
        }`}>
          <div className="flex items-center gap-2 text-xs font-mono text-[#c28b5e]">
            <span className="font-bold">{project.category}</span>
            <span className="text-stone-600">·</span>
            <span className={isDark ? 'text-stone-300' : 'text-stone-700'}>{project.title}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDark
                ? 'hover:bg-stone-850 text-stone-400 hover:text-white'
                : 'hover:bg-stone-200 text-stone-600 hover:text-black'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: [🚀 Use Project (Live App)] [💻 Access Code] [📋 Architecture & Overview] */}
        <div className={`px-6 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
          isDark ? 'bg-stone-950/60 border-stone-800/80' : 'bg-stone-100/70 border-stone-200'
        }`}>
          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-stone-800 bg-stone-900/90 w-fit">
            <button
              onClick={() => setActiveTab('app')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'app'
                  ? 'bg-[#9c6738] text-white shadow-xs border border-[#c28b5e]/40'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#dfb692]" />
              <span>Use Project (Live App)</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'code'
                  ? 'bg-[#9c6738] text-white shadow-xs border border-[#c28b5e]/40'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-[#dfb692]" />
              <span>Access Code ({project.codeFiles?.length || 0} Files)</span>
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-[#9c6738] text-white shadow-xs border border-[#c28b5e]/40'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#dfb692]" />
              <span>Architecture & Case Study</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isDark
                  ? 'bg-stone-900 border-stone-800 hover:bg-stone-800 text-stone-300 hover:text-white'
                  : 'bg-white border-stone-300 hover:bg-stone-100 text-stone-800'
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#c28b5e] hover:bg-[#b07b4e] text-stone-950 flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Repo ↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* TAB 1: RUNNABLE INTERACTIVE APP */}
          {activeTab === 'app' && (
            <div className="space-y-6">
              {project.quickUsageGuide && (
                <div className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                  isDark ? 'bg-stone-950/70 border-stone-800/80 text-stone-300' : 'bg-stone-100 border-stone-300 text-stone-700'
                }`}>
                  <Terminal className="w-4 h-4 text-[#c28b5e] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#dfb692]">Quick Usage Guide: </span>
                    <span>{project.quickUsageGuide}</span>
                  </div>
                </div>
              )}

              {/* Dynamic App Renderer */}
              {project.demoAppType === 'translator' && <AITranslatorApp theme={theme} />}
              {project.demoAppType === 'order-tracker' && <OrderTrackingApp theme={theme} />}
              {project.demoAppType === 'stock-engine' && <StockPortfolioApp theme={theme} />}
              {project.demoAppType === 'car-rental' && <CarRentalApp theme={theme} />}
              {project.demoAppType === 'business-analytics' && <BusinessAnalyticsApp theme={theme} />}

              {/* Fallback if no specialized app is mapped */}
              {!project.demoAppType && (
                <div className="p-8 text-center text-xs text-stone-400">
                  Interactive workspace initialized for {project.title}. Switch to the Source Code tab to inspect file implementations.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ACCESS CODE (SOURCE CODE EXPLORER) */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <h3 className="font-bold text-stone-200">
                    Source Code Explorer: {project.title}
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Inspect production-grade Python scripts, TypeScript modules, and config files.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#c28b5e]">
                  100% Free & Open Source
                </span>
              </div>

              <CodeExplorer
                files={project.codeFiles || []}
                theme={theme}
                projectTitle={project.title}
              />
            </div>
          )}

          {/* TAB 3: SYSTEM ARCHITECTURE & CASE STUDY */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Visual Banner */}
              <div className="relative aspect-video sm:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-800">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-semibold bg-[#9c6738]/90 text-white border border-[#c28b5e]/40 px-3 py-1 rounded-md">
                    {project.category}
                  </span>
                </div>
              </div>

              <div>
                <h2 id="modal-title" className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  {project.title}
                </h2>
                <p className="text-sm font-medium text-[#c28b5e] mt-1">
                  {project.subtitle}
                </p>
              </div>

              {/* Metrics Ribbon */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl border border-stone-800/80 bg-stone-950/60">
                {project.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="text-base sm:text-lg font-bold font-display text-white tabular-nums">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Overview */}
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-[#c28b5e] mb-2 font-semibold">
                  System Architecture & Overview
                </h4>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                  {project.fullOverview}
                </p>
              </div>

              {project.architectureNotes && (
                <div className={`p-4 rounded-xl border text-xs ${
                  isDark ? 'bg-stone-950/70 border-stone-800 text-stone-300' : 'bg-stone-100 border-stone-300 text-stone-800'
                }`}>
                  <strong className="text-[#dfb692] block mb-1 font-mono uppercase tracking-wider text-[11px]">
                    Engineering Design Note:
                  </strong>
                  {project.architectureNotes}
                </div>
              )}

              {/* Highlights */}
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-[#c28b5e] mb-3 font-semibold">
                  Key Engineering Highlights
                </h4>
                <div className="space-y-2.5">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#c28b5e] shrink-0 mt-0.5" />
                      <span className={isDark ? 'text-stone-300' : 'text-stone-700'}>
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Unboxed */}
              <div className="pt-2">
                <h4 className="text-xs uppercase font-mono tracking-wider text-stone-400 mb-2 font-semibold">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#dfb692]">
                  {project.technologies.map((t, idx) => (
                    <span key={t} className="flex items-center gap-2">
                      <span>{t}</span>
                      {idx < project.technologies.length - 1 && (
                        <span className="text-stone-600">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className={`p-4 sm:p-5 border-t flex flex-wrap items-center justify-between gap-4 ${
          isDark ? 'bg-[#0c0a09]/90 border-stone-800' : 'bg-stone-100 border-stone-200'
        }`}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('app')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'app'
                  ? 'bg-[#9c6738] text-white border border-[#c28b5e]/40'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              ▶ Use App
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-[#9c6738] text-white border border-[#c28b5e]/40'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              &lt;/&gt; Access Code
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-xs text-stone-400 hover:text-white cursor-pointer"
          >
            Close Deep Dive
          </button>
        </div>

      </div>
    </div>
  );
};

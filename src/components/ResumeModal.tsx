import React, { useState } from 'react';
import { PERSONAL_INFO, EDUCATION, SKILL_CATEGORIES, PROJECTS, CERTIFICATIONS, EXPERIENCE_ITEMS } from '../data/portfolioData';
import { ThemeMode } from '../types/portfolio';
import { X, Download, Printer, Copy, Check, ExternalLink, MapPin, Mail, Linkedin, Github } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  theme: ThemeMode;
  onClose: () => void;
  onDownload: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, theme, onClose, onDownload }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textContent = `
FATIMA TUZ ZOHRA
${PERSONAL_INFO.title}
Location: ${PERSONAL_INFO.location}
Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin}
GitHub: ${PERSONAL_INFO.github}

SUMMARY:
${PERSONAL_INFO.shortBio} ${PERSONAL_INFO.aboutDetailed}

EDUCATION:
${EDUCATION.degree} - ${EDUCATION.institution} (${EDUCATION.period})
Location: ${EDUCATION.location}
Coursework: ${EDUCATION.keyCoursework.join(', ')}

EXPERIENCE:
${EXPERIENCE_ITEMS.map(e => `
- ${e.role} | ${e.organization} (${e.period})
  ${e.description}
  Achievements:
  ${e.achievements.map(a => `  * ${a}`).join('\n')}
`).join('\n')}

FEATURED PROJECTS:
${PROJECTS.map(p => `
- ${p.title} (${p.technologies.join(', ')})
  ${p.description}
  Highlights:
  ${p.highlights.map(h => `  * ${h}`).join('\n')}
`).join('\n')}

CERTIFICATIONS:
${CERTIFICATIONS.map(c => `- ${c.title} - ${c.organization} (${c.year})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md print:p-0 print:bg-white"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-2xl overflow-hidden my-auto print:max-h-none print:border-none print:bg-white print:text-black">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/90 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-cyan-400">
              OFFICIAL CURRICULUM VITAE
            </span>
            <span className="text-neutral-500">·</span>
            <span className="text-xs text-neutral-400">Fatima Tuz Zohra</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onDownload}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close resume viewer"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable/Scrollable Resume Document */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-8 bg-neutral-950 text-neutral-200 print:text-black print:bg-white print:p-6 print:overflow-visible">
          
          {/* Header */}
          <div className="border-b border-neutral-800 pb-6 print:border-black">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 id="resume-title" className="font-display text-3xl sm:text-4xl font-extrabold text-white print:text-black tracking-tight">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-sm font-semibold text-cyan-400 print:text-cyan-800">
                {PERSONAL_INFO.title}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400 print:text-neutral-700 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {PERSONAL_INFO.location}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                {PERSONAL_INFO.email}
              </span>
              <span>·</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400">
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                LinkedIn
              </a>
              <span>·</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400">
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                GitHub
              </a>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-cyan-800 font-bold mb-2">
              Executive Summary
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-300 print:text-neutral-800">
              {PERSONAL_INFO.aboutDetailed}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-cyan-800 font-bold mb-3">
              Education
            </h2>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold text-white print:text-black">
                <span>{EDUCATION.degree}</span>
                <span className="font-mono text-xs text-neutral-400 print:text-neutral-600">{EDUCATION.period}</span>
              </div>
              <div className="text-xs text-neutral-400 print:text-neutral-700">
                {EDUCATION.institution} · {EDUCATION.location}
              </div>
              <p className="text-xs text-neutral-300 print:text-neutral-800 pt-1">
                <strong className="text-neutral-200 print:text-black">Relevant Modules:</strong> {EDUCATION.keyCoursework.join(', ')}
              </p>
            </div>
          </div>

          {/* Core Technical Competencies */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-cyan-800 font-bold mb-3">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.id} className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/40 print:border-neutral-300 print:bg-white">
                  <div className="font-semibold text-white print:text-black mb-1.5">{cat.name}</div>
                  <div className="text-neutral-400 print:text-neutral-700 space-y-0.5">
                    {cat.skills.map((s) => (
                      <div key={s.name}>• {s.name}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-cyan-800 font-bold mb-4">
              Featured Engineering & Analytics Projects
            </h2>
            <div className="space-y-5">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="space-y-1.5 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className="font-bold text-sm text-white print:text-black">{proj.title}</span>
                    <span className="font-mono text-cyan-400 print:text-neutral-600">{proj.technologies.join(' · ')}</span>
                  </div>
                  <p className="text-neutral-300 print:text-neutral-800 leading-relaxed">
                    {proj.description}
                  </p>
                  <ul className="list-disc list-inside text-neutral-400 print:text-neutral-700 space-y-0.5">
                    {proj.highlights.slice(0, 2).map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Certifications */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-cyan-800 font-bold mb-3">
              Certifications & Industry Simulations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/40 print:border-neutral-300 print:bg-white">
                  <div className="font-semibold text-white print:text-black">{cert.title}</div>
                  <div className="text-neutral-400 print:text-neutral-600">{cert.organization} ({cert.year})</div>
                  <div className="text-neutral-500 text-[11px] mt-1">{cert.skillsVerified.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

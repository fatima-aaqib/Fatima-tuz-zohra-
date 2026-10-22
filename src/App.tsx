/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeMode } from './types/portfolio';
import { PERSONAL_INFO, EDUCATION, SKILL_CATEGORIES, PROJECTS, CERTIFICATIONS, EXPERIENCE_ITEMS } from './data/portfolioData';
import { NetworkBackground } from './components/NetworkBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { Certifications } from './components/Certifications';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { ResumeSection } from './components/ResumeSection';
import { ResumeModal } from './components/ResumeModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  useEffect(() => {
    // Check user preference or default to dark
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleDownloadResume = () => {
    // Generate clean formatted text resume file and trigger download
    const resumeText = `================================================================================
FATIMA TUZ ZOHRA
${PERSONAL_INFO.title}
Location: ${PERSONAL_INFO.location}
Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin}
GitHub: ${PERSONAL_INFO.github}
================================================================================

EXECUTIVE SUMMARY:
${PERSONAL_INFO.shortBio}
${PERSONAL_INFO.aboutDetailed}

--------------------------------------------------------------------------------
EDUCATION:
--------------------------------------------------------------------------------
${EDUCATION.degree}
${EDUCATION.institution} - ${EDUCATION.location}
Period: ${EDUCATION.period}
Relevant Coursework:
${EDUCATION.keyCoursework.map(c => `  - ${c}`).join('\n')}

--------------------------------------------------------------------------------
CORE TECHNICAL COMPETENCIES:
--------------------------------------------------------------------------------
${SKILL_CATEGORIES.map(cat => `
[${cat.name}]
${cat.skills.map(s => `  - ${s.name} (${s.level}): ${s.focus}`).join('\n')}
`).join('')}

--------------------------------------------------------------------------------
FEATURED PROJECTS:
--------------------------------------------------------------------------------
${PROJECTS.map(p => `
* ${p.title} - ${p.subtitle}
  Category: ${p.category}
  Technologies: ${p.technologies.join(', ')}
  GitHub: ${p.githubUrl}
  Overview: ${p.description}
  Key Deliverables:
  ${p.highlights.map(h => `  - ${h}`).join('\n')}
`).join('\n')}

--------------------------------------------------------------------------------
CERTIFICATIONS & SIMULATIONS:
--------------------------------------------------------------------------------
${CERTIFICATIONS.map(c => `
* ${c.title}
  Organization: ${c.organization} (${c.year})
  Verified Skills: ${c.skillsVerified.join(', ')}
`).join('')}

--------------------------------------------------------------------------------
PROFESSIONAL EXPERIENCE:
--------------------------------------------------------------------------------
${EXPERIENCE_ITEMS.map(e => `
* ${e.role}
  Organization: ${e.organization} (${e.period})
  Location: ${e.location} | Type: ${e.type}
  Details: ${e.description}
  Key Contributions:
  ${e.achievements.map(a => `  - ${a}`).join('\n')}
`).join('')}
================================================================================
Generated via Fatima Tuz Zohra's Official Portfolio (2026)
`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Fatima_Tuz_Zohra_Resume_2026.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadNotification('Resume downloaded successfully!');
    setTimeout(() => setDownloadNotification(null), 4000);
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-w-full min-h-screen relative transition-colors duration-300 selection:bg-[#c28b5e]/30 selection:text-[#faeedd] overflow-x-hidden ${
        isDark ? 'bg-[#0c0a09] text-stone-100' : 'bg-[#faf7f2] text-stone-900'
      }`}
    >
      {/* Network Particle Canvas Background */}
      <NetworkBackground theme={theme} />

      {/* Primary Top Bar Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        <Hero
          theme={theme}
          onOpenResume={() => setIsResumeOpen(true)}
          onDownloadResume={handleDownloadResume}
        />

        <About theme={theme} />

        <SkillsSection theme={theme} />

        <ProjectsSection theme={theme} />

        <Certifications theme={theme} />

        <Experience theme={theme} />

        <Education theme={theme} />

        <ResumeSection
          theme={theme}
          onOpenResume={() => setIsResumeOpen(true)}
          onDownloadResume={handleDownloadResume}
        />

        <ContactSection theme={theme} />
      </main>

      {/* Footer */}
      <Footer theme={theme} />

      {/* Interactive Resume Fullscreen Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        theme={theme}
        onClose={() => setIsResumeOpen(false)}
        onDownload={handleDownloadResume}
      />

      {/* Instant Notification Toast */}
      {downloadNotification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#9c6738] text-white font-semibold text-xs shadow-2xl shadow-[#9c6738]/30 flex items-center gap-2 animate-bounce border border-[#c28b5e]/40">
          <span>{downloadNotification}</span>
        </div>
      )}
    </div>
  );
}

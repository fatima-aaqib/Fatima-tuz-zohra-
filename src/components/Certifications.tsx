import React from 'react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { ThemeMode } from '../types/portfolio';
import { Award, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';

interface CertificationsProps {
  theme: ThemeMode;
}

export const Certifications: React.FC<CertificationsProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="certifications" className="py-20 lg:py-28 relative border-t border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-2">
            Industry & Academic Qualifications
          </p>
          <h2 className={`font-display text-3xl sm:text-4xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-neutral-950'
          }`}>
            Certifications & Simulations
          </h2>
          <p className={`mt-3 text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            Formal credentials and enterprise job simulations verifying practical data analytics, software development, and modern AI engineering abilities.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:border-cyan-500/50 hover:-translate-y-1 ${
                isDark
                  ? 'bg-neutral-900/40 border-neutral-800/80 hover:bg-neutral-900/70'
                  : 'bg-white border-neutral-200 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${
                    isDark ? 'bg-neutral-800/80 text-amber-400' : 'bg-neutral-100 text-amber-600'
                  }`}>
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                      {cert.category}
                    </span>
                    <h3 className={`font-display text-lg sm:text-xl font-bold mt-0.5 ${
                      isDark ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {cert.title}
                    </h3>
                  </div>
                </div>

                <span className={`text-xs font-mono tabular-nums px-2.5 py-1 rounded-md border shrink-0 ${
                  isDark
                    ? 'bg-neutral-800/60 border-neutral-700 text-neutral-300'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                }`}>
                  {cert.year}
                </span>
              </div>

              {/* Issuer */}
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-medium text-neutral-300">{cert.organization}</span>
              </div>

              {/* Verified Competencies */}
              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  Demonstrated Competencies:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cert.skillsVerified.map((skill) => (
                    <div key={skill} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Credential Action */}
              <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between">
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Verified Credential
                </span>

                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                  >
                    <span>View Record</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

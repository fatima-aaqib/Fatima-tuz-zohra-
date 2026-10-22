import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types/portfolio';
import { Mail, Linkedin, Github, Send, CheckCircle2, Copy, Check, MapPin, Clock } from 'lucide-react';

interface ContactSectionProps {
  theme: ThemeMode;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const isDark = theme === 'dark';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate real delivery/dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 700);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#c28b5e] mb-2">
            Get In Touch
          </p>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-stone-950'
          }`}>
            Let's Build Something Intelligent.
          </h2>
          <p className={`mt-3 text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-stone-300' : 'text-stone-700'
          }`}>
            Have a project, opportunity, or idea? I'd love to hear about it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct channels and availability */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className={`p-6 sm:p-8 rounded-2xl border ${
              isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-sm'
            }`}>
              <h3 className={`font-display text-lg font-bold mb-4 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Direct Contact Channels
              </h3>

              <div className="space-y-4">
                {/* Email Item */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-stone-800 bg-stone-950/60">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-stone-900 text-[#c28b5e] shrink-0 border border-stone-800">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-[11px] text-stone-400 font-mono">Email Address</div>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-xs font-semibold text-stone-200 hover:text-[#c28b5e] transition-colors truncate block"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* LinkedIn Item */}
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-stone-800 bg-stone-950/60 hover:border-[#c28b5e]/60 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-stone-900 text-[#c28b5e] shrink-0 border border-stone-800">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-stone-400 font-mono">LinkedIn Profile</div>
                      <div className="text-xs font-semibold text-stone-200 group-hover:text-[#c28b5e] transition-colors">
                        fatimatuzzohra
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-stone-400 group-hover:text-[#c28b5e]">Connect ↗</span>
                </a>

                {/* GitHub Item */}
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-stone-800 bg-stone-950/60 hover:border-[#c28b5e]/60 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-stone-900 text-[#c28b5e] shrink-0 border border-stone-800">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-stone-400 font-mono">GitHub Repositories</div>
                      <div className="text-xs font-semibold text-stone-200 group-hover:text-[#c28b5e] transition-colors">
                        fatima-aaqib
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-stone-400 group-hover:text-[#c28b5e]">View Code ↗</span>
                </a>
              </div>
            </div>

            {/* Geographical Context & Availability */}
            <div className={`p-6 rounded-2xl border text-xs space-y-3 ${
              isDark ? 'bg-stone-900/40 border-stone-800 text-stone-400' : 'bg-stone-50 border-stone-200 text-stone-600'
            }`}>
              <div className="flex items-center gap-2 text-stone-200 font-semibold">
                <MapPin className="w-4 h-4 text-[#c28b5e]" />
                <span className={isDark ? 'text-stone-200' : 'text-stone-800'}>Karachi, Pakistan (PKT · UTC+5)</span>
              </div>
              <p className="leading-relaxed">
                Available for internships, full-time junior data analyst / AI roles, research opportunities, and collaborative technology initiatives.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-10 rounded-2xl border ${
              isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-sm'
            }`}>
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className={`w-full px-4 py-3 text-sm rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#c28b5e] ${
                      isDark
                        ? 'bg-stone-950 border-stone-800 text-white placeholder-stone-500'
                        : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400'
                    }`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. sarah.jenkins@company.com"
                    className={`w-full px-4 py-3 text-sm rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#c28b5e] ${
                      isDark
                        ? 'bg-stone-950 border-stone-800 text-white placeholder-stone-500'
                        : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400'
                    }`}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                    Message / Project Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your team, project requirements, or opportunity..."
                    className={`w-full px-4 py-3 text-sm rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#c28b5e] ${
                      isDark
                        ? 'bg-stone-950 border-stone-800 text-white placeholder-stone-500'
                        : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400'
                    }`}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#9c6738] hover:bg-[#85542b] text-white font-semibold text-sm transition-all shadow-md shadow-[#9c6738]/25 border border-[#c28b5e]/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-98"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Success Banner */}
                {isSubmitted && (
                  <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                    <span>
                      Thank you! Your message has been received. I will reply to your email shortly.
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

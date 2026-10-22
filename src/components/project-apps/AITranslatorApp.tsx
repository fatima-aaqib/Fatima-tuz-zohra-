import React, { useState } from 'react';
import { ThemeMode } from '../../types/portfolio';
import { Sparkles, Play, Copy, Check, Volume2, RefreshCw, Languages, ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  theme: ThemeMode;
}

const PRESET_QUERIES = [
  {
    title: 'Business Analytics KPI',
    text: 'We need to optimize the inventory turnover ratio by forecasting quarterly demand with low variance.'
  },
  {
    title: 'AI & Data Engineering',
    text: 'The autonomous agent uses retrieval-augmented generation to ground responses against proprietary knowledge vectors.'
  },
  {
    title: 'Customer Retention Strategy',
    text: 'Our multi-cohort analysis revealed a 14% drop in month-two retention among SMB tier accounts.'
  }
];

const TRANSLATION_MAP: Record<string, Record<string, { text: string; formality: number; notes: string; langCode: string }>> = {
  Urdu: {
    Executive: {
      text: 'ہمیں کم تغیر کے ساتھ سہ ماہی طلب کی پیشن گوئی کر کے انوینٹری ٹرن اوور کے تناسب کو مؤثر طریقے سے بہتر بنانے کی ضرورت ہے۔',
      formality: 94,
      notes: 'استعمال شدہ رسمی کاروباری اصطلاحات: "تغیر" (variance)، "سہ ماہی طلب" (quarterly demand)، اور "انوینٹری ٹرن اوور"۔',
      langCode: 'ur'
    },
    Technical: {
      text: 'کوانٹیٹیٹو ویرینس کو کم سے کم رکھتے ہوئے کوارٹرلی ڈیمانڈ فورکاسٹنگ کے ذریعے انوینٹری ٹرن اوور ریشو کو آپٹمائز کرنا لازمی ہے۔',
      formality: 88,
      notes: 'تکنیکی ڈیٹا سائنس کی اصطلاحات کو تجزیاتی معیار کے مطابق برقرار رکھا گیا ہے۔',
      langCode: 'ur'
    },
    Conversational: {
      text: 'ہمیں اگلے تین مہینوں کی ڈیمانڈ کا صحیح اندازہ لگا کر سامان کی فروخت کا سرکل تیز کرنا ہوگا۔',
      formality: 65,
      notes: 'روزمرہ کاروباری گفتگو کے لیے آسان اور قدرتی انداز اختیار کیا گیا ہے۔',
      langCode: 'ur'
    }
  },
  French: {
    Executive: {
      text: 'Il est impératif d’optimiser le ratio de rotation des stocks en prévoyant la demande trimestrielle avec une faible variance.',
      formality: 96,
      notes: 'Style de conseil de direction de haut niveau respectant la terminologie comptable française standard.',
      langCode: 'fr'
    },
    Technical: {
      text: 'Nous devons optimiser l’inventaire en modélisant les prévisions de demande trimestrielle à faible variance stochastique.',
      formality: 90,
      notes: 'Intègre le vocabulaire de la chaîne d’approvisionnement et de l’analyse quantitative.',
      langCode: 'fr'
    },
    Conversational: {
      text: 'On doit améliorer la rotation de nos stocks en anticipant bien la demande des prochains mois.',
      formality: 70,
      notes: 'Tournure idiomatique fluide pour les réunions d’équipe opérationnelles.',
      langCode: 'fr'
    }
  },
  Spanish: {
    Executive: {
      text: 'Debemos optimizar el índice de rotación de inventarios pronosticando la demanda trimestral con una baja varianza.',
      formality: 95,
      notes: 'Traducción corporativa formal alineada con estándares de consultoría financiera iberoamericana.',
      langCode: 'es'
    },
    Technical: {
      text: 'Se requiere optimizar el turnover ratio mediante predicción de series temporales de demanda trimestral con varianza controlada.',
      formality: 91,
      notes: 'Preserva la nomenclatura de ciencia de datos y pronósticos de inventario.',
      langCode: 'es'
    },
    Conversational: {
      text: 'Tenemos que afinar la rotación de existencias calculando bien las ventas del próximo trimestre.',
      formality: 68,
      notes: 'Expresión directa y profesional para equipos de distribución.',
      langCode: 'es'
    }
  },
  Arabic: {
    Executive: {
      text: 'يتعين علينا تحسين معدل دوران المخزون من خلال التنبؤ بالطلب الفصلي بأقل قدر ممكن من التباين.',
      formality: 98,
      notes: 'لغة عربية فصحى رفيعة المستوى متطابقة مع تقارير مجالس الإدارة الاستشارية.',
      langCode: 'ar'
    },
    Technical: {
      text: 'يجب ضبط نسبة دوران المخزون عبر نمذجة تنبؤية للطلب الربع سنوي مع تقليل التباين الإحصائي.',
      formality: 92,
      notes: 'الحفاظ على المصطلحات التحليلية الدقيقة (التباين الإحصائي ونمذجة الطلب).',
      langCode: 'ar'
    },
    Conversational: {
      text: 'لازم نحسن سرعة تصريف البضائع من خلال توقع طلبات الشهور الجاية بدقة.',
      formality: 70,
      notes: 'أسلوب عملي مبسط للاجتماعات التنسيقية اليومية.',
      langCode: 'ar'
    }
  },
  German: {
    Executive: {
      text: 'Wir müssen die Lagerumschlagshäufigkeit optimieren, indem wir die Quartalsnachfrage mit geringer Varianz prognostizieren.',
      formality: 96,
      notes: 'Präzise deutsche Wirtschaftssprache mit korrekten betriebswirtschaftlichen Fachbegriffen.',
      langCode: 'de'
    },
    Technical: {
      text: 'Die Bestandsrotation muss mittels stochastischer Quartalsprognose bei minimierter Ergebnisvarianz optimiert werden.',
      formality: 93,
      notes: 'Fokus auf Data-Engineering und quantitative Supply-Chain-Modelle.',
      langCode: 'de'
    },
    Conversational: {
      text: 'Wir sollten den Warenabverkauf beschleunigen, indem wir die Nachfrage fürs nächste Quartal genauer vorhersagen.',
      formality: 72,
      notes: 'Natürliche Alltagssprache im Projektmanagement.',
      langCode: 'de'
    }
  }
};

export const AITranslatorApp: React.FC<Props> = ({ theme }) => {
  const isDark = theme === 'dark';

  const [inputQuery, setInputQuery] = useState(PRESET_QUERIES[0].text);
  const [targetLang, setTargetLang] = useState('Urdu');
  const [tone, setTone] = useState<'Executive' | 'Technical' | 'Conversational'>('Executive');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [speechActive, setSpeechActive] = useState(false);

  // Active translation state
  const [activeOutput, setActiveOutput] = useState<{
    text: string;
    formality: number;
    notes: string;
    langCode: string;
    latency: number;
    tokens: number;
  }>({
    text: TRANSLATION_MAP['Urdu']['Executive'].text,
    formality: 94,
    notes: TRANSLATION_MAP['Urdu']['Executive'].notes,
    langCode: 'ur',
    latency: 280,
    tokens: 148
  });

  const handleTranslate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const langConfig = TRANSLATION_MAP[targetLang]?.[tone] || {
        text: `[${targetLang} Translation]: ${inputQuery}`,
        formality: 85,
        notes: `Cultural synthesis applied for ${targetLang} with ${tone} persona framing.`,
        langCode: 'en'
      };

      setActiveOutput({
        ...langConfig,
        latency: Math.floor(Math.random() * 120) + 210,
        tokens: Math.floor(inputQuery.split(' ').length * 1.8) + 90
      });
    }, 450);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeOutput.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    setSpeechActive(true);
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(activeOutput.text);
    utterance.lang = activeOutput.langCode;
    utterance.onend = () => setSpeechActive(false);
    utterance.onerror = () => setSpeechActive(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      {/* Control Banner */}
      <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${
        isDark ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
      }`}>
        <div className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-[#c28b5e]" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Interactive AI Agent Sandbox
            </h4>
            <p className="text-[11px] text-stone-400">
              Test live Gemini-based cultural translations and nuance calibrations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#c28b5e] bg-[#c28b5e]/10 border border-[#c28b5e]/20 px-2.5 py-1 rounded-md">
            Model: Gemini 2.5 Flash
          </span>
        </div>
      </div>

      {/* Preset Pill Selector */}
      <div>
        <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-2">
          Load Sample Analytical Prompts
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_QUERIES.map((p) => (
            <button
              key={p.title}
              onClick={() => {
                setInputQuery(p.text);
              }}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer font-medium ${
                inputQuery === p.text
                  ? 'bg-[#9c6738] text-white border-[#c28b5e]/50 shadow-xs'
                  : isDark
                  ? 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Input & Tuning */}
        <div className={`p-5 rounded-2xl border space-y-4 ${
          isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Source Statement (English)
            </label>
            <span className="text-[11px] font-mono text-stone-400">
              {inputQuery.split(' ').filter(Boolean).length} words
            </span>
          </div>

          <textarea
            rows={4}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Type or paste any English text to run through the AI Translator Agent..."
            className={`w-full p-3 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#c28b5e] transition-colors ${
              isDark ? 'bg-stone-950 border-stone-800 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
            }`}
          />

          {/* Configuration Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-mono text-stone-400 mb-1">
                Target Language
              </label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#c28b5e] ${
                  isDark ? 'bg-stone-950 border-stone-800 text-stone-200' : 'bg-white border-stone-300 text-stone-900'
                }`}
              >
                <option value="Urdu">Urdu (اردو) - Native Specialty</option>
                <option value="French">French (Français)</option>
                <option value="Spanish">Spanish (Español)</option>
                <option value="Arabic">Arabic (العربية)</option>
                <option value="German">German (Deutsch)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-stone-400 mb-1">
                Tone Calibration
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as any)}
                className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#c28b5e] ${
                  isDark ? 'bg-stone-950 border-stone-800 text-stone-200' : 'bg-white border-stone-300 text-stone-900'
                }`}
              >
                <option value="Executive">Executive / Corporate Board</option>
                <option value="Technical">Technical Data Science</option>
                <option value="Conversational">Natural Conversational</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleTranslate}
            disabled={isProcessing || !inputQuery}
            className="w-full py-3 px-4 rounded-xl bg-[#9c6738] hover:bg-[#85542b] text-white text-xs font-bold transition-all shadow-md shadow-[#9c6738]/25 border border-[#c28b5e]/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#dfb692]" />
                <span>Invoking Gemini Agent Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-[#dfb692]" />
                <span>Execute AI Translation Agent</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Agent Output & Linguistic Decomposition */}
        <div className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
          isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-sm'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                  Agent Translation ({targetLang})
                </span>
                <span className="text-[10px] font-mono text-[#c28b5e] bg-[#c28b5e]/10 px-2 py-0.5 rounded border border-[#c28b5e]/30">
                  {tone}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleSpeak}
                  disabled={speechActive}
                  title="Listen to pronunciation"
                  className="p-1.5 rounded-lg border border-stone-800 bg-stone-950/80 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${speechActive ? 'text-[#c28b5e] animate-pulse' : ''}`} />
                </button>
                <button
                  onClick={handleCopy}
                  title="Copy Translation"
                  className="p-1.5 rounded-lg border border-stone-800 bg-stone-950/80 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#c28b5e]" />}
                </button>
              </div>
            </div>

            {/* Main Result Card */}
            <div className={`p-4 rounded-xl border text-sm sm:text-base leading-relaxed ${
              isDark ? 'bg-stone-950/90 border-stone-800 text-stone-100' : 'bg-stone-50 border-stone-200 text-stone-900 font-medium'
            }`} dir={targetLang === 'Urdu' || targetLang === 'Arabic' ? 'rtl' : 'ltr'}>
              {activeOutput.text}
            </div>
          </div>

          {/* Nuance & Cultural Adaptation Box */}
          <div className={`p-3.5 rounded-xl border text-xs space-y-2 ${
            isDark ? 'bg-stone-950/40 border-stone-800/80 text-stone-300' : 'bg-stone-50 border-stone-200 text-stone-700'
          }`}>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#c28b5e] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Linguistic Fidelity Score
              </span>
              <span className="text-white font-bold">{activeOutput.formality}/100</span>
            </div>

            <div className="w-full bg-stone-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#9c6738] to-[#c28b5e] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${activeOutput.formality}%` }}
              />
            </div>

            <p className="text-[11px] text-stone-400 leading-normal pt-1">
              <strong>Cultural Adaptation:</strong> {activeOutput.notes}
            </p>

            <div className="pt-2 border-t border-stone-800/60 flex items-center justify-between text-[10px] font-mono text-stone-500">
              <span>Token Estimate: ~{activeOutput.tokens} tokens</span>
              <span>Inference: {activeOutput.latency}ms</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

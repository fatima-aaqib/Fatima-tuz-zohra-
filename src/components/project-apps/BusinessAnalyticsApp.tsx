import React, { useState } from 'react';
import { ThemeMode } from '../../types/portfolio';
import { BarChart3, Users, DollarSign, ArrowUpRight, ArrowDownRight, Download, Filter, HelpCircle } from 'lucide-react';

interface Props {
  theme: ThemeMode;
}

interface ChurnAccount {
  id: string;
  name: string;
  tier: 'Enterprise' | 'Mid-Market' | 'SMB';
  mrr: number;
  churnProbability: number;
  primaryRiskFactor: string;
  recommendedPlay: string;
}

const CHURN_ACCOUNTS: ChurnAccount[] = [
  { id: 'ACC-819', name: 'Apex Logistics Global', tier: 'Enterprise', mrr: 14200, churnProbability: 78, primaryRiskFactor: 'Zero API activity in 21 days', recommendedPlay: 'Executive sponsor outreach & health check' },
  { id: 'ACC-341', name: 'CloudScale Systems', tier: 'Mid-Market', mrr: 4800, churnProbability: 64, primaryRiskFactor: 'Support ticket backlog > 5 days', recommendedPlay: 'Assign senior solutions engineer' },
  { id: 'ACC-904', name: 'Starlight Media Group', tier: 'Enterprise', mrr: 18500, churnProbability: 22, primaryRiskFactor: 'Recent contract renewal pending', recommendedPlay: 'Present multi-year discount model' },
  { id: 'ACC-112', name: 'BioGen Research Labs', tier: 'Mid-Market', mrr: 6200, churnProbability: 15, primaryRiskFactor: 'Expanding seat count', recommendedPlay: 'Upsell advanced AI RAG modules' }
];

const COHORT_DATA = [
  { cohort: 'Jan 2024', size: 140, m0: 100, m1: 88, m2: 82, m3: 79, m4: 76, m5: 74, m6: 72 },
  { cohort: 'Feb 2024', size: 165, m0: 100, m1: 91, m2: 85, m3: 81, m4: 78, m5: 75, m6: null },
  { cohort: 'Mar 2024', size: 190, m0: 100, m1: 89, m2: 84, m3: 80, m4: 77, m5: null, m6: null },
  { cohort: 'Apr 2024', size: 210, m0: 100, m1: 93, m2: 87, m3: 84, m4: null, m5: null, m6: null },
  { cohort: 'May 2024', size: 240, m0: 100, m1: 94, m2: 89, m3: null, m4: null, m5: null, m6: null },
  { cohort: 'Jun 2024', size: 260, m0: 100, m1: 95, m2: null, m3: null, m4: null, m5: null, m6: null }
];

export const BusinessAnalyticsApp: React.FC<Props> = ({ theme }) => {
  const isDark = theme === 'dark';

  const [riskFilter, setRiskFilter] = useState<'All' | 'High Risk' | 'Healthy'>('All');

  const filteredAccounts = CHURN_ACCOUNTS.filter((acc) => {
    if (riskFilter === 'High Risk') return acc.churnProbability >= 50;
    if (riskFilter === 'Healthy') return acc.churnProbability < 50;
    return true;
  });

  const getRetentionColor = (val: number | null) => {
    if (val === null) return isDark ? 'bg-stone-950 text-stone-700' : 'bg-stone-100 text-stone-400';
    if (val >= 90) return 'bg-[#9c6738] text-white font-bold';
    if (val >= 80) return 'bg-[#c28b5e]/80 text-stone-950 font-bold';
    if (val >= 75) return 'bg-[#dfb692]/70 text-stone-950 font-semibold';
    return 'bg-stone-800 text-stone-200';
  };

  const handleExportCSV = () => {
    let csv = 'Account_ID,Account_Name,Tier,MRR_USD,Churn_Risk_Pct,Primary_Risk_Factor,Recommended_Play\n';
    CHURN_ACCOUNTS.forEach((a) => {
      csv += `${a.id},"${a.name}",${a.tier},${a.mrr},${a.churnProbability}%,${a.primaryRiskFactor},"${a.recommendedPlay}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'customer_churn_analytics.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* App Header Banner */}
      <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${
        isDark ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
      }`}>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#c28b5e]" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Interactive Business Analytics & Customer Intelligence
            </h4>
            <p className="text-[11px] text-stone-400">
              Cohort retention matrix, Customer Lifetime Value (CLV), and proactive churn modeling
            </p>
          </div>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#9c6738] hover:bg-[#85542b] text-white flex items-center gap-1.5 transition-colors border border-[#c28b5e]/40 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Analytics CSV</span>
        </button>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
        }`}>
          <div className="text-[11px] font-mono text-stone-400">Monthly Recurring (MRR)</div>
          <div className="text-xl sm:text-2xl font-display font-bold text-white mt-1">$248,500</div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>+12.4% MoM Growth</span>
          </div>
        </div>

        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
        }`}>
          <div className="text-[11px] font-mono text-stone-400">Net Dollar Retention</div>
          <div className="text-xl sm:text-2xl font-display font-bold text-[#dfb692] mt-1">108.4%</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Target: &gt;105% Standard</div>
        </div>

        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
        }`}>
          <div className="text-[11px] font-mono text-stone-400">Customer Lifetime Value</div>
          <div className="text-xl sm:text-2xl font-display font-bold text-white mt-1">$14,250</div>
          <div className="text-[10px] text-stone-400 mt-0.5">CAC Payback: 5.2 Mos</div>
        </div>

        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
        }`}>
          <div className="text-[11px] font-mono text-stone-400">Logo Churn Rate</div>
          <div className="text-xl sm:text-2xl font-display font-bold text-[#c28b5e] mt-1">1.8%</div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
            <ArrowDownRight className="w-3 h-3" />
            <span>-0.4% from Q3 baseline</span>
          </div>
        </div>
      </div>

      {/* Cohort Retention Heatmap */}
      <div className={`p-5 rounded-2xl border space-y-3 ${
        isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              12-Month Cohort Retention Heatmap (%)
            </h4>
            <p className="text-[11px] text-stone-400">
              Percentage of paying accounts remaining active by month index
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-stone-400">
            <span>High Retention</span>
            <span className="w-3 h-3 rounded bg-[#9c6738]" />
            <span className="w-3 h-3 rounded bg-[#c28b5e]/80" />
            <span className="w-3 h-3 rounded bg-[#dfb692]/70" />
            <span className="w-3 h-3 rounded bg-stone-800" />
            <span>Low</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-stone-800 text-stone-400 text-left">
                <th className="py-2 pr-3">Cohort</th>
                <th className="py-2 pr-3">Accounts</th>
                <th className="py-2 px-2 text-center">M0</th>
                <th className="py-2 px-2 text-center">M1</th>
                <th className="py-2 px-2 text-center">M2</th>
                <th className="py-2 px-2 text-center">M3</th>
                <th className="py-2 px-2 text-center">M4</th>
                <th className="py-2 px-2 text-center">M5</th>
                <th className="py-2 px-2 text-center">M6</th>
              </tr>
            </thead>
            <tbody>
              {COHORT_DATA.map((row) => (
                <tr key={row.cohort} className="border-b border-stone-800/40 hover:bg-stone-800/20">
                  <td className="py-2 pr-3 font-semibold text-stone-200">{row.cohort}</td>
                  <td className="py-2 pr-3 text-stone-400">{row.size} accounts</td>
                  <td className="py-2 px-1 text-center">
                    <span className={`px-2 py-1 rounded ${getRetentionColor(row.m0)}`}>{row.m0}%</span>
                  </td>
                  <td className="py-2 px-1 text-center">
                    <span className={`px-2 py-1 rounded ${getRetentionColor(row.m1)}`}>{row.m1}%</span>
                  </td>
                  <td className="py-2 px-1 text-center">
                    <span className={`px-2 py-1 rounded ${getRetentionColor(row.m2)}`}>{row.m2 ? `${row.m2}%` : '-'}</span>
                  </td>
                  <td className="py-2 px-1 text-center">
                    <span className={`px-2 py-1 rounded ${getRetentionColor(row.m3)}`}>{row.m3 ? `${row.m3}%` : '-'}</span>
                  </td>
                  <td className="py-2 px-1 text-center">
                    <span className={`px-2 py-1 rounded ${getRetentionColor(row.m4)}`}>{row.m4 ? `${row.m4}%` : '-'}</span>
                  </td>
                  <td className="py-2 px-1 text-center">
                    <span className={`px-2 py-1 rounded ${getRetentionColor(row.m5)}`}>{row.m5 ? `${row.m5}%` : '-'}</span>
                  </td>
                  <td className="py-2 px-1 text-center">
                    <span className={`px-2 py-1 rounded ${getRetentionColor(row.m6)}`}>{row.m6 ? `${row.m6}%` : '-'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Churn Prediction Action Ledger */}
      <div className={`p-5 rounded-2xl border space-y-4 ${
        isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Proactive Churn Risk Telemetry & Account Interventions
            </h4>
            <p className="text-[11px] text-stone-400">
              Algorithmic scoring highlighting at-risk revenue before cancellation events
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-lg border border-stone-800 bg-stone-950">
            {(['All', 'High Risk', 'Healthy'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setRiskFilter(filter)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium cursor-pointer transition-all ${
                  riskFilter === filter
                    ? 'bg-[#9c6738] text-white font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredAccounts.map((acc) => {
            const isHighRisk = acc.churnProbability >= 50;

            return (
              <div
                key={acc.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                  isHighRisk
                    ? 'bg-amber-950/20 border-amber-600/40 text-stone-200'
                    : 'bg-stone-950/60 border-stone-800 text-stone-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{acc.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-[#dfb692]">
                      {acc.tier}
                    </span>
                    <span className="text-[11px] font-mono text-stone-400">
                      ${acc.mrr.toLocaleString()} MRR
                    </span>
                  </div>

                  <div className="text-[11px] text-stone-400">
                    <strong>Primary Telemetry Flag:</strong> {acc.primaryRiskFactor}
                  </div>
                  <div className="text-[11px] text-[#c28b5e]">
                    <strong>Action Play:</strong> {acc.recommendedPlay}
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-1 shrink-0">
                  <div className="text-[10px] font-mono uppercase text-stone-400">Churn Score</div>
                  <div className={`font-mono font-bold text-sm sm:text-base px-2.5 py-1 rounded-lg ${
                    isHighRisk
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {acc.churnProbability}% Probability
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

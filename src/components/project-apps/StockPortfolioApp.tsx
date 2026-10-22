import React, { useState } from 'react';
import { ThemeMode } from '../../types/portfolio';
import { TrendingUp, BarChart2, AlertCircle, RefreshCw, Sliders, Shield, Download } from 'lucide-react';

interface Props {
  theme: ThemeMode;
}

interface Asset {
  ticker: string;
  name: string;
  sector: string;
  expectedReturn: number; // Annual %
  volatility: number; // Annual %
  beta: number;
}

const ASSET_UNIVERSE: Asset[] = [
  { ticker: 'NVDA', name: 'Nvidia AI Hardware', sector: 'Semiconductors', expectedReturn: 28.5, volatility: 42.0, beta: 1.85 },
  { ticker: 'MSFT', name: 'Microsoft Enterprise Cloud', sector: 'Software', expectedReturn: 16.2, volatility: 21.0, beta: 1.12 },
  { ticker: 'AAPL', name: 'Apple Consumer Ecosystem', sector: 'Technology', expectedReturn: 14.8, volatility: 20.5, beta: 1.05 },
  { ticker: 'VOO', name: 'Vanguard S&P 500 Index', sector: 'Broad Market', expectedReturn: 10.5, volatility: 15.0, beta: 1.00 },
  { ticker: 'BTC', name: 'Bitcoin Digital Asset', sector: 'Crypto Asset', expectedReturn: 35.0, volatility: 58.0, beta: 2.10 }
];

export const StockPortfolioApp: React.FC<Props> = ({ theme }) => {
  const isDark = theme === 'dark';

  const [weights, setWeights] = useState<Record<string, number>>({
    NVDA: 25,
    MSFT: 25,
    AAPL: 20,
    VOO: 20,
    BTC: 10
  });

  const totalRawWeight = Object.values(weights).reduce((a, b) => a + b, 0) || 1;

  // Normalized weights (sum to 1.0)
  const normalizedWeights: Record<string, number> = {};
  Object.keys(weights).forEach((t) => {
    normalizedWeights[t] = weights[t] / totalRawWeight;
  });

  // Calculate portfolio metrics
  const riskFreeRate = 4.5; // 4.5% 10-Yr T-Bill
  const portfolioReturn = Object.entries(normalizedWeights).reduce((sum, [t, w]) => {
    const asset = ASSET_UNIVERSE.find((a) => a.ticker === t);
    return sum + (asset ? asset.expectedReturn * w : 0);
  }, 0);

  const portfolioBeta = Object.entries(normalizedWeights).reduce((sum, [t, w]) => {
    const asset = ASSET_UNIVERSE.find((a) => a.ticker === t);
    return sum + (asset ? asset.beta * w : 0);
  }, 0);

  // Simplified correlation-adjusted portfolio volatility
  const weightedVol = Object.entries(normalizedWeights).reduce((sum, [t, w]) => {
    const asset = ASSET_UNIVERSE.find((a) => a.ticker === t);
    return sum + (asset ? asset.volatility * w : 0);
  }, 0);
  // Diversification reduction factor ~ 0.88
  const portfolioVol = weightedVol * 0.88;

  const sharpeRatio = portfolioVol > 0 ? (portfolioReturn - riskFreeRate) / portfolioVol : 0;
  const var95Daily = (portfolioVol / Math.sqrt(252)) * 1.645;

  const handleSliderChange = (ticker: string, value: number) => {
    setWeights((prev) => ({
      ...prev,
      [ticker]: value
    }));
  };

  const setPreset = (type: 'balanced' | 'aggressive' | 'conservative') => {
    if (type === 'balanced') {
      setWeights({ NVDA: 15, MSFT: 25, AAPL: 20, VOO: 35, BTC: 5 });
    } else if (type === 'aggressive') {
      setWeights({ NVDA: 35, MSFT: 20, AAPL: 15, VOO: 10, BTC: 20 });
    } else {
      setWeights({ NVDA: 5, MSFT: 20, AAPL: 20, VOO: 55, BTC: 0 });
    }
  };

  const getRiskAssessment = () => {
    if (normalizedWeights['BTC'] > 0.15 || normalizedWeights['NVDA'] > 0.35) {
      return {
        label: 'Aggressive High Beta Profile',
        badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        note: 'Elevated volatility risk; consider hedging with additional index allocation.'
      };
    }
    if (sharpeRatio > 0.65) {
      return {
        label: 'Optimal Risk-Adjusted Allocation',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        note: 'Favorable Sharpe ratio balancing capital appreciation with controlled volatility.'
      };
    }
    return {
      label: 'Moderate Defensive Posture',
      badgeColor: 'text-[#dfb692] bg-[#c28b5e]/10 border-[#c28b5e]/30',
      note: 'Solid capital preservation stance benchmarked closely to S&P 500 performance.'
    };
  };

  const riskAssessment = getRiskAssessment();

  const handleExportCSV = () => {
    let csv = 'Ticker,Name,Sector,Allocation_Weight_Pct,Expected_Return_Pct,Volatility_Pct,Beta\n';
    ASSET_UNIVERSE.forEach((a) => {
      const w = ((normalizedWeights[a.ticker] || 0) * 100).toFixed(1);
      csv += `${a.ticker},"${a.name}",${a.sector},${w}%,${a.expectedReturn}%,${a.volatility}%,${a.beta}\n`;
    });
    csv += `\nPortfolio Metrics\nExpected Annual Return,${portfolioReturn.toFixed(2)}%\nAnnual Volatility,${portfolioVol.toFixed(2)}%\nSharpe Ratio,${sharpeRatio.toFixed(2)}\nPortfolio Beta,${portfolioBeta.toFixed(2)}\n1-Day 95% VaR,${var95Daily.toFixed(2)}%\n`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio_analytics.csv';
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
          <TrendingUp className="w-5 h-5 text-[#c28b5e]" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Quantitative Portfolio & Risk Engine
            </h4>
            <p className="text-[11px] text-stone-400">
              Interactive asset weighting, Sharpe ratio calculation, and Beta sensitivity
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreset('conservative')}
            className="px-2.5 py-1 text-[11px] rounded-lg border border-stone-800 bg-stone-950 hover:bg-stone-800 text-stone-300 cursor-pointer"
          >
            Conservative
          </button>
          <button
            onClick={() => setPreset('balanced')}
            className="px-2.5 py-1 text-[11px] rounded-lg border border-[#c28b5e]/40 bg-[#9c6738]/20 text-[#dfb692] font-semibold cursor-pointer"
          >
            Balanced
          </button>
          <button
            onClick={() => setPreset('aggressive')}
            className="px-2.5 py-1 text-[11px] rounded-lg border border-stone-800 bg-stone-950 hover:bg-stone-800 text-stone-300 cursor-pointer"
          >
            Growth AI
          </button>
        </div>
      </div>

      {/* Main Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className={`p-4 rounded-xl border text-center ${
          isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
        }`}>
          <div className="text-[11px] font-mono text-stone-400">Expected Annual Return</div>
          <div className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
            {portfolioReturn.toFixed(2)}%
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Benchmark: +10.5% S&P</div>
        </div>

        <div className={`p-4 rounded-xl border text-center ${
          isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
        }`}>
          <div className="text-[11px] font-mono text-stone-400">Sharpe Ratio (Rf=4.5%)</div>
          <div className="text-xl sm:text-2xl font-display font-bold text-[#dfb692] mt-1">
            {sharpeRatio.toFixed(2)}
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">Risk-Adjusted Alpha</div>
        </div>

        <div className={`p-4 rounded-xl border text-center ${
          isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
        }`}>
          <div className="text-[11px] font-mono text-stone-400">Annual Volatility (σ)</div>
          <div className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
            {portfolioVol.toFixed(2)}%
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">1-Yr Std Deviation</div>
        </div>

        <div className={`p-4 rounded-xl border text-center ${
          isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
        }`}>
          <div className="text-[11px] font-mono text-stone-400">Portfolio Beta (β)</div>
          <div className="text-xl sm:text-2xl font-display font-bold text-[#c28b5e] mt-1">
            {portfolioBeta.toFixed(2)}
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">Market Covariance</div>
        </div>
      </div>

      {/* Allocation Visual Stacked Bar */}
      <div className={`p-4 rounded-xl border space-y-2 ${
        isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200'
      }`}>
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-stone-300 font-semibold">Asset Allocation Distribution</span>
          <span className="text-stone-400">Total: 100% Normalized</span>
        </div>

        <div className="w-full h-3 rounded-full overflow-hidden flex bg-stone-800">
          {ASSET_UNIVERSE.map((a, i) => {
            const pct = (normalizedWeights[a.ticker] || 0) * 100;
            const colors = ['bg-[#c28b5e]', 'bg-[#9c6738]', 'bg-[#dfb692]', 'bg-stone-400', 'bg-stone-600'];
            return (
              <div
                key={a.ticker}
                style={{ width: `${pct}%` }}
                title={`${a.ticker}: ${pct.toFixed(1)}%`}
                className={`${colors[i % colors.length]} h-full transition-all duration-300`}
              />
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono pt-1 text-stone-400">
          {ASSET_UNIVERSE.map((a, i) => {
            const pct = (normalizedWeights[a.ticker] || 0) * 100;
            const dotColors = ['bg-[#c28b5e]', 'bg-[#9c6738]', 'bg-[#dfb692]', 'bg-stone-400', 'bg-stone-600'];
            return (
              <div key={a.ticker} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${dotColors[i % dotColors.length]}`} />
                <span>{a.ticker}: {pct.toFixed(1)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sliders Grid & Quantitative Risk Verdict */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sliders */}
        <div className={`lg:col-span-7 p-5 rounded-2xl border space-y-4 ${
          isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Interactive Asset Weight Sliders
            </h4>
            <span className="text-[11px] font-mono text-stone-400">Live Recalculation</span>
          </div>

          <div className="space-y-4">
            {ASSET_UNIVERSE.map((asset) => {
              const currentWeight = weights[asset.ticker] || 0;
              const normalizedPct = ((normalizedWeights[asset.ticker] || 0) * 100).toFixed(1);

              return (
                <div key={asset.ticker} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-200">
                      {asset.ticker} <span className="font-normal text-stone-400">· {asset.name}</span>
                    </span>
                    <span className="font-mono text-[#dfb692] font-bold">
                      {normalizedPct}% ({currentWeight} pts)
                    </span>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={60}
                    value={currentWeight}
                    onChange={(e) => handleSliderChange(asset.ticker, Number(e.target.value))}
                    className="w-full accent-[#c28b5e] cursor-pointer"
                  />
                  
                  <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                    <span>Exp. Return: {asset.expectedReturn}%</span>
                    <span>Vol: {asset.volatility}%</span>
                    <span>Beta: {asset.beta}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Risk Verdict & Export */}
        <div className={`lg:col-span-5 p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
          isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-sm'
        }`}>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Risk Analytics & Sensitivity
            </h4>

            <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${riskAssessment.badgeColor}`}>
              <div className="font-bold">{riskAssessment.label}</div>
              <p className="text-[11px] leading-relaxed opacity-90">{riskAssessment.note}</p>
            </div>

            <div className={`p-4 rounded-xl border text-xs space-y-2.5 ${
              isDark ? 'bg-stone-950/80 border-stone-800 text-stone-300' : 'bg-stone-50 border-stone-200 text-stone-700'
            }`}>
              <div className="flex justify-between">
                <span className="text-stone-400">1-Day Parametric VaR (95%):</span>
                <span className="font-mono font-bold text-amber-400">-{var95Daily.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Annual Excess Yield over Rf:</span>
                <span className="font-mono font-bold text-emerald-400">+{(portfolioReturn - riskFreeRate).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Benchmark Correlation:</span>
                <span className="font-mono text-stone-200">0.89 (High)</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleExportCSV}
            className="w-full py-3 px-4 rounded-xl bg-[#9c6738] hover:bg-[#85542b] text-white text-xs font-bold transition-all shadow-md shadow-[#9c6738]/25 border border-[#c28b5e]/40 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Download className="w-4 h-4 text-[#dfb692]" />
            <span>Export Quantitative CSV Report</span>
          </button>
        </div>

      </div>
    </div>
  );
};

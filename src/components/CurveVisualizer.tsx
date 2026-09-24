import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { CurveParameters, CurveSimulationPoint } from '../types/curve';
import { TrendingUp, DollarSign, Award, Info } from 'lucide-react';

interface CurveVisualizerProps {
  params: CurveParameters;
  points: CurveSimulationPoint[];
  currentProgress: number; // 0 to 100%
}

export const CurveVisualizer: React.FC<CurveVisualizerProps> = ({
  params,
  points,
  currentProgress,
}) => {
  const [viewMode, setViewMode] = useState<'price' | 'marketCap'>('price');

  const startPoint = points[0] || { priceSol: 0, priceUsd: 0, marketCapUsd: 0 };
  const endPoint = points[points.length - 1] || { priceSol: 0, priceUsd: 0, marketCapUsd: 0 };
  const priceMultiplier = startPoint.priceSol > 0 ? (endPoint.priceSol / startPoint.priceSol).toFixed(1) : '1';

  // Format currency
  const formatSol = (val: number) => {
    if (val < 0.000001) return val.toExponential(2);
    if (val < 0.001) return val.toFixed(7);
    return val.toFixed(5);
  };

  const formatUsd = (val: number) => {
    if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
    if (val >= 1e3) return `$${(val / 1e3).toFixed(1)}k`;
    if (val < 0.01) return `$${val.toFixed(5)}`;
    return `$${val.toFixed(2)}`;
  };

  return (
    <div className="bg-[#0f171e] border border-[#1b2a38] rounded-2xl p-6 shadow-xl relative overflow-hidden">
      
      {/* Top Header & View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4 border-b border-[#1b2a38]/60">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold text-white tracking-tight">Bonding Curve Mathematical Model</h2>
            <span className="text-xs px-2 py-0.5 rounded bg-[#2bfbb1]/10 text-[#2bfbb1] font-mono border border-[#2bfbb1]/30 uppercase">
              {params.curveType}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time price trajectory until migration to Meteora DAMM v2 pool
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-[#080d11] p-1 rounded-lg border border-[#1b2a38] self-start sm:self-auto text-xs">
          <button
            onClick={() => setViewMode('price')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'price'
                ? 'bg-[#1b2a38] text-[#2bfbb1]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Price (SOL/USD)</span>
          </button>
          <button
            onClick={() => setViewMode('marketCap')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'marketCap'
                ? 'bg-[#1b2a38] text-[#2bfbb1]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Market Cap</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 my-2">
        <div className="bg-[#080d11]/60 p-3 rounded-xl border border-[#1b2a38]/80">
          <span className="text-[11px] text-slate-400 block font-medium">Initial Price</span>
          <span className="text-sm font-bold text-white font-mono">{formatSol(startPoint.priceSol)} SOL</span>
          <span className="text-[11px] text-slate-500 block font-mono">{formatUsd(startPoint.priceUsd)}</span>
        </div>

        <div className="bg-[#080d11]/60 p-3 rounded-xl border border-[#1b2a38]/80">
          <span className="text-[11px] text-slate-400 block font-medium">Graduation Price</span>
          <span className="text-sm font-bold text-[#2bfbb1] font-mono">{formatSol(endPoint.priceSol)} SOL</span>
          <span className="text-[11px] text-[#2bfbb1]/70 block font-mono">{formatUsd(endPoint.priceUsd)}</span>
        </div>

        <div className="bg-[#080d11]/60 p-3 rounded-xl border border-[#1b2a38]/80">
          <span className="text-[11px] text-slate-400 block font-medium">Growth Multiplier</span>
          <span className="text-sm font-bold text-cyan-400 font-mono">{priceMultiplier}x</span>
          <span className="text-[11px] text-slate-500 block">From start to graduation</span>
        </div>

        <div className="bg-[#080d11]/60 p-3 rounded-xl border border-[#1b2a38]/80">
          <span className="text-[11px] text-slate-400 block font-medium">Target SOL Raised</span>
          <span className="text-sm font-bold text-white font-mono">{params.targetSolCap} SOL</span>
          <span className="text-[11px] text-slate-500 block font-mono">
            {formatUsd(params.targetSolCap * params.solPriceUsd)}
          </span>
        </div>
      </div>

      {/* Main Chart Canvas */}
      <div className="h-72 sm:h-80 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2bfbb1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#2bfbb1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="progress"
              stroke="#475569"
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
              fontSize={11}
            />
            <YAxis
              stroke="#475569"
              tickLine={false}
              fontSize={11}
              tickFormatter={(v) => (viewMode === 'price' ? formatSol(v) : formatUsd(v))}
              domain={['auto', 'auto']}
              orientation="right"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as CurveSimulationPoint;
                  return (
                    <div className="bg-[#080d11] border border-[#2bfbb1]/40 rounded-xl p-3 shadow-2xl text-xs space-y-1.5 font-mono">
                      <div className="font-bold text-[#2bfbb1] flex items-center justify-between">
                        <span>Curve Progress</span>
                        <span>{data.progress}%</span>
                      </div>
                      <div className="text-slate-300 flex justify-between gap-4">
                        <span className="text-slate-400">Token Price:</span>
                        <span className="font-semibold text-white">{formatSol(data.priceSol)} SOL</span>
                      </div>
                      <div className="text-slate-300 flex justify-between gap-4">
                        <span className="text-slate-400">USD Price:</span>
                        <span className="font-semibold text-emerald-400">{formatUsd(data.priceUsd)}</span>
                      </div>
                      <div className="text-slate-300 flex justify-between gap-4">
                        <span className="text-slate-400">Cumulative SOL:</span>
                        <span className="font-semibold text-white">{data.solRaised.toFixed(2)} SOL</span>
                      </div>
                      <div className="text-slate-300 flex justify-between gap-4">
                        <span className="text-slate-400">Tokens Sold:</span>
                        <span className="font-semibold text-slate-200">
                          {(data.tokensSold / 1e6).toFixed(1)}M
                        </span>
                      </div>
                      <div className="text-slate-300 flex justify-between gap-4 pt-1 border-t border-[#1b2a38]">
                        <span className="text-slate-400">Market Cap:</span>
                        <span className="font-bold text-cyan-400">{formatUsd(data.marketCapUsd)}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine
              x={currentProgress}
              stroke="#00f2fe"
              strokeDasharray="4 4"
              label={{
                value: `Current: ${currentProgress.toFixed(0)}%`,
                fill: '#00f2fe',
                fontSize: 11,
                position: 'top',
              }}
            />
            <ReferenceLine
              x={100}
              stroke="#2bfbb1"
              strokeDasharray="3 3"
              label={{
                value: 'DAMM v2 Migration (100%)',
                fill: '#2bfbb1',
                fontSize: 11,
                position: 'insideTopLeft',
              }}
            />
            <Area
              type="monotone"
              dataKey={viewMode === 'price' ? 'priceSol' : 'marketCapUsd'}
              stroke="#2bfbb1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#curveGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Graduation Banner Note */}
      <div className="mt-4 p-3 rounded-xl bg-[#080d11]/80 border border-[#1b2a38] flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-[#2bfbb1] flex-shrink-0" />
          <span>
            At 100% progress, <strong>{params.targetSolCap} SOL</strong> & remaining tokens are permanently migrated into{' '}
            <strong className="text-[#2bfbb1]">Meteora DAMM v2</strong>.
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1 text-slate-500">
          <Info className="w-3.5 h-3.5" />
          <span>Permanent LP Lock</span>
        </div>
      </div>

    </div>
  );
};

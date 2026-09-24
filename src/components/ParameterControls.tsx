import React from 'react';
import type { CurveParameters, CurveType } from '../types/curve';
import { Sliders, Activity, Shield, Coins, Sparkles } from 'lucide-react';

interface ParameterControlsProps {
  params: CurveParameters;
  onChange: (updated: Partial<CurveParameters>) => void;
}

const CURVE_OPTIONS: { id: CurveType; label: string; icon: string; desc: string }[] = [
  { id: 'linear', label: 'Linear', icon: '📈', desc: 'Even, steady growth (Fair launch style)' },
  { id: 'exponential', label: 'Exponential', icon: '🚀', desc: 'Steep reward for early conviction' },
  { id: 'sigmoid', label: 'Sigmoid S-Curve', icon: '🛡️', desc: 'Anti-sniper with smooth graduation' },
  { id: 'stepped', label: 'Stepped Tiers', icon: '🪜', desc: 'Discrete stages (Seed, Public, Pre-DAMM)' },
  { id: 'flat', label: 'Flat-to-Rise', icon: '🏛️', desc: 'Predictable baseline for RWA / Equities' },
];

const FEE_TIERS = [
  { bps: 25, label: '0.25%' },
  { bps: 50, label: '0.50%' },
  { bps: 100, label: '1.00%' },
  { bps: 150, label: '1.50%' },
  { bps: 200, label: '2.00%' },
];

export const ParameterControls: React.FC<ParameterControlsProps> = ({ params, onChange }) => {
  return (
    <div className="bg-[#0f171e] border border-[#1b2a38] rounded-2xl p-6 shadow-xl space-y-6">
      
      <div className="flex items-center justify-between border-b border-[#1b2a38]/60 pb-4">
        <div className="flex items-center space-x-2">
          <Sliders className="w-5 h-5 text-[#2bfbb1]" />
          <h3 className="font-bold text-white text-base">Curve Configuration</h3>
        </div>
        <span className="text-xs text-slate-400">Anchor Preset Ready</span>
      </div>

      {/* Token Identity */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-300 block mb-1.5">Token Name</label>
          <input
            type="text"
            value={params.tokenName}
            onChange={(e) => onChange({ tokenName: e.target.value })}
            className="w-full bg-[#080d11] border border-[#1b2a38] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2bfbb1] font-medium"
            placeholder="e.g. Meteora Sol"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-300 block mb-1.5">Symbol</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-500 font-mono text-sm">$</span>
            <input
              type="text"
              value={params.tokenSymbol}
              onChange={(e) => onChange({ tokenSymbol: e.target.value.toUpperCase() })}
              className="w-full bg-[#080d11] border border-[#1b2a38] rounded-xl pl-7 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#2bfbb1] font-mono font-bold"
              placeholder="MET"
            />
          </div>
        </div>
      </div>

      {/* Curve Type Selector */}
      <div>
        <label className="text-xs font-medium text-slate-300 block mb-2 flex items-center justify-between">
          <span>Mathematical Curve Model</span>
          <span className="text-slate-500 text-[11px]">Select bonding trajectory</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {CURVE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onChange({ curveType: opt.id })}
              className={`p-3 rounded-xl border text-left transition-all relative ${
                params.curveType === opt.id
                  ? 'bg-[#1b2a38] border-[#2bfbb1] text-white shadow-md shadow-[#2bfbb1]/5'
                  : 'bg-[#080d11]/60 border-[#1b2a38] text-slate-400 hover:border-slate-600 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-base">{opt.icon}</span>
                <span className="font-semibold text-xs text-white">{opt.label}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Sliders Section */}
      <div className="space-y-4 pt-2 border-t border-[#1b2a38]/60">
        
        {/* Target SOL Cap */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-[#2bfbb1]" />
              Target SOL Cap (Graduation to DAMM v2)
            </span>
            <span className="font-mono font-bold text-[#2bfbb1] text-sm">{params.targetSolCap} SOL</span>
          </div>
          <input
            type="range"
            min="20"
            max="300"
            step="5"
            value={params.targetSolCap}
            onChange={(e) => onChange({ targetSolCap: Number(e.target.value) })}
            className="w-full accent-[#2bfbb1] bg-[#080d11] h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>20 SOL (Micro)</span>
            <span>85 SOL (Standard)</span>
            <span>300 SOL (High Liquidity)</span>
          </div>
        </div>

        {/* Total Token Supply */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Bonding Curve Token Supply
            </span>
            <span className="font-mono font-bold text-white text-sm">
              {(params.totalSupply / 1e6).toLocaleString()} Million
            </span>
          </div>
          <input
            type="range"
            min="100000000"
            max="2000000000"
            step="100000000"
            value={params.totalSupply}
            onChange={(e) => onChange({ totalSupply: Number(e.target.value) })}
            className="w-full accent-[#00f2fe] bg-[#080d11] h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Curve Steepness (if applicable) */}
        {(params.curveType === 'exponential' || params.curveType === 'sigmoid') && (
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Curve Curvature / Steepness
              </span>
              <span className="font-mono font-bold text-amber-400 text-sm">
                {params.steepness.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="3.5"
              step="0.1"
              value={params.steepness}
              onChange={(e) => onChange({ steepness: Number(e.target.value) })}
              className="w-full accent-amber-400 bg-[#080d11] h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}

        {/* Trading Fee Tier */}
        <div>
          <label className="text-xs font-medium text-slate-300 block mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Trading Fee During Bonding Phase
            </span>
            <span className="text-slate-500 font-mono text-[11px]">{params.feeBps} BPS</span>
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {FEE_TIERS.map((tier) => (
              <button
                key={tier.bps}
                onClick={() => onChange({ feeBps: tier.bps })}
                className={`py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  params.feeBps === tier.bps
                    ? 'bg-[#2bfbb1] text-[#080d11] shadow-sm'
                    : 'bg-[#080d11] border border-[#1b2a38] text-slate-400 hover:text-white'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        {/* Meteora DAMM v2 Dynamic Fee & LP Allocation */}
        <div className="pt-3 border-t border-[#1b2a38]/60 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">Meteora DAMM v2 Dynamic Fee</span>
              <span className="text-[11px] text-slate-400">
                Adjusts fee automatically based on market volatility
              </span>
            </div>
            <button
              onClick={() => onChange({ dammV2DynamicFee: !params.dammV2DynamicFee })}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                params.dammV2DynamicFee ? 'bg-[#2bfbb1]' : 'bg-[#1b2a38]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  params.dammV2DynamicFee ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">Creator LP Fee Allocation</span>
              <span className="text-[11px] text-slate-400">
                Permanent revenue share from post-graduation DAMM v2 pool
              </span>
            </div>
            <span className="font-mono text-xs text-[#2bfbb1] font-bold">
              {params.creatorLpFeeShare}%
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

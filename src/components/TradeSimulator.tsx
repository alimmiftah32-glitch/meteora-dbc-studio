import React, { useState } from 'react';
import type { CurveParameters } from '../types/curve';
import { simulateBuy } from '../utils/curveMath';
import { Play, RotateCcw, AlertTriangle, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface TradeSimulatorProps {
  params: CurveParameters;
  currentSolRaised: number;
  onExecuteBuy: (solAmount: number) => void;
  onReset: () => void;
  onGraduation: () => void;
}

const QUICK_SOL_AMOUNTS = [0.5, 1, 5, 10, 25];

export const TradeSimulator: React.FC<TradeSimulatorProps> = ({
  params,
  currentSolRaised,
  onExecuteBuy,
  onReset,
  onGraduation,
}) => {
  const [buyAmount, setBuyAmount] = useState<number>(5);

  const simulation = simulateBuy(params, currentSolRaised, buyAmount);
  const progressPct = Math.min(100, (currentSolRaised / params.targetSolCap) * 100);

  const handleBuy = () => {
    if (simulation.graduates) {
      onGraduation();
    }
    onExecuteBuy(buyAmount);
  };

  return (
    <div className="bg-[#0f171e] border border-[#1b2a38] rounded-2xl p-6 shadow-xl space-y-5">
      
      {/* Title & Reset */}
      <div className="flex items-center justify-between border-b border-[#1b2a38]/60 pb-4">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-white text-base">Interactive Trade & Slippage Simulator</h3>
        </div>
        <button
          onClick={onReset}
          className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-[#080d11] border border-[#1b2a38]"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Progress to DAMM v2 Migration */}
      <div>
        <div className="flex justify-between items-center text-xs mb-2 font-mono">
          <span className="text-slate-300 flex items-center gap-1.5 font-sans font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2bfbb1]" />
            Migration Threshold Progress
          </span>
          <span className="text-white font-bold">
            {currentSolRaised.toFixed(2)} / {params.targetSolCap} SOL ({progressPct.toFixed(1)}%)
          </span>
        </div>
        <div className="w-full bg-[#080d11] h-3 rounded-full overflow-hidden p-0.5 border border-[#1b2a38]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#00f2fe] via-[#2bfbb1] to-emerald-400 transition-all duration-300 shadow-sm shadow-[#2bfbb1]/50"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Buy Input & Quick Chips */}
      <div>
        <label className="text-xs font-medium text-slate-300 block mb-1.5">
          Simulated Buy Amount (SOL)
        </label>
        <div className="relative">
          <input
            type="number"
            min="0.1"
            max={params.targetSolCap}
            step="0.5"
            value={buyAmount}
            onChange={(e) => setBuyAmount(Math.max(0.1, Number(e.target.value)))}
            className="w-full bg-[#080d11] border border-[#1b2a38] rounded-xl px-4 py-2.5 text-lg font-mono font-bold text-white focus:outline-none focus:border-[#2bfbb1]"
          />
          <span className="absolute right-4 top-3 text-slate-400 font-mono font-semibold text-sm">
            SOL
          </span>
        </div>

        {/* Quick Amount Chips */}
        <div className="flex gap-2 mt-2">
          {QUICK_SOL_AMOUNTS.map((amt) => (
            <button
              key={amt}
              onClick={() => setBuyAmount(amt)}
              className={`flex-1 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                buyAmount === amt
                  ? 'bg-[#1b2a38] text-[#2bfbb1] border border-[#2bfbb1]/40'
                  : 'bg-[#080d11] text-slate-400 border border-[#1b2a38] hover:text-white'
              }`}
            >
              +{amt} SOL
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Trade Impact Calculations */}
      <div className="bg-[#080d11] rounded-xl p-4 border border-[#1b2a38] space-y-2.5 font-mono text-xs">
        <div className="flex justify-between items-center text-slate-300">
          <span className="text-slate-400">Tokens Received:</span>
          <span className="text-[#2bfbb1] font-bold text-sm">
            {(simulation.tokensOut / 1e6).toFixed(2)}M ${params.tokenSymbol}
          </span>
        </div>

        <div className="flex justify-between items-center text-slate-300">
          <span className="text-slate-400">Avg Execution Price:</span>
          <span className="text-white font-semibold">
            {simulation.effectivePriceSol.toFixed(7)} SOL
          </span>
        </div>

        <div className="flex justify-between items-center text-slate-300">
          <span className="text-slate-400">Price Impact / Slippage:</span>
          <span
            className={`font-bold ${
              simulation.priceImpactPct > 15
                ? 'text-rose-400'
                : simulation.priceImpactPct > 5
                ? 'text-amber-400'
                : 'text-emerald-400'
            }`}
          >
            +{simulation.priceImpactPct.toFixed(2)}%
          </span>
        </div>

        <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-[#1b2a38]">
          <span className="text-slate-400">Curve Progress After Buy:</span>
          <span className="text-cyan-400 font-bold flex items-center gap-1">
            {progressPct.toFixed(1)}% <ArrowRight className="w-3 h-3" /> {simulation.newProgress.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Graduation Warning Alert */}
      {simulation.graduates && (
        <div className="p-3 rounded-xl bg-[#2bfbb1]/10 border border-[#2bfbb1]/30 flex items-center space-x-2.5 text-xs text-[#2bfbb1]">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>Graduation Alert!</strong> This order will complete the bonding curve and trigger automatic migration to Meteora DAMM v2.
          </span>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleBuy}
        disabled={progressPct >= 100}
        className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg ${
          progressPct >= 100
            ? 'bg-[#1b2a38] text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-[#2bfbb1] to-[#00f2fe] text-[#080d11] hover:opacity-95 shadow-[#2bfbb1]/10'
        }`}
      >
        <Play className="w-4 h-4 fill-current" />
        <span>
          {progressPct >= 100
            ? 'Bonding Curve Completed (DAMM v2 Active)'
            : `Execute Test Buy of ${buyAmount} SOL`}
        </span>
      </button>

    </div>
  );
};

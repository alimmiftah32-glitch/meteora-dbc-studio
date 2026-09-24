import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { CurveParameters } from '../types/curve';
import { Award, CheckCircle, Lock, ExternalLink, X } from 'lucide-react';

interface MigrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: CurveParameters;
}

export const MigrationModal: React.FC<MigrationModalProps> = ({ isOpen, onClose, params }) => {
  useEffect(() => {
    if (isOpen) {
      // Fire confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2bfbb1', '#00f2fe', '#ffffff', '#3b82f6'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0f171e] border border-[#2bfbb1]/50 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Graduation Trophy Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2bfbb1] to-[#00f2fe] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[#2bfbb1]/30">
          <Award className="w-8 h-8 text-[#080d11]" />
        </div>

        <div className="text-center mb-6">
          <span className="text-xs px-3 py-1 rounded-full bg-[#2bfbb1]/10 text-[#2bfbb1] font-mono border border-[#2bfbb1]/40 font-semibold uppercase">
            Graduation Achieved
          </span>
          <h3 className="text-xl font-bold text-white mt-2">
            Migrating to Meteora DAMM v2!
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            100% of the bonding curve target has been filled. All liquidity is transitioning to the decentralized AMM.
          </p>
        </div>

        {/* Step-by-Step Migration Summary */}
        <div className="space-y-3 bg-[#080d11] p-4 rounded-xl border border-[#1b2a38] text-xs font-mono mb-6">
          <div className="flex items-center space-x-2.5 text-slate-300">
            <CheckCircle className="w-4 h-4 text-[#2bfbb1] flex-shrink-0" />
            <span>Target Reached: <strong>{params.targetSolCap} SOL</strong> Raised</span>
          </div>

          <div className="flex items-center space-x-2.5 text-slate-300">
            <CheckCircle className="w-4 h-4 text-[#2bfbb1] flex-shrink-0" />
            <span>Deposit into <strong>Meteora DAMM v2 Pool</strong></span>
          </div>

          <div className="flex items-center space-x-2.5 text-slate-300">
            <Lock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>Permanent LP Tokens <strong>Burned / Locked</strong></span>
          </div>

          <div className="flex items-center space-x-2.5 text-slate-300">
            <CheckCircle className="w-4 h-4 text-[#2bfbb1] flex-shrink-0" />
            <span>
              Dynamic Fee Tier: <strong>{params.dammV2DynamicFee ? 'Enabled (Volatility Scaled)' : 'Standard (0.3%)'}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-2.5 text-slate-300">
            <CheckCircle className="w-4 h-4 text-[#2bfbb1] flex-shrink-0" />
            <span>Creator Ongoing Fee Share: <strong>{params.creatorLpFeeShare}%</strong></span>
          </div>
        </div>

        {/* Button Actions */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-[#1b2a38] hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
          >
            Back to Simulator
          </button>
          <a
            href="https://app.meteora.ag"
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#2bfbb1] to-[#00f2fe] text-[#080d11] font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-[#2bfbb1]/20 hover:opacity-95"
          >
            <span>View Meteora DAMM</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { CURVE_PRESETS } from '../data/presets';
import type { CurvePreset } from '../types/curve';
import { Bookmark } from 'lucide-react';

interface PresetPickerProps {
  currentPresetId?: string;
  onSelectPreset: (preset: CurvePreset) => void;
}

export const PresetPicker: React.FC<PresetPickerProps> = ({ currentPresetId, onSelectPreset }) => {
  return (
    <div className="bg-[#0f171e] border border-[#1b2a38] rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-[#1b2a38]/60 pb-3">
        <div className="flex items-center space-x-2">
          <Bookmark className="w-5 h-5 text-[#2bfbb1]" />
          <h3 className="font-bold text-white text-base">Curated Curve Presets</h3>
        </div>
        <span className="text-xs text-slate-400">1-Click Launch Ready</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {CURVE_PRESETS.map((p) => (
          <div
            key={p.id}
            onClick={() => onSelectPreset(p)}
            className={`p-4 rounded-xl border text-left cursor-pointer transition-all hover:border-[#2bfbb1]/60 flex flex-col justify-between ${
              currentPresetId === p.id
                ? 'bg-[#1b2a38]/80 border-[#2bfbb1] shadow-lg shadow-[#2bfbb1]/10'
                : 'bg-[#080d11]/70 border-[#1b2a38] hover:bg-[#1b2a38]/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-sm text-white">{p.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2bfbb1]/10 text-[#2bfbb1] border border-[#2bfbb1]/30 font-medium">
                  {p.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3">{p.description}</p>
            </div>

            <div className="pt-2 border-t border-[#1b2a38]/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Target: <strong className="text-white">{p.targetSolCap} SOL</strong></span>
              <span>Fee: <strong className="text-white">{(p.feeBps / 100).toFixed(2)}%</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

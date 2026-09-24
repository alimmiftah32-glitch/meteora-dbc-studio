import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CurveVisualizer } from './components/CurveVisualizer';
import { ParameterControls } from './components/ParameterControls';
import { TradeSimulator } from './components/TradeSimulator';
import { PresetPicker } from './components/PresetPicker';
import { CodeExportModal } from './components/CodeExportModal';
import { MigrationModal } from './components/MigrationModal';
import type { CurveParameters, CurvePreset } from './types/curve';
import { generateCurvePoints } from './utils/curveMath';
import { Sparkles, Terminal, Code2, Layers, ShieldCheck } from 'lucide-react';

const INITIAL_PARAMS: CurveParameters = {
  tokenName: 'Meteora Dynamic Sol',
  tokenSymbol: 'MDBC',
  totalSupply: 1000000000, // 1 Billion tokens
  targetSolCap: 85,         // 85 SOL
  curveType: 'linear',
  initialPriceSol: 0.00000002,
  finalPriceSol: 0.00000028,
  feeBps: 100,              // 1%
  dammV2DynamicFee: true,
  solPriceUsd: 165,
  steepness: 1.0,
  creatorLpFeeShare: 50,
};

export const App: React.FC = () => {
  const [params, setParams] = useState<CurveParameters>(INITIAL_PARAMS);
  const [currentSolRaised, setCurrentSolRaised] = useState<number>(12.5); // Started with 12.5 SOL
  const [network, setNetwork] = useState<'mainnet' | 'devnet'>('devnet');
  const [activePresetId, setActivePresetId] = useState<string>('fair-launch-classic');

  // Modal states
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isMigrationOpen, setIsMigrationOpen] = useState(false);

  // Compute curve points whenever parameters change
  const points = useMemo(() => {
    return generateCurvePoints(params, 80);
  }, [params]);

  const currentProgress = Math.min(100, (currentSolRaised / params.targetSolCap) * 100);

  const handleUpdateParams = (updated: Partial<CurveParameters>) => {
    setParams((prev) => ({ ...prev, ...updated }));
  };

  const handleSelectPreset = (preset: CurvePreset) => {
    setActivePresetId(preset.id);
    const avgTokenPrice = preset.targetSolCap / params.totalSupply;
    setParams((prev) => ({
      ...prev,
      curveType: preset.curveType,
      targetSolCap: preset.targetSolCap,
      feeBps: preset.feeBps,
      initialPriceSol: avgTokenPrice * preset.initialPriceMultiplier,
      finalPriceSol: avgTokenPrice * preset.finalPriceMultiplier,
      steepness: preset.steepness,
    }));
  };

  const handleExecuteBuy = (solAmount: number) => {
    setCurrentSolRaised((prev) => {
      const next = Math.min(params.targetSolCap, prev + solAmount);
      if (next >= params.targetSolCap) {
        setIsMigrationOpen(true);
      }
      return next;
    });
  };

  const handleResetSimulation = () => {
    setCurrentSolRaised(0);
  };

  return (
    <div className="min-h-screen bg-[#080d11] text-slate-100 flex flex-col font-sans selection:bg-[#2bfbb1] selection:text-[#080d11]">
      
      {/* Header */}
      <Header
        network={network}
        setNetwork={setNetwork}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#0f171e] via-[#121c25] to-[#0f171e] border border-[#1b2a38]">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#2bfbb1]/10 text-[#2bfbb1] font-semibold border border-[#2bfbb1]/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Meteora Superteam Bounty Submission
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dynamic Bonding Curve (DBC) Studio
            </h1>
            <p className="text-sm text-slate-400">
              Architect, simulate, and deploy custom mathematical bonding curves with automatic migration into Meteora DAMM v2 liquidity pools.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-center">
            <button
              onClick={() => setIsExportOpen(true)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2bfbb1] to-[#00f2fe] text-[#080d11] font-bold text-xs shadow-lg shadow-[#2bfbb1]/20 hover:opacity-95 transition-all"
            >
              <Code2 className="w-4 h-4" />
              <span>Get Anchor SDK Code</span>
            </button>
            <button
              onClick={() => setIsMigrationOpen(true)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#1b2a38] hover:bg-slate-700 text-white font-medium text-xs transition-colors border border-slate-600"
            >
              <Layers className="w-4 h-4 text-[#2bfbb1]" />
              <span>Simulate DAMM v2</span>
            </button>
          </div>
        </div>

        {/* 1-Click Curated Presets */}
        <PresetPicker
          currentPresetId={activePresetId}
          onSelectPreset={handleSelectPreset}
        />

        {/* Core Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Visualizer & Simulator (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <CurveVisualizer
              params={params}
              points={points}
              currentProgress={currentProgress}
            />
            
            <TradeSimulator
              params={params}
              currentSolRaised={currentSolRaised}
              onExecuteBuy={handleExecuteBuy}
              onReset={handleResetSimulation}
              onGraduation={() => setIsMigrationOpen(true)}
            />
          </div>

          {/* Right Column: Parameters & Config (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <ParameterControls
              params={params}
              onChange={handleUpdateParams}
            />

            {/* Quick Developer Specs Card */}
            <div className="bg-[#0f171e] border border-[#1b2a38] rounded-2xl p-5 shadow-xl space-y-3 text-xs">
              <div className="flex items-center space-x-2 text-white font-bold">
                <Terminal className="w-4 h-4 text-[#2bfbb1]" />
                <span>On-Chain Integration Guarantee</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                This studio adheres strictly to the official Meteora DBC Protocol specifications:
              </p>
              <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2bfbb1]" />
                  <span>SDK: <code className="text-[#2bfbb1]">@meteora-ag/dynamic-bonding-curve-sdk</code></span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2bfbb1]" />
                  <span>Migration: <code className="text-cyan-400">@meteora-ag/damm-v2-sdk</code></span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2bfbb1]" />
                  <span>Solana Anchor CPI Program Compatible</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#1b2a38] bg-[#080d11] py-8 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-[#2bfbb1]/10 border border-[#2bfbb1]/30 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5 text-[#2bfbb1]" />
            </div>
            <span className="text-slate-400 font-medium">Meteora DBC Studio</span>
            <span>—</span>
            <span>Built for Superteam Earn & Meteora Ecosystem</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/alimmiftah32-glitch"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              GitHub: @alimmiftah32-glitch
            </a>
            <span>•</span>
            <a
              href="https://superteam.fun/earn/listing/meteora-dbc"
              target="_blank"
              rel="noreferrer"
              className="text-[#2bfbb1] hover:underline"
            >
              Superteam Listing
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CodeExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        params={params}
      />

      <MigrationModal
        isOpen={isMigrationOpen}
        onClose={() => setIsMigrationOpen(false)}
        params={params}
      />

    </div>
  );
};

export default App;

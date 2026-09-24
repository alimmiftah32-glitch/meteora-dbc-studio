import React, { useState } from 'react';
import { Layers, Wallet, ExternalLink, Zap, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  network: 'mainnet' | 'devnet';
  setNetwork: (net: 'mainnet' | 'devnet') => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ network, setNetwork, onOpenExport }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const toggleWallet = () => {
    if (walletConnected) {
      setWalletConnected(false);
      setWalletAddress(null);
    } else {
      setWalletConnected(true);
      setWalletAddress('7xKX...9qPv');
    }
  };

  return (
    <header className="border-b border-[#1b2a38] bg-[#080d11]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2bfbb1] to-[#00f2fe] flex items-center justify-center shadow-lg shadow-[#2bfbb1]/20">
            <Layers className="w-6 h-6 text-[#080d11]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-white">Meteora</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#2bfbb1]/10 text-[#2bfbb1] border border-[#2bfbb1]/30 font-mono font-medium">
                DBC Studio
              </span>
            </div>
            <p className="text-xs text-slate-400">Dynamic Bonding Curve & DAMM v2 Simulator</p>
          </div>
        </div>

        {/* Center Badges */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0f171e] border border-[#1b2a38] text-xs text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2bfbb1]" />
            <span>Meteora DBC Bounty Ready</span>
          </div>
          <a
            href="https://docs.meteora.ag"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1 text-xs text-slate-400 hover:text-[#2bfbb1] transition-colors"
          >
            <span>Meteora Docs</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Network Switcher */}
          <div className="flex items-center bg-[#0f171e] p-1 rounded-lg border border-[#1b2a38] text-xs">
            <button
              onClick={() => setNetwork('mainnet')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                network === 'mainnet'
                  ? 'bg-[#1b2a38] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mainnet
            </button>
            <button
              onClick={() => setNetwork('devnet')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                network === 'devnet'
                  ? 'bg-[#2bfbb1] text-[#080d11] font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Devnet
            </button>
          </div>

          {/* Export SDK Code */}
          <button
            onClick={onOpenExport}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0f171e] hover:bg-[#1b2a38] text-xs text-[#2bfbb1] border border-[#2bfbb1]/30 font-medium transition-colors"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Export SDK</span>
          </button>

          {/* Wallet Button */}
          <button
            onClick={toggleWallet}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              walletConnected
                ? 'bg-[#0f171e] text-[#2bfbb1] border border-[#2bfbb1]/40'
                : 'bg-gradient-to-r from-[#2bfbb1] to-[#00f2fe] text-[#080d11] hover:opacity-95 shadow-md shadow-[#2bfbb1]/10'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>{walletConnected ? walletAddress : 'Connect Wallet'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};

import React, { useState } from 'react';
import type { CurveParameters } from '../types/curve';
import { generateMeteoraTypeScriptSdkCode, generateAnchorJsonConfig } from '../utils/meteoraSdkGenerator';
import { X, Copy, Check, Terminal, Code2, FileJson } from 'lucide-react';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: CurveParameters;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({ isOpen, onClose, params }) => {
  const [activeTab, setActiveTab] = useState<'ts' | 'json' | 'cli'>('ts');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const tsCode = generateMeteoraTypeScriptSdkCode(params);
  const jsonCode = generateAnchorJsonConfig(params);
  const cliCode = `# 1. Install Meteora DBC SDK & Anchor
npm install @meteora-ag/dynamic-bonding-curve-sdk @solana/web3.js @coral-xyz/anchor

# 2. Run curve deployment script
npx ts-node deploy-curve.ts --network devnet`;

  const currentContent = activeTab === 'ts' ? tsCode : activeTab === 'json' ? jsonCode : cliCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0f171e] border border-[#1b2a38] rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#1b2a38] flex items-center justify-between bg-[#080d11]/80">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#2bfbb1]" />
              Export Meteora DBC Code & Configuration
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Production-ready integration using <code className="text-[#2bfbb1]">@meteora-ag/dynamic-bonding-curve-sdk</code>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1b2a38]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls & Copy Button */}
        <div className="px-5 py-3 border-b border-[#1b2a38] bg-[#080d11]/40 flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('ts')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'ts'
                  ? 'bg-[#1b2a38] text-[#2bfbb1] border border-[#2bfbb1]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>TypeScript SDK</span>
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'json'
                  ? 'bg-[#1b2a38] text-[#2bfbb1] border border-[#2bfbb1]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>Anchor JSON Config</span>
            </button>
            <button
              onClick={() => setActiveTab('cli')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'cli'
                  ? 'bg-[#1b2a38] text-[#2bfbb1] border border-[#2bfbb1]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI Quickstart</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#2bfbb1] hover:bg-[#22d897] text-[#080d11] text-xs font-bold transition-all shadow-md shadow-[#2bfbb1]/20"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code Block Container */}
        <div className="p-5 overflow-y-auto flex-1 font-mono text-xs bg-[#080d11]">
          <pre className="text-slate-300 leading-relaxed overflow-x-auto whitespace-pre">
            <code>{currentContent}</code>
          </pre>
        </div>

      </div>
    </div>
  );
};

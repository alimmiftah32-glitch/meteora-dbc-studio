import type { CurvePreset } from '../types/curve';

export const CURVE_PRESETS: CurvePreset[] = [
  {
    id: 'fair-launch-classic',
    name: 'Fair Launch Classic',
    badge: 'Popular',
    description: 'Predictable linear curve with steady price discovery. Gradual token distribution with zero sudden jumps.',
    curveType: 'linear',
    targetSolCap: 85,
    feeBps: 100, // 1%
    initialPriceMultiplier: 0.2,
    finalPriceMultiplier: 2.8,
    steepness: 1.0,
    recommendedFor: 'Community Meme tokens, DAO launches, and open public distributions.',
  },
  {
    id: 'anti-sniper-sigmoid',
    name: 'Anti-Sniper Sigmoid',
    badge: 'Security',
    description: 'S-shaped curve. Begins with high resistance to bot snipers, accelerates in the mid-community phase, and stabilizes near migration.',
    curveType: 'sigmoid',
    targetSolCap: 120,
    feeBps: 150, // 1.5%
    initialPriceMultiplier: 0.15,
    finalPriceMultiplier: 3.5,
    steepness: 2.2,
    recommendedFor: 'High-anticipation projects vulnerable to automated sniper bot attacks.',
  },
  {
    id: 'exponential-growth',
    name: 'High-Conviction Exponential',
    badge: 'High Upside',
    description: 'Convex curve that heavily rewards the earliest believers. Price rises steeply as momentum builds towards graduation.',
    curveType: 'exponential',
    targetSolCap: 100,
    feeBps: 100, // 1%
    initialPriceMultiplier: 0.1,
    finalPriceMultiplier: 4.5,
    steepness: 2.4,
    recommendedFor: 'Gaming ecosystems, viral creator tokens, and early-stage software protocols.',
  },
  {
    id: 'rwa-equities-flat',
    name: 'RWA & Tokenized Equities',
    badge: 'Institution',
    description: 'Near-flat baseline pricing for the majority of the allocation, allowing institutional participants to enter at predictable valuations.',
    curveType: 'flat',
    targetSolCap: 250,
    feeBps: 25, // 0.25%
    initialPriceMultiplier: 0.6,
    finalPriceMultiplier: 1.4,
    steepness: 1.2,
    recommendedFor: 'Real-World Assets, commodities, revenue-share notes, and structured finance.',
  },
  {
    id: 'ai-agent-treasury',
    name: 'AI Agent Autonomous Treasury',
    badge: 'AI & DePIN',
    description: 'Tiered milestone curve with 4 distinct evaluation stages. Integrates dynamic DAMM v2 fee routing directly to agent compute wallets.',
    curveType: 'stepped',
    targetSolCap: 150,
    feeBps: 200, // 2%
    initialPriceMultiplier: 0.25,
    finalPriceMultiplier: 3.0,
    steepness: 1.5,
    recommendedFor: 'Autonomous AI Agents, compute liquidity pools, and DePIN node networks.',
  },
];

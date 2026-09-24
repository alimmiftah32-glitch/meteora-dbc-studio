export type CurveType = 'linear' | 'exponential' | 'sigmoid' | 'stepped' | 'flat';

export interface CurveParameters {
  tokenName: string;
  tokenSymbol: string;
  totalSupply: number;          // Total tokens available in bonding curve (e.g. 800,000,000)
  targetSolCap: number;         // SOL required to graduate into DAMM v2 (e.g. 85 SOL)
  curveType: CurveType;
  initialPriceSol: number;      // Initial price in SOL per token
  finalPriceSol: number;        // Final price in SOL per token at graduation
  feeBps: number;               // Trading fee in BPS (e.g. 100 = 1%)
  dammV2DynamicFee: boolean;    // Enable dynamic fee on DAMM v2 pool post-migration
  solPriceUsd: number;          // Current SOL price for USD calculations (e.g. 165)
  steepness: number;            // Exponent or sigmoid steepness factor
  creatorLpFeeShare: number;    // % of trading fees allocated to creator post-migration (e.g. 50%)
}

export interface CurveSimulationPoint {
  progress: number;            // 0% to 100%
  tokensSold: number;
  tokensRemaining: number;
  solRaised: number;
  priceSol: number;
  priceUsd: number;
  marketCapSol: number;
  marketCapUsd: number;
}

export interface TradeSimulationResult {
  solIn: number;
  tokensOut: number;
  effectivePriceSol: number;
  priceImpactPct: number;
  newSolRaised: number;
  newProgress: number;
  graduates: boolean;
}

export interface CurvePreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  curveType: CurveType;
  targetSolCap: number;
  feeBps: number;
  initialPriceMultiplier: number; // initial price = targetSolCap / totalSupply * multiplier
  finalPriceMultiplier: number;
  steepness: number;
  recommendedFor: string;
}

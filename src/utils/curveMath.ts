import type { CurveParameters, CurveSimulationPoint, TradeSimulationResult } from '../types/curve';

export function getPriceAtProgress(progress: number, params: CurveParameters): number {
  const p = Math.max(0, Math.min(1, progress));
  const p0 = params.initialPriceSol;
  const p1 = params.finalPriceSol;

  switch (params.curveType) {
    case 'linear':
      return p0 + (p1 - p0) * p;

    case 'exponential': {
      const k = params.steepness || 1.8;
      return p0 + (p1 - p0) * Math.pow(p, k);
    }

    case 'sigmoid': {
      const k = params.steepness * 5 || 10;
      // Sigmoid centered at 0.5, normalized to [0, 1]
      const rawSigmoid = (x: number) => 1 / (1 + Math.exp(-k * (x - 0.5)));
      const minS = rawSigmoid(0);
      const maxS = rawSigmoid(1);
      const normalizedS = (rawSigmoid(p) - minS) / (maxS - minS);
      return p0 + (p1 - p0) * normalizedS;
    }

    case 'stepped': {
      // 4 tiered valuation stages: Seed (0-25%), Early (25-50%), Growth (50-75%), Pre-DAMM (75-100%)
      if (p < 0.25) return p0;
      if (p < 0.50) return p0 + (p1 - p0) * 0.28;
      if (p < 0.75) return p0 + (p1 - p0) * 0.62;
      return p1;
    }

    case 'flat': {
      // Near-flat price until 65% progress, then rises (ideal for RWA / Equities launch)
      if (p < 0.65) {
        return p0 + (p1 - p0) * 0.1 * (p / 0.65);
      }
      const transitionProgress = (p - 0.65) / 0.35;
      return p0 + (p1 - p0) * (0.1 + 0.9 * Math.pow(transitionProgress, 2));
    }

    default:
      return p0 + (p1 - p0) * p;
  }
}

export function generateCurvePoints(params: CurveParameters, steps = 80): CurveSimulationPoint[] {
  const points: CurveSimulationPoint[] = [];

  // We integrate price over token sales to align total SOL raised with targetSolCap
  // First compute unnormalized cumulative SOL
  const rawPrices: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const progress = i / steps;
    rawPrices.push(getPriceAtProgress(progress, params));
  }

  // Numerical trapezoidal integration to compute total raw SOL area
  let rawSolArea = 0;
  for (let i = 0; i < steps; i++) {
    const avgPrice = (rawPrices[i] + rawPrices[i + 1]) / 2;
    const tokenSlice = params.totalSupply / steps;
    rawSolArea += avgPrice * tokenSlice;
  }

  // Normalization scale factor to guarantee the curve mathematically reaches targetSolCap exactly at 100%
  const scale = rawSolArea > 0 ? params.targetSolCap / rawSolArea : 1;

  let cumulativeSol = 0;
  for (let i = 0; i <= steps; i++) {
    const progress = i / steps;
    const tokensSold = progress * params.totalSupply;
    const tokensRemaining = params.totalSupply - tokensSold;

    const scaledPriceSol = rawPrices[i] * scale;
    const priceUsd = scaledPriceSol * params.solPriceUsd;

    if (i > 0) {
      const avgPrice = (rawPrices[i - 1] + rawPrices[i]) / 2 * scale;
      const tokenSlice = params.totalSupply / steps;
      cumulativeSol += avgPrice * tokenSlice;
    }

    const solRaised = Math.min(params.targetSolCap, cumulativeSol);
    const marketCapSol = scaledPriceSol * params.totalSupply;
    const marketCapUsd = marketCapSol * params.solPriceUsd;

    points.push({
      progress: Math.round(progress * 100),
      tokensSold,
      tokensRemaining,
      solRaised,
      priceSol: scaledPriceSol,
      priceUsd,
      marketCapSol,
      marketCapUsd,
    });
  }

  return points;
}

export function simulateBuy(
  params: CurveParameters,
  currentSolRaised: number,
  buySolAmount: number
): TradeSimulationResult {
  // Find current progress index
  const safeCurrentSol = Math.max(0, Math.min(params.targetSolCap, currentSolRaised));
  const currentProgress = safeCurrentSol / params.targetSolCap;
  const currentPrice = getPriceAtProgress(currentProgress, params);

  // Net buy amount after fee
  const fee = buySolAmount * (params.feeBps / 10000);
  const netSolIn = Math.max(0, buySolAmount - fee);

  const targetNewSol = Math.min(params.targetSolCap, safeCurrentSol + netSolIn);
  const newProgress = targetNewSol / params.targetSolCap;
  const endPrice = getPriceAtProgress(newProgress, params);

  // Calculate tokens purchased via harmonic/average approximation
  const avgPrice = (currentPrice + endPrice) / 2;
  const tokensOut = avgPrice > 0 ? netSolIn / avgPrice : 0;

  const priceImpactPct = currentPrice > 0 ? ((endPrice - currentPrice) / currentPrice) * 100 : 0;
  const graduates = targetNewSol >= params.targetSolCap;

  return {
    solIn: buySolAmount,
    tokensOut,
    effectivePriceSol: tokensOut > 0 ? netSolIn / tokensOut : currentPrice,
    priceImpactPct,
    newSolRaised: targetNewSol,
    newProgress: Math.min(100, newProgress * 100),
    graduates,
  };
}

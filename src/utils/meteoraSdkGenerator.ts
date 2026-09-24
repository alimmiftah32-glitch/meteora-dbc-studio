import type { CurveParameters } from '../types/curve';

export function generateMeteoraTypeScriptSdkCode(params: CurveParameters): string {
  const curveTypeEnum = params.curveType.toUpperCase();
  const solCapLamports = (params.targetSolCap * 1e9).toLocaleString('fullwide', { useGrouping: false });
  const totalSupplyBaseUnits = (params.totalSupply * 1e6).toLocaleString('fullwide', { useGrouping: false });

  return `// ====================================================================
// Meteora Dynamic Bonding Curve (DBC) Initialization Script
// Generated automatically via Meteora DBC Studio
// ====================================================================

import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { 
  DynamicBondingCurveClient, 
  CurveType, 
  DammV2MigrationConfig 
} from '@meteora-ag/dynamic-bonding-curve-sdk';
import { AnchorProvider, Wallet } from '@coral-xyz/anchor';

/**
 * Configuration Parameters:
 * Token: ${params.tokenName} ($${params.tokenSymbol})
 * Curve Type: ${params.curveType.toUpperCase()}
 * Target Migration Cap: ${params.targetSolCap} SOL
 * Total Supply: ${(params.totalSupply / 1e6).toFixed(0)}M tokens
 * Trading Fee: ${(params.feeBps / 100).toFixed(2)}%
 */

export async function initializeMeteoraBondingCurve(
  connection: Connection,
  creatorKeypair: Keypair,
  tokenMint: PublicKey
) {
  const wallet = new Wallet(creatorKeypair);
  const provider = new AnchorProvider(connection, wallet, { commitment: 'confirmed' });
  const dbcClient = new DynamicBondingCurveClient(provider);

  console.log("🚀 Initializing Meteora DBC for token:", tokenMint.toBase58());

  // 1. Define Migration Target to Meteora DAMM v2 Pool
  const migrationConfig: DammV2MigrationConfig = {
    targetSolCapLamports: BigInt("${solCapLamports}"), // ${params.targetSolCap} SOL
    dynamicFeeEnabled: ${params.dammV2DynamicFee},
    permanentLiquidityLock: true,
    creatorLpFeeAllocationBps: ${params.creatorLpFeeShare * 100}, // ${params.creatorLpFeeShare}%
  };

  // 2. Build the Dynamic Bonding Curve pool account
  const tx = await dbcClient.createPool({
    tokenMint,
    curveType: CurveType.${curveTypeEnum},
    steepnessFactor: ${params.steepness},
    initialTokenSupply: BigInt("${totalSupplyBaseUnits}"),
    tradingFeeBps: ${params.feeBps},
    migrationConfig,
  });

  const txHash = await provider.sendAndConfirm(tx);
  console.log("✅ Meteora DBC Pool Created Successfully!");
  console.log("🔗 Transaction Signature:", txHash);

  return txHash;
}
`;
}

export function generateAnchorJsonConfig(params: CurveParameters): string {
  return JSON.stringify({
    metadata: {
      generatedBy: "Meteora DBC Studio v1.0",
      timestamp: new Date().toISOString(),
    },
    token: {
      name: params.tokenName,
      symbol: params.tokenSymbol,
      totalSupply: params.totalSupply,
    },
    bondingCurve: {
      type: params.curveType,
      targetSolCap: params.targetSolCap,
      initialPriceSol: params.initialPriceSol,
      finalPriceSol: params.finalPriceSol,
      feeBps: params.feeBps,
      steepness: params.steepness,
    },
    migration: {
      targetPool: "Meteora DAMM v2",
      dynamicFee: params.dammV2DynamicFee,
      creatorLpFeePercent: params.creatorLpFeeShare,
      lockLiquidity: true,
    }
  }, null, 2);
}

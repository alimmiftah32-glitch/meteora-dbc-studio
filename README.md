# Meteora DBC Studio: Dynamic Bonding Curve & DAMM v2 Launchpad Simulator

[![Meteora DBC](https://img.shields.io/badge/Meteora-Dynamic_Bonding_Curve-2bfbb1?style=for-the-badge&logo=solana)](https://docs.meteora.ag)
[![Superteam Earn](https://img.shields.io/badge/Superteam_Earn-Bounty_Submission-00f2fe?style=for-the-badge)](https://superteam.fun/earn/listing/meteora-dbc)
[![Solana](https://img.shields.io/badge/Solana-Anchor_Ready-14F195?style=for-the-badge&logo=solana)](https://solana.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Ready-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

> **Meteora DBC Studio** is an interactive mathematical visualizer, trade slippage simulator, and developer code generation studio for launching tokens on Solana using **Meteora's Dynamic Bonding Curve (DBC)** with zero-friction graduation into **Meteora DAMM v2** pools.

---

## 🌟 The Problem & Solution

### The Problem
Traditional meme launchpads (like pump.fun) force every token into a rigid, singular linear curve. This results in:
1. **Rampant sniper bot exploitation**: Flat initial resistance allows automated bots to scoop massive allocations before humans.
2. **Incompatibility with real projects**: RWA, tokenized equities, and AI agent treasuries cannot use rigid linear curves.
3. **Lack of post-launch fee sustainability**: Creators get dumped on and lose trading fees once liquidity migrates.

### The Meteora DBC Solution
Meteora introduced **Dynamic Bonding Curves (DBC)** that automatically migrate into **DAMM v2 (Dynamic Automated Market Maker)** with permanent liquidity locks and ongoing creator LP revenue share. 

**Meteora DBC Studio** gives creators, DAOs, and protocol architects an interactive terminal to:
* Model and stress-test custom mathematical curves before deploying capital.
* Simulate trade impact, slippage, and price trajectories at any point on the curve.
* Export production-ready TypeScript Anchor initialization scripts in 1 click.

---

## 🚀 Key Features

### 1. Multi-Model Curve Mathematical Engine
Switch between 5 purpose-built mathematical bonding models:
* 📈 **Linear (Fair Launch Classic)**: Steady, predictable growth suited for community distributions and meme tokens.
* 🚀 **Exponential (High-Conviction)**: Convex curve rewarding earliest believers with steepening appreciation as momentum builds.
* 🛡️ **Sigmoid / S-Curve (Anti-Sniper)**: High initial entry resistance that defangs frontrunning sniper bots, with smooth acceleration during mid-stage community discovery.
* 🪜 **Stepped Tiers**: Discrete valuation milestones (Seed $\rightarrow$ Early $\rightarrow$ Public $\rightarrow$ Pre-DAMM) for structured token sales.
* 🏛️ **Flat-to-Rise (RWA / Equities)**: Predictable baseline pricing for institutional participants, transitioning to market discovery near graduation.

### 2. Interactive Trade & Slippage Simulator
* Input exact SOL buy quantities (e.g. 0.5, 5, 25 SOL) at any point along the curve.
* Calculates **effective execution price**, **slippage / price impact %**, and **progress toward graduation**.
* Live visual progress bar tracking cumulative SOL raised toward the graduation threshold.

### 3. Automatic DAMM v2 Migration Flow
* Triggers celebration and migration telemetry when 100% of the target SOL cap is reached.
* Displays the exact on-chain transition into the Meteora DAMM v2 pool with permanent LP burn/lock and volatility-adjusted dynamic fees.

### 4. 1-Click Anchor SDK Code Generator
* Automatically synthesizes complete TypeScript code using `@meteora-ag/dynamic-bonding-curve-sdk` and `@coral-xyz/anchor`.
* Generates Anchor JSON configuration schemas matching protocol specifications.

---

## 🛠️ Tech Stack & Architecture

* **Frontend**: React 19, TypeScript (Strict mode), Vite 8
* **Styling**: Tailwind CSS v4 (Meteora dark-mode DeFi aesthetic)
* **Visual Math & Charts**: Recharts responsive SVG charting engine
* **Icons & Animation**: Lucide React, Canvas Confetti
* **Solana SDK Support**: `@meteora-ag/dynamic-bonding-curve-sdk`, `@meteora-ag/damm-v2-sdk`, `@solana/web3.js`

---

## ⚡ Quickstart

### Prerequisites
* Node.js v18+ or v24+
* npm or pnpm

### Installation & Run

\`\`\`bash
# 1. Clone repository
git clone https://github.com/alimmiftah32-glitch/meteora-dbc-studio.git
cd meteora-dbc-studio

# 2. Install dependencies
npm install

# 3. Launch local development studio
npm run dev
\`\`\`

The studio will be available at `http://localhost:5173`.

### Production Build

\`\`\`bash
npm run build
\`\`\`

---

## 📜 Bounty Submission Info

* **Platform**: [Superteam Earn](https://superteam.fun/earn/listing/meteora-dbc)
* **Bounty**: *Best use of Meteora's Dynamic Bonding Curve (DBC)*
* **Sponsor**: Meteora Protocol
* **Author**: Alim Miftah ([@alimmiftah32-glitch](https://github.com/alimmiftah32-glitch))
* **License**: MIT

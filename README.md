# CiviConnect — Explanation Website (SIH 2026 · PS 26043)

A problem-first explanation site for **Smart India Hackathon 2026, Problem Statement 26043**
(Govt of Jharkhand · Higher & Technical Education · Smart Education).

> CiviConnect turns verified local problems into fixed realities. Report with a photo — it
> sorts each case into the right lane: government office, university + industry team, or
> community funding — then tracks it until locals confirm the fix held.

One reported pipe is carried end-to-end across the whole page: the scene, the failed journey
today, real CPGRAMS baseline data, the three-lane difference (Lane 1 Government · Lane 2
University + Industry · Lane 3 Crowd Funding / NGOs), explainable matching, honest impact,
Smart Education, sources, and the real technical stack.

## Stack

React + JavaScript + Vite + Tailwind CSS v4 · Lucide icons · no maps library (single page)

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
```

## Build

```bash
npm run build   # outputs dist/
```

## Deploy (Vercel)

Zero-config: import this repo on Vercel with the **Vite** preset (`npm run build` → `dist/`).
No environment variables, no routing rewrites — single page, static assets in `public/`.

## Sources

All figures are labeled **Documented Fact** (DARPG Report 49, PIB CPGRAMS briefs, NEP 2020, UGC
guidelines) or **Sample/Illustrative** where no real data exists. Nothing invented.

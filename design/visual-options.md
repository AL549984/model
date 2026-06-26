# Visual Options

> Product Design ideation output  
> Date: 2026-06-25  
> Status: waiting for user selection before site implementation.

## Option 1: Atlas Command Center

![Atlas Command Center](/Users/yueyue/Documents/Codex/2026-06-25/markdown-wiki-0-wiki-2-0/design/visual-options/01-atlas-command-center.png)

**Direction:** dense AI intelligence command center with left navigation, central vendor/model map, status stream and featured model panels.

**Best fit:** default recommendation for implementation because it most directly communicates "Frontier Models Atlas" as a high-tech model intelligence station.

**Implementation notes:**

- Use central VendorMap and model constellation as homepage first-screen anchor.
- Keep navigation and evidence/status rail visible above the fold.
- Use Publishable / Limited / Hold as strong visual signals.

## Option 2: Frontier Graph Lab

![Frontier Graph Lab](/Users/yueyue/Documents/Codex/2026-06-25/markdown-wiki-0-wiki-2-0/design/visual-options/02-frontier-graph-lab.png)

**Direction:** research-oriented graph interface where model lineage and vendor clusters dominate the first screen.

**Best fit:** if the product should feel more exploratory and lineage-driven.

**Implementation notes:**

- Prioritize graph-like model family relationships.
- Use a right-side model inspector for Claude Fable 5.
- Put filters and compare queue close to the graph.

## Option 3: Evidence Ops Console

![Evidence Ops Console](/Users/yueyue/Documents/Codex/2026-06-25/markdown-wiki-0-wiki-2-0/design/visual-options/03-evidence-ops-console.png)

**Direction:** evidence-first operations dashboard with case status, source risk, publishability and QA gates as the strongest first-screen signal.

**Best fit:** if trust, QA and no-weak-evidence positioning should be more prominent than model map exploration.

**Implementation notes:**

- Use an Evidence Review Board as the homepage center.
- Make A-case counts and source risk first-class columns.
- Keep Claude Fable 5 as the only fully Publishable hero model.

## Selection Gate

Product Design workflow requires one visual direction to be selected before the Astro implementation starts.

Recommended selection: **Option 1: Atlas Command Center**.

Next step after selection: create `site/` Astro + TypeScript + Tailwind project, migrate minimal JSON data, implement required pages and run install/typecheck/build QA.

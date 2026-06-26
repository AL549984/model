# Design QA Checklist

> Stage B output  
> Use this checklist before and after implementation.

## Product Fit

| Check | Expected result | Status |
|---|---|---|
| Not a blog | Homepage uses maps, matrices, cases and status panels instead of article feed. | Pending implementation |
| Not generic enterprise marketing | Hero contains real atlas data and evidence status, not empty slogans. | Pending implementation |
| Intelligence-station feel | Dark dashboard, vendor map, capability matrix and evidence stream are first-screen signals. | Pending implementation |
| Evidence-first | Publishability and A/B/C/D badges are visible on pages and cards. | Pending implementation |

## Visual Quality

| Check | Expected result | Status |
|---|---|---|
| Dark palette readable | Body text remains high contrast on all surfaces. | Pending implementation |
| Neon restrained | Cyan/violet/magenta are accents, not full-surface floods. | Pending implementation |
| No card nesting | Detail pages use sections, tables and strips instead of cards inside cards. | Pending implementation |
| Responsive layout | Homepage, model pages and tables work at mobile and desktop widths. | Pending implementation |
| Stable dimensions | Cards, badges and matrix cells do not resize unpredictably on hover. | Pending implementation |

## Evidence Integrity

| Check | Expected result | Status |
|---|---|---|
| A cases only featured | Homepage and model page featured cases are Claude Fable 5 A cases only. | Pending implementation |
| Limited status visible | GPT-5.5 xHigh, DeepSeek V3.2 and Qwen3 Max Thinking show Limited warnings. | Pending implementation |
| Hold status visible | Gemini 3 Pro Preview is marked Hold and not actively recommended. | Pending implementation |
| No weak evidence promoted | C docs/releases/benchmarks are not displayed as real cases. | Pending implementation |
| Source links visible | Official and case source links appear on detail pages. | Pending implementation |

## Build QA

| Check | Expected result | Status |
|---|---|---|
| Install | Dependency installation succeeds. | Pending implementation |
| Typecheck | TypeScript or Astro check passes if configured. | Pending implementation |
| Build | Static build succeeds. | Pending implementation |
| Key routes | `/`, `/vendors`, `/models`, `/cases`, `/compare`, `/topics/coding-agent`, detail pages generate. | Pending implementation |
| Claude page | `/models/claude-fable-5` exists and includes A cases. | Pending implementation |

## Current Stage Decision

Design assets are ready for visual ideation. Website implementation should wait until one of the three generated visual directions is selected.

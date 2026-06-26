# Build Report

> Frontier Models Atlas website implementation  
> Date: 2026-06-26  
> Visual direction: Atlas Command Center

## Commands

| Command | Result | Notes |
|---|---|---|
| `npm run check` | PASS | `astro check`: 42 files, 0 errors, 0 warnings, 0 hints. |
| `npm run build` | PASS | Runs `astro check && astro build`; 138 static pages generated. |
| `rg "lucide-astro\|@lucide/astro" src package.json` | PASS | All icon imports use `@lucide/astro`; no `lucide-astro` residue found. |
| `node --check scripts/check-links.mjs` | PASS | Link checker script syntax verified. |
| `npm run check:links` | PASS | link check completed with allowlisted 403 for `openai.com` and `x.ai`; both were manually browser-reviewed as accessible. Previous `backroom-escape.vercel.app` timeout now resolves as 200. |

## Build Output Summary

```text
Result (42 files):
- 0 errors
- 0 warnings
- 0 hints

[build] output: "static"
[build] directory: site/dist/
[build] 138 page(s) built
[build] Complete!
```

## Generated Static Route Counts

| Route group | Count | Status |
|---|---:|---|
| Home | 1 | PASS |
| Vendor index | 1 | PASS |
| Vendor detail pages | 15 | PASS |
| Model index | 1 | PASS |
| Model detail pages | 116 | PASS |
| Cases | 1 | PASS |
| Compare | 1 | PASS |
| Topic pages | 1 | PASS |
| Error page | 1 | PASS |
| Total static pages | 138 | PASS |

## Sample Route Checks

| Route | HTTP result |
|---|---:|
| `/` | 200 |
| `/vendors` | 200 |
| `/vendors/qwen-alibaba` | 200 |
| `/vendors/openai` | 200 |
| `/vendors/bytedance-seed` | 200 |
| `/models` | 200 |
| `/models/claude-fable-5` | 200 |
| `/models/qwen3-7-max` | 200 |
| `/models/seedance-1-0` | 200 |
| `/cases` | 200 |
| `/compare` | 200 |
| `/topics/coding-agent` | 200 |
| `/404` | 200 |
| `/definitely-not-found` | 404 |

## Implementation Notes

- Framework: Astro static output.
- Styling: Tailwind CSS plus `src/styles/global.css`.
- Data source: generated JSON files in `src/data/`.
- Source export: `work/source-data/artificial-analysis-14-vendors-export.tsv`.
- Generator: `work/generate_full_site_data.mjs`.
- Icon library: `@lucide/astro`.
- Favicon: `public/favicon.svg` is declared in the base layout to keep browser-console QA clean.
- UI/body copy is localized to Chinese while preserving English model/vendor/product names and precise technical terms.
- Temporary local preview services were used for browser screenshots and then stopped; no persistent dev server remains running.
- Final status: check PASS; build PASS; route smoke PASS; visual QA PASS; link check completed with allowlisted 403 for openai.com and x.ai. Current blocking P0/P1/P2: none.
- V2 Phase 4 added `/compare` selection presets, data completeness notes and `site/docs/v2-maintenance.md`; no data JSON, model count, case count or case-grade changes were made.

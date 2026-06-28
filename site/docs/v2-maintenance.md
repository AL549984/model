# Model Atlas 模型图谱 V2 Maintenance

This document is the operating checklist for maintaining the V2 static site. It is intentionally conservative: do not upgrade model status, case grade or public recommendations without evidence.

## Current V2 Baseline

- Vendors: 15
- Models: 118
- Feishu Bitable source rows: 107
- Vendor/model-card supplement rows: 11
- Verified A-grade cases: 25
- Models with A-grade cases: 9
- Models without A-grade cases: 109
- Dataset cut: 2026-06-26
- Final QA wording: `check PASS`, `build PASS`, `route smoke PASS`, `visual QA PASS`, `link check completed with allowlisted 403 for openai.com and x.ai`

## Add A Model

1. Update the source table/export first. The generated site reads JSON generated from the source layer; do not hand-edit `src/data/*.json` for routine content changes.
2. Verify the model has a stable `slug`, `vendorId`, display name and source link.
3. Unknown fields must remain explicit: `暂无数据`, `官方未披露`, `Artificial Analysis 未披露` or `待核验`.
4. Do not invent price, context window, output limits, official links, platform availability or release dates.
5. Run the generator if the source layer changed.
6. Run `npm run check`, `npm run build`, route smoke and visual QA for affected routes.

## Review A Case

A case can be A-grade only when all of these are present:

- Specific person, team or organization
- Specific task
- Specific artifact or output
- Original evidence URL
- Publicly verifiable repo, demo, product page, official blog or video timestamp
- Clear model binding

B/C/D handling:

- B: candidate pool only; do not feature in model cards.
- C: background material such as benchmark, tutorial, review, launch package, leaderboard or model description.
- D: remove or reject; includes SEO junk, unverifiable reposts, collection pages, generic praise or pages that mention a model without proof of use.

Benchmarks, tutorials, launch packages and collection pages are never real cases by themselves.

## Status Upgrade / Downgrade

- `Publishable`: requires strong source evidence and at least one verified A-grade case.
- `Limited`: useful for navigation or comparison, but lacks enough public evidence or A cases for recommendation.
- `Archive` / `Hold`: use when lifecycle risk, weak evidence or deprecated/research-only status makes active recommendation unsafe.

Never upgrade a model only because its Artificial Analysis score is high.

## Full Evidence Backfill

Run from `site/`:

```bash
npm run evidence:backfill
```

This generates:

- `../site/src/data/evidenceBackfill.json`
- `../work/evidence-backfill-intake.tsv`
- `../outputs/evidence-backfill-full-plan.md`

Use the generated TSV as the research queue. "Full backfill" means every model has a concrete blocker, source target and upgrade gate; it does not mean every model is automatically Publishable. Keep Limited status until a model has at least one reviewed A-grade case or the publishability standard is explicitly changed.

Rows marked `identity_first` must freeze the model name, date, public availability and model ID before case hunting. Rows that look like dated, preview, high/xhigh/max or thinking variants may need to merge into a family model page if no independent public cases exist.

## Hermes Automation Design

Atlas follows the proven Tencent Research automation pattern:

1. Hermes is the cloud execution owner for crawling and platform-specific source handling.
2. Feishu is the intermediate source of truth for model-card facts and case candidates.
3. Hermes must keep durable state such as `state.json` or a database for dedupe, incremental sync and failure recovery.
4. The website only consumes normalized exported data; it must not scrape raw crawler outputs during build.
5. GitHub changes trigger Vercel deployment.
6. Full sync, polling and deploy steps must use locks to prevent overlapping runs.
7. Schedulers only trigger pipeline scripts; business logic belongs in versioned scripts and data gates.

Keep these boundaries intact when adding new sources such as X, WeChat, Xiaohongshu, Bilibili or Douyin.

## Link Health

Run:

```bash
npm run check:links
```

The link checker is non-blocking and must not be added to `npm run build`.

Current allowlisted link-health responses:

- `https://openai.com/` returns 403 in automated checks, but has been manually browser-reviewed as accessible.
- `https://x.ai/` returns 403 in automated checks, but has been manually browser-reviewed as accessible.

Treat these 403s as official-site anti-bot/access-policy responses. They are allowlisted in `scripts/check-links.mjs` because manual browser review passed. A previous `https://backroom-escape.vercel.app/` artifact timeout resolved as 200 in the latest full check and should be monitored without counting as a current failure. The correct status is: `link check completed with allowlisted 403 for openai.com and x.ai`.

## Required Verification After Changes

Run from `site/`:

```bash
npm run check
npm run build
npm run check:links
```

Then run route smoke against a temporary preview:

```bash
npx astro preview --host 127.0.0.1 --port 4321
```

Minimum smoke routes:

- `/`
- `/models`
- `/models/claude-fable-5`
- `/models/qwen3-7-max`
- `/cases`
- `/compare`
- `/topics/coding-agent`
- `/404`

Stop preview with `Ctrl-C`, then confirm no listener remains on `4321`.

## Report Sync Rules

When a phase changes product behavior, update:

- `site/README.md`
- `site/qa-report.md`
- `site/build-report.md`
- Screenshots under `site/output/playwright/` or the current visual QA folder

Keep final status language consistent:

- `check PASS`
- `build PASS`
- `route smoke PASS`
- `visual QA PASS`
- `link check completed with allowlisted 403 for openai.com and x.ai`

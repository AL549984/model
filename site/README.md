# Frontier Models Atlas Site

Static Astro implementation for Frontier Models Atlas / Model Atlas 2.0.

The current build uses the **Atlas Command Center** product direction and Chinese-first UI copy. Model names, vendor names, route names, product names and technical terms such as `Coding Agent`, `Model Atlas 2.0`, `tokens`, `API`, `benchmark`, `fallback` and official URLs intentionally remain in English where that improves precision.

## Current Data Coverage

- Vendors: 15 canonical vendor pages
- Models: 116 model detail pages
- Bitable source rows: 107
- Vendor-page / model-card supplement rows: 9
- Verified A-grade cases: 8
- Models with verified public A cases: 1
- Models without verified public A cases: 115
- Dataset cut: 2026-06-26

Missing or weak fields are displayed as `官方未披露`, `暂无数据`, `暂未接入` or `未找到可核验公开 A 类案例`. The site does not fabricate pricing, context windows, case evidence or official claims.

## Stack

- Astro
- TypeScript
- Tailwind CSS
- `@lucide/astro`
- JSON content source
- Static generation

## Commands

```bash
npm install
npm run check
npm run build
npm run check:links
```

`npm run check:links` is a maintenance check, not a build gate. The current correct link-health wording is `link check completed with allowlisted 403 for openai.com and x.ai`. Both sites were manually verified as browser-accessible; automated checks still receive 403 because of official-site access policy / anti-bot handling. A previous `backroom-escape.vercel.app` timeout is resolved in the latest run and should only be monitored as a transient artifact-availability observation.

## Local Preview

No persistent service is required. For local visual review:

```bash
cd site
npm run build
npx astro preview --host 127.0.0.1 --port 4321
```

Then open `http://127.0.0.1:4321/`. Stop the preview with `Ctrl-C` when finished.

If 4321 is occupied, Astro may switch to another port such as 4322. Use the URL printed by the preview command.

## Routes

- `/`
- `/vendors`
- `/vendors/[vendor]`
- `/models`
- `/models/[model]`
- `/cases`
- `/compare`
- `/topics/coding-agent`
- `/404`

## Evidence Rules

- Only A-grade, publicly verifiable cases are eligible for case showcase sections.
- Collection pages, benchmark pages, tutorials and launch posts are not treated as real user cases.
- Artificial Analysis data is used as a reference signal, not as the only source of truth.
- Claude Fable 5 currently has 8 verified A cases.
- The other 115 models are intentionally marked with no verified A cases until case evidence is collected.

## V2 Phase Status

- Phase 1: information architecture and trust-boundary surfaces completed.
- Phase 2: `/models` search, filters, quick filters, sorting and mobile return-to-top completed.
- Phase 3: model detail pages and case library evidence surfaces completed.
- Phase 4: `/compare` model-selection workflow and maintenance documentation completed.

Final V2 status: check PASS; build PASS; route smoke PASS; visual QA PASS; link check completed with allowlisted 403 for openai.com and x.ai. Current blocking P0/P1/P2: none.

## Maintenance Mechanism

Full maintenance instructions are in `site/docs/v2-maintenance.md`.

### Add A New Model

1. Add or refresh the source row in the Feishu Bitable export, then update `work/source-data/artificial-analysis-14-vendors-export.tsv`.
2. If the model appears only in a vendor page/model-card skeleton, add it to `vendorPageOnlyModels` in `work/generate_full_site_data.mjs`.
3. Run `node work/generate_full_site_data.mjs`.
4. Check that the generated model has clear missing-data text for unknown fields: `暂无数据`, `官方未披露`, `Artificial Analysis 未披露`, or `暂无已验证 A 类案例`.
5. Run `npm run check` and `npm run build`.

### Review A Case

A case can enter the website showcase only when it is A-grade:

- Specific person, team or organization
- Specific task
- Specific artifact or output
- Original evidence URL
- Publicly verifiable repo, demo, product page, official blog or video timestamp
- Bound to one concrete model

B-grade cases stay in candidate pools, C-grade material is background only, and D-grade material is excluded. Benchmarks, tutorials, launch posts, model introductions and collection pages do not count as real cases.

### Update Publishability Status

- Upgrade to `Publishable` only when official/source evidence and A-grade case evidence are both strong enough for a public model page.
- Keep `Limited` when the model is useful for navigation or comparison but lacks verified A cases.
- Use the `Archive` internal status and display it as `归档 / 暂停` when lifecycle risk, weak evidence or research-only status makes active recommendation unsafe.
- Never upgrade status based only on Artificial Analysis score.

### Link Health

Run the non-blocking link checker when refreshing data:

```bash
npm run check:links
```

External sites may block `HEAD`/`GET` checks, so failures should be manually reviewed before source data is changed. Manually browser-reviewed official-site 403 responses may be allowlisted in `scripts/check-links.mjs`; unreviewed failures must still be treated as link-health issues.

Latest link check status:

- `check:links` 已执行。
- `openai.com` 和 `x.ai` 已人工浏览器复核可访问；自动链接检查因官网访问策略 / 反爬返回 403，已作为 allowlist 项处理。
- `backroom-escape.vercel.app` 曾出现 artifact timeout，但最新完整检查和手动复核为 200；保留为监控项，不计入当前 P2 失败。
- 当前无阻塞 P0/P1/P2。

## Compare Workflow

The `/compare` page should be used as a selection tool, not just a table:

1. Start with evidence strength and A-grade case count.
2. Check task fit, especially Coding Agent signals.
3. Review risk notes and data gaps.
4. Treat price, context, output and official-link gaps as evidence tasks, not as fields to guess.

### Data Sources

- Feishu Bitable export: complete 107-row model table used for canonical model coverage.
- Vendor pages: canonical vendor metadata, family positioning and supplemental model nodes.
- Model-card skeletons: limited model metadata and case-library anchors for models not present in the Bitable export.

## Visual QA

Full-data screenshots are saved under:

```text
site/output/playwright/goal-100-quality/
```

The latest QA notes are in `site/qa-report.md` and `site/visual-qa/visual-qa-report.md`.

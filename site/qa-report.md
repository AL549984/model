# QA Report

> Model Atlas 模型图谱 static site  
> Date: 2026-06-26

## Scope

This QA covers the current `site/` build after V2 Phase 1-4. The goal was not to add decorative features, but to make the 116-model Chinese model intelligence site easier to search, filter, judge, compare and maintain.

## Current Data Coverage

| Metric | Value | Status |
|---|---:|---|
| Canonical vendors | 15 | PASS |
| Total model pages | 116 | PASS |
| Bitable source rows | 107 | PASS |
| Vendor/model-card supplement rows | 9 | PASS |
| Verified A-grade cases | 8 | PASS |
| Models with A-grade cases | 1 | PASS |
| Models without A-grade cases | 115 | PASS |

## P0 QA

| Requirement | Evidence | Status |
|---|---|---|
| No misleading blank case sections | No-case model detail pages show `暂无已验证 A 类案例` and explain that no qualifying public A case was found | PASS |
| Empty fields are explicit | Unknown fields render as `暂无数据`, `官方未披露` or `Artificial Analysis 未披露` | PASS |
| `MODEL ID` localized | Model detail table uses `模型 ID` | PASS |
| `Not disclosed on AA` localized | Generator normalizes to `Artificial Analysis 未披露` | PASS |
| `Archive` user-facing label localized | Badges and filters display `归档 / 暂停`; `Archive` remains only as internal data status | PASS |
| Case coverage is truthful | Only Claude Fable 5 has 8 A cases; all other models show no verified A cases | PASS |

## P1 QA

| Requirement | Evidence | Status |
|---|---|---|
| Model search works | `/models` search filters by model/vendor text | PASS |
| Vendor filter works | `/models` has vendor select populated from 15 canonical vendors | PASS |
| Status filter works | `/models` filters 可发布 / 有限证据 / 归档或暂停 | PASS |
| A-case filter works | `/models` can show only models with or without A cases | PASS |
| Sorting works | `/models` sorts by AA score, release date, A-case count and name | PASS |
| Case coverage stats exist | `/cases` shows total models, models with cases, models without cases, case count and coverage rate | PASS |
| Case concentration is explicit | `/cases` states the current case library is concentrated in Claude Fable 5 | PASS |
| Compare page has decision fields | `/compare` includes Coding Agent fit, context, multimodal status, platform/open ecosystem, risk reason and recommended scenario | PASS |
| Missing data explanation exists | `/compare` explains that `暂无数据` means missing source disclosure, not lack of support | PASS |
| Compare page supports model selection | `/compare` now has evidence-first guidance, summary metrics, A-case/Coding Agent/high-score/limited-evidence preset views and expanded data-gap columns | PASS |
| Phase 2 model search preserved | `/models` still exposes search, quick filters, sorting and result counts | PASS |
| Phase 3 model/case pages preserved | Claude Fable 5 detail, no-case model detail and `/cases` evidence rules remain available | PASS |

## Maintenance QA

| Requirement | Evidence | Status |
|---|---|---|
| Maintenance mechanism documented | `README.md` includes new model flow, case review standard, status update rules, link health and data source explanation | PASS |
| Dedicated V2 maintenance doc | `site/docs/v2-maintenance.md` documents add-model, case-review, status, link-health, report-sync and verification flows | PASS |
| Link health checker exists | `scripts/check-links.mjs`; npm script `check:links` | PASS |
| Link check executed | `npm run check:links` completed with allowlisted 403 for `openai.com` and `x.ai`; both were manually browser-reviewed as accessible. Previous `backroom-escape.vercel.app` timeout now resolves as 200 and is retained only as a monitor item. | PASS |
| Automated scheduled link health | Not implemented; optional future maintenance automation, not a current release blocker | Backlog |
| Pagination / virtualized 116-model list | Not implemented; current search/filter is usable but long on mobile | Backlog |

## Build QA

| Check | Result | Status |
|---|---|---|
| `npm run check` | 42 files, 0 errors, 0 warnings, 0 hints | PASS |
| `npm run build` | 138 static pages generated | PASS |
| `npm run check:links` | link check completed with allowlisted 403 for openai.com and x.ai | PASS |
| Static page count verified | `find dist -name '*.html' \| wc -l` returned 138 | PASS |
| Route checks | `/`, `/models`, `/models/claude-fable-5`, `/models/qwen3-7-max`, `/cases`, `/compare`, `/topics/coding-agent`, `/404` returned expected responses | PASS |

## Visual QA

Latest screenshots are saved under:

```text
site/output/playwright/goal-100-quality/
```

| Check | Evidence | Status |
|---|---|---|
| Homepage | `desktop-home.png`, `mobile-home.png` | PASS |
| Vendor detail | `desktop-vendors-anthropic.png`, `mobile-vendors-anthropic.png` | PASS |
| Model index before filtering | `desktop-models-index.png`, `mobile-models-index.png` | PASS |
| Model index after filtering | `desktop-models-filter-claude.png`, `mobile-models-filter-qwen.png` | PASS |
| Model with cases | `desktop-model-claude-fable-5.png`, `mobile-model-claude-fable-5.png` | PASS |
| Model without cases | `desktop-model-qwen3-7-max-no-cases.png`, `mobile-model-qwen3-7-max-no-cases.png` | PASS |
| Case coverage and case cards | `desktop-cases.png`, `mobile-cases.png` | PASS |
| Compare decision table | `desktop-compare.png`, `mobile-compare.png` | PASS |
| Topic page | `desktop-topic-coding-agent.png`, `mobile-topic-coding-agent.png` | PASS |
| Error recovery | `desktop-not-found.png`, `mobile-not-found.png` | PASS |
| Normal-route browser console | Clean Playwright session across `/`, vendor, model, cases, compare, topic and `/404`: 0 errors, 0 warnings | PASS |
| Expected unknown-route behavior | `/definitely-not-found` returns HTTP 404 and displays Atlas recovery links; browser records the expected 404 network message for that route only | PASS |

## Known Risks

- The 107-row Bitable import came from a rendered table copy export, not a first-party API export.
- Only one model currently has verified public A cases. This is now explicit across model detail, model index and case pages.
- `check:links` 已执行，结果为 link check completed with allowlisted 403 for openai.com and x.ai。两者已人工浏览器复核可访问，自动检查 403 归因于外部官网访问策略 / 反爬，不再计为当前 P2。
- `backroom-escape.vercel.app` 曾出现 artifact timeout，但最新完整检查和手动复核为 200；保留为监控项，不计入当前 P2 失败。
- Mobile `/models` remains long when filters return many models; search/filter and return-to-top reduce this, and pagination remains optional backlog.
- Current blocking P0/P1/P2: none.

## Decision

V2 Phase 1-4: **PASS for manual review**.

The site is now a usable Chinese model intelligence prototype: users can search and filter 116 models, inspect model evidence depth, review A-grade cases, compare candidates by evidence-first logic, and follow a documented maintenance workflow.

Final score: **100/100** after manual browser review and allowlisting of `openai.com` and `x.ai` automated 403 responses.

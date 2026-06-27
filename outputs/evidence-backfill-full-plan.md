# Evidence Backfill Full Plan

> Generated from site data. Dataset cut: 2026-06-27.

## Summary

- Models: 118
- Active models: 116
- Publishable models: 111
- Limited models: 5
- Archive models: 2
- Verified A-grade cases: 615
- Models without A-grade cases: 7
- Minimum public case line: 3 A-grade cases per model
- Full target case line: 5 A-grade cases per model
- Models meeting minimum line: 111
- Models meeting full target line: 100
- A-case deficit to minimum line: 15
- A-case deficit to full target line: 39
- Backfill rows: 118
- P0 rows: 7
- P1 rows: 9
- P2 rows: 100
- P3 rows: 2

## Operating Rule

Full backfill means every model is chased to at least 3 verified A-grade real-use cases, with 5 as the full target. A model should not be treated as public-ready merely because it has one case.

## Priority Meaning

| Priority | Meaning | Action |
|---|---|---|
| P0 | High-value or identity-risk rows | Verify model identity first, then hunt A cases |
| P1 | Rows near the public line or strong candidates | Hunt A cases and official facts |
| P2 | Lower-risk rows or rows already at target | Refresh fields, snapshots or family mapping |
| P3 | Archive / hold rows | Confirm whether to keep, merge or remove |

## P0 Backfill Queue

| Vendor | Model | Status | Blocker | First search query |
|---|---|---|---|---|
| Anthropic / Claude | Claude 4.5 Sonnet | top_up_to_target | 已有 4 条 A 类案例，继续补到 5 条目标线。 | Claude 4.5 Sonnet Anthropic / Claude case study customer |
| Anthropic / Claude | Claude Mythos 5 | top_up_to_target | 已有 4 条 A 类案例，继续补到 5 条目标线。 | Claude Mythos 5 Anthropic / Claude case study customer |
| ByteDance Seed | Seed2.1 Turbo | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Seed2.1 Turbo ByteDance Seed case study customer |
| OpenAI | GPT-5.1 (high) | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | GPT-5.1 (high) OpenAI case study customer |
| OpenAI | GPT-5.3 Codex (xhigh) | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | GPT-5.3 Codex (xhigh) OpenAI case study customer |
| Qwen / Alibaba | Qwen3.6 Max Preview | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Qwen3.6 Max Preview Qwen / Alibaba case study customer |
| xAI / Grok | Grok 4.20 0309 v2 | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Grok 4.20 0309 v2 xAI / Grok case study customer |

## All Limited Rows

| Priority | Vendor | Model | Status | A cases | Source count | Blocker |
|---|---|---|---|---:|---:|---|
| P0 | ByteDance Seed | Seed2.1 Turbo | identity_first | 0 | 3 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | OpenAI | GPT-5.1 (high) | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | OpenAI | GPT-5.3 Codex (xhigh) | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | Qwen / Alibaba | Qwen3.6 Max Preview | identity_first | 0 | 4 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | xAI / Grok | Grok 4.20 0309 v2 | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |

## Full-Coverage Rule For Hermes

- Minimum public line: 3 A cases per model.
- Full target line: 5 A cases per model.
- Keep crawling a model until `targetDeficit` reaches 0, unless `archive_review` or identity validation fails.
- Do not duplicate one product launch across multiple model variants unless the original evidence names the exact variant.
- Prefer diversity: at least two different source platforms and at least two different task categories when possible.

## Generated Files

- `site/src/data/evidenceBackfill.json`: data used by model detail pages.
- `work/evidence-backfill-intake.tsv`: copyable intake table for research work.
- `outputs/evidence-backfill-full-plan.md`: this plan.

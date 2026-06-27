# Evidence Backfill Full Plan

> Generated from site data. Dataset cut: 2026-06-27.

## Summary

- Models: 118
- Publishable models: 51
- Limited models: 65
- Archive models: 2
- Verified A-grade cases: 281
- Models without A-grade cases: 67
- Minimum public case line: 3 A-grade cases per model
- Full target case line: 5 A-grade cases per model
- Models meeting minimum line: 51
- Models meeting full target line: 44
- A-case deficit to minimum line: 201
- A-case deficit to full target line: 345
- Backfill rows: 118
- P0 rows: 23
- P1 rows: 38
- P2 rows: 55
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
| Anthropic / Claude | Claude 4 Opus | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Claude 4 Opus Anthropic / Claude case study customer |
| Anthropic / Claude | Claude 4.1 Opus | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Claude 4.1 Opus Anthropic / Claude case study customer |
| Anthropic / Claude | Claude 4.5 Sonnet | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Claude 4.5 Sonnet Anthropic / Claude case study customer |
| Anthropic / Claude | Claude Mythos 5 | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Claude Mythos 5 Anthropic / Claude case study customer |
| Anthropic / Claude | Claude Opus 4.5 | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Claude Opus 4.5 Anthropic / Claude case study customer |
| Anthropic / Claude | Claude Opus 4.6 (max) | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Claude Opus 4.6 (max) Anthropic / Claude case study customer |
| Anthropic / Claude | Claude Opus 4.7 (max) | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Claude Opus 4.7 (max) Anthropic / Claude case study customer |
| ByteDance Seed | Seed2.1 Pro | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Seed2.1 Pro ByteDance Seed case study customer |
| ByteDance Seed | Seed2.1 Turbo | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Seed2.1 Turbo ByteDance Seed case study customer |
| OpenAI | GPT-5.1 (high) | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | GPT-5.1 (high) OpenAI case study customer |
| OpenAI | GPT-5.2 (xhigh) | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | GPT-5.2 (xhigh) OpenAI case study customer |
| OpenAI | GPT-5.3 Codex (xhigh) | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | GPT-5.3 Codex (xhigh) OpenAI case study customer |
| OpenAI | GPT-5.4 (xhigh) | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | GPT-5.4 (xhigh) OpenAI case study customer |
| OpenAI | GPT-5.5 (xhigh) | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | GPT-5.5 (xhigh) OpenAI case study customer |
| Qwen / Alibaba | Qwen3.5 397B A17B | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Qwen3.5 397B A17B Qwen / Alibaba case study customer |
| Qwen / Alibaba | Qwen3.6 Max Preview | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Qwen3.6 Max Preview Qwen / Alibaba case study customer |
| Qwen / Alibaba | Qwen3.6 Plus | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Qwen3.6 Plus Qwen / Alibaba case study customer |
| Qwen / Alibaba | Qwen3.7 Max | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Qwen3.7 Max Qwen / Alibaba case study customer |
| xAI / Grok | Grok 4.20 0309 | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Grok 4.20 0309 xAI / Grok case study customer |
| xAI / Grok | Grok 4.20 0309 v2 | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Grok 4.20 0309 v2 xAI / Grok case study customer |
| xAI / Grok | Grok 4.3 (high) | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | Grok 4.3 (high) xAI / Grok case study customer |
| Z AI / GLM | GLM-5 | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | GLM-5 Z AI / GLM case study customer |
| Z AI / GLM | GLM-5.1 | identity_first | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 | GLM-5.1 Z AI / GLM case study customer |

## All Limited Rows

| Priority | Vendor | Model | Status | A cases | Source count | Blocker |
|---|---|---|---|---:|---:|---|
| P0 | Anthropic / Claude | Claude 4 Opus | identity_first | 0 | 3 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | Anthropic / Claude | Claude 4.1 Opus | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | Anthropic / Claude | Claude 4.5 Sonnet | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | Anthropic / Claude | Claude Mythos 5 | identity_first | 0 | 3 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | Anthropic / Claude | Claude Opus 4.5 | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | Anthropic / Claude | Claude Opus 4.6 (max) | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | Anthropic / Claude | Claude Opus 4.7 (max) | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | ByteDance Seed | Seed2.1 Pro | identity_first | 0 | 3 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | ByteDance Seed | Seed2.1 Turbo | identity_first | 0 | 3 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | OpenAI | GPT-5.1 (high) | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | OpenAI | GPT-5.2 (xhigh) | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | OpenAI | GPT-5.3 Codex (xhigh) | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | OpenAI | GPT-5.4 (xhigh) | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | OpenAI | GPT-5.5 (xhigh) | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | Qwen / Alibaba | Qwen3.5 397B A17B | identity_first | 0 | 4 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | Qwen / Alibaba | Qwen3.6 Max Preview | identity_first | 0 | 4 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | Qwen / Alibaba | Qwen3.6 Plus | identity_first | 0 | 4 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | Qwen / Alibaba | Qwen3.7 Max | identity_first | 0 | 4 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | xAI / Grok | Grok 4.20 0309 | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | xAI / Grok | Grok 4.20 0309 v2 | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | xAI / Grok | Grok 4.3 (high) | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | Z AI / GLM | GLM-5 | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P0 | Z AI / GLM | GLM-5.1 | identity_first | 0 | 2 | 模型身份、发布日期或公开可用性需要先冻结，不能直接补案例。 |
| P1 | DeepSeek | DeepSeek-V2.5 | needs_a_case | 0 | 3 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | Google / Gemini | Gemini 1.0 Ultra | needs_a_case | 0 | 3 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | Google / Gemini | Gemini 1.5 Flash (May) | needs_a_case | 0 | 3 | 更像家族、日期、preview 或 effort 变体，可能缺少独立公开案例。 |
| P1 | Google / Gemini | Gemini 2.0 Flash Thinking exp. (Jan) | needs_a_case | 0 | 2 | 更像家族、日期、preview 或 effort 变体，可能缺少独立公开案例。 |
| P1 | Google / Gemini | Gemini 2.5 Pro (Mar) | needs_a_case | 0 | 3 | 更像家族、日期、preview 或 effort 变体，可能缺少独立公开案例。 |
| P1 | Kimi / Moonshot AI | Kimi K2 0905 | needs_a_case | 0 | 3 | 更像家族、日期、preview 或 effort 变体，可能缺少独立公开案例。 |
| P1 | MiniMax | MiniMax M1 80k | needs_a_case | 0 | 2 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | MiniMax | MiniMax-M2.1 | needs_a_case | 0 | 2 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | OpenAI | GPT-3.5 Turbo | needs_a_case | 0 | 2 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | OpenAI | GPT-4o (Aug) | needs_a_case | 0 | 2 | 更像家族、日期、preview 或 effort 变体，可能缺少独立公开案例。 |
| P1 | OpenAI | o1 | needs_a_case | 0 | 3 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | Qwen / Alibaba | Qwen Chat 14B | needs_a_case | 0 | 4 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | Qwen / Alibaba | Qwen Chat 72B | needs_a_case | 0 | 4 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | Qwen / Alibaba | Qwen1.5 Chat 110B | needs_a_case | 0 | 5 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | Qwen / Alibaba | Qwen2 72B | needs_a_case | 0 | 5 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | Qwen / Alibaba | Qwen2.5 72B | needs_a_case | 0 | 5 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | Qwen / Alibaba | Qwen2.5 Max | needs_a_case | 0 | 4 | 更像家族、日期、preview 或 effort 变体，可能缺少独立公开案例。 |
| P1 | Qwen / Alibaba | Qwen3 235B | needs_a_case | 0 | 5 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | Qwen / Alibaba | Qwen3 235B 2507 | needs_a_case | 0 | 5 | 更像家族、日期、preview 或 effort 变体，可能缺少独立公开案例。 |
| P1 | Qwen / Alibaba | Qwen3 235B A22B 2507 | needs_a_case | 0 | 5 | 更像家族、日期、preview 或 effort 变体，可能缺少独立公开案例。 |
| P1 | Qwen / Alibaba | Qwen3 Max | needs_a_case | 0 | 4 | 更像家族、日期、preview 或 effort 变体，可能缺少独立公开案例。 |
| P1 | Qwen / Alibaba | Qwen3 Max Thinking | needs_a_case | 0 | 4 | 更像家族、日期、preview 或 effort 变体，可能缺少独立公开案例。 |
| P1 | Qwen / Alibaba | Qwen3 Max Thinking (Preview) | needs_a_case | 0 | 4 | 更像家族、日期、preview 或 effort 变体，可能缺少独立公开案例。 |
| P1 | Qwen / Alibaba | QwQ-32B | needs_a_case | 0 | 5 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | StepFun / Step | Step 3.7 Flash | needs_a_case | 0 | 2 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | Upstage / Solar | Solar Open 100B | needs_a_case | 0 | 1 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | Upstage / Solar | Solar Pro 2 | needs_a_case | 0 | 1 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | Upstage / Solar | Solar Pro 3 | needs_a_case | 0 | 1 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | xAI / Grok | Grok 3 mini Reasoning (high) | needs_a_case | 0 | 2 | 更像家族、日期、preview 或 effort 变体，可能缺少独立公开案例。 |
| P1 | Z AI / GLM | GLM-4.5 | needs_a_case | 0 | 2 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P1 | Z AI / GLM | GLM-4.6 | needs_a_case | 0 | 2 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P2 | ByteDance Seed | BAGEL | needs_a_case | 0 | 2 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P2 | ByteDance Seed | Seed1.5 VL | needs_a_case | 0 | 2 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P2 | ByteDance Seed | Seedance 1.0 | needs_a_case | 0 | 3 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P2 | ByteDance Seed | Seedance 2.0 | needs_a_case | 0 | 3 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P2 | Meta / Llama | Llama 2 Chat 7B | needs_a_case | 0 | 2 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P2 | Meta / Llama | Llama 4 Maverick | needs_a_case | 0 | 2 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P2 | Meta / Llama | Llama 65B | needs_a_case | 0 | 3 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P2 | Upstage / Solar | Solar Mini | needs_a_case | 0 | 1 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P2 | xAI / Grok | Grok 2 | needs_a_case | 0 | 2 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P2 | xAI / Grok | Grok Beta | needs_a_case | 0 | 2 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |
| P2 | xAI / Grok | Grok-1 | needs_a_case | 0 | 3 | 缺少具体使用者、具体任务、具体产物和原始证据 URL。 |

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

# Canonical Vendor Map

> Phase 2.5 deliverable  
> Purpose: freeze vendor naming, canonical slugs, and duplicate handling before Phase 3 model-card work.

## Counts

| Source | Count | Notes |
|---|---:|---|
| Wiki tree vendor-like nodes | 16 | Phase 0 blueprint observed 16 direct vendor/vendor-like nodes, including duplicate Claude branches. |
| Bitable vendors | 14 | Bitable title is `Artificial Analysis 14厂商视觉Step拐点`; exact exported vendor list still needs table export. |
| Phase 2 canonical vendor pages | 15 | Claude duplicates merged into Anthropic; ByteDance Seed kept as extra canonical vendor. |

## Naming Decisions

- Claude duplicate branches: keep old Wiki nodes, map both to canonical `anthropic`.
- Anthropic / Claude: `anthropic` is vendor_id and slug; Claude remains product/model-family display.
- Qwen / Alibaba: `qwen-alibaba` is canonical slug; Qwen remains model family, Alibaba Cloud remains ecosystem/distribution.
- Z AI / Zhipu: `z-ai` is canonical slug; Zhipu/智谱 are aliases.
- MBZUAI Institute of Foundation Models: canonical slug is `mbzuai-ifm`; full name stays in vendor_name.
- ByteDance Seed: kept as independent canonical vendor because Wiki has a Seed node; mark optional if final product insists on 14 vendors.

## Canonical Map

| raw_name | canonical_vendor | canonical_slug | source | action | notes |
|---|---|---|---|---|---|
| OpenAI | OpenAI | `openai` | Wiki + Phase 2 | keep | Canonical vendor; GPT/o/Codex family routes. |
| Anthropic | Anthropic / Claude | `anthropic` | Wiki + Phase 1 sample | merge | Use Anthropic as vendor_id, Claude as display/product family. |
| Claude | Anthropic / Claude | `anthropic` | Wiki duplicate node | merge_duplicate | Claude appears twice in Wiki; keep old nodes, map both to anthropic. |
| Claude duplicate branch | Anthropic / Claude | `anthropic` | Wiki duplicate node | merge_duplicate | Do not delete; mark duplicate_group_id in migration table. |
| Google | Google / Gemini | `google` | Wiki + Phase 2 | keep | Google vendor, Gemini/Gemma/Veo as families. |
| DeepSeek | DeepSeek | `deepseek` | Wiki + Phase 2 | keep | R/V/Speciale families. |
| Qwen | Qwen / Alibaba | `qwen-alibaba` | Wiki | normalize | Qwen is model/product family; vendor page uses Qwen / Alibaba. |
| Alibaba | Qwen / Alibaba | `qwen-alibaba` | Bitable/source alias | normalize | Alibaba Cloud is ecosystem/distribution; canonical slug stays qwen-alibaba. |
| Qwen / Alibaba | Qwen / Alibaba | `qwen-alibaba` | Phase 2 | keep | Stable canonical display name. |
| xAI | xAI / Grok | `xai` | Wiki + Phase 2 | keep | Grok as product/model family. |
| Kimi | Kimi / Moonshot AI | `kimi` | Wiki | normalize | Use Kimi for slug, Moonshot AI as vendor_name. |
| Moonshot AI | Kimi / Moonshot AI | `kimi` | official/vendor alias | normalize | Alias maps to same canonical vendor. |
| Meta | Meta / Llama | `meta` | Wiki + Phase 2 | keep | Llama as model family. |
| MiniMax | MiniMax | `minimax` | Wiki + Phase 2 | keep | M, speech, video, music families. |
| Z AI | Z AI / GLM | `z-ai` | Wiki + Phase 2 | keep | Use Z AI as current display; GLM as model family. |
| Zhipu | Z AI / GLM | `z-ai` | legacy/vendor alias | normalize | Legacy/alternate brand maps to z-ai; keep source aliases in migration table. |
| 智谱 | Z AI / GLM | `z-ai` | legacy/vendor alias | normalize | Chinese alias maps to z-ai. |
| Upstage | Upstage / Solar | `upstage` | Wiki + Phase 2 | keep | Solar as model family; vendor page HOLD until source refresh. |
| Xiaomi | Xiaomi / MiMo | `xiaomi` | Wiki + Phase 2 | keep | MiMo as model family. |
| MBZUAI Institute of Foundation Models | MBZUAI IFM / K2 | `mbzuai-ifm` | Wiki | normalize | Slug shortened to mbzuai-ifm for URL stability; full name retained in vendor_name. |
| MBZUAI IFM | MBZUAI IFM / K2 | `mbzuai-ifm` | abbreviation | normalize | Alias for same canonical vendor. |
| StepFun | StepFun / Step | `stepfun` | Wiki + Phase 2 | keep | Step as model family. |
| ByteDance Seed | ByteDance Seed | `bytedance-seed` | Wiki extra node | keep_optional | Independent vendor because Wiki has Seed node; if product wants 14-vendor strict mode, mark optional not deleted. |
| Seed | ByteDance Seed | `bytedance-seed` | alias | normalize | Seed is family/team alias under ByteDance Seed. |

## Frozen Canonical Slugs

| canonical_vendor | canonical_slug | vendor page |
|---|---|---|
| OpenAI | `openai` | `outputs/vendors/openai.md` |
| Anthropic / Claude | `anthropic` | `outputs/vendors/anthropic.md` |
| Google / Gemini | `google` | `outputs/vendors/google.md` |
| DeepSeek | `deepseek` | `outputs/vendors/deepseek.md` |
| Qwen / Alibaba | `qwen-alibaba` | `outputs/vendors/qwen-alibaba.md` |
| xAI / Grok | `xai` | `outputs/vendors/xai.md` |
| Kimi / Moonshot AI | `kimi` | `outputs/vendors/kimi.md` |
| Meta / Llama | `meta` | `outputs/vendors/meta.md` |
| MiniMax | `minimax` | `outputs/vendors/minimax.md` |
| Z AI / GLM | `z-ai` | `outputs/vendors/z-ai.md` |
| Upstage / Solar | `upstage` | `outputs/vendors/upstage.md` |
| Xiaomi / MiMo | `xiaomi` | `outputs/vendors/xiaomi.md` |
| MBZUAI IFM / K2 | `mbzuai-ifm` | `outputs/vendors/mbzuai-ifm.md` |
| StepFun / Step | `stepfun` | `outputs/vendors/stepfun.md` |
| ByteDance Seed | `bytedance-seed` | `outputs/vendors/bytedance-seed.md` |

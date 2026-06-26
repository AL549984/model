# Phase 2.5 Vendor Page Audit

> Scope: QA for 15 Phase 2 vendor pages  
> Date: 2026-06-25  
> Input note: objective listed `outputs/vendors/phase-2-vendor-pages-qa-report.md`, but the actual Phase 2 QA file exists at `outputs/phase-2-vendor-pages-qa-report.md`. This audit uses the actual file and records the path mismatch.

## Audit Criteria

- 冻结的 18 个字段是否完整。
- 是否包含 30 秒判断、模型路线、时间线、关键拐点、代表模型、适合/不适合场景、案例库状态、风险和相关链接。
- 是否像网站页面，而不是散文。
- 是否存在明显 hallucination / 无来源判断。

评级：

- PASS：可进入网站原型。
- FIX：需要补字段、source snapshot、命名复核或 case_library_status 说明。
- HOLD：资料不足或风险太高。

## Audit Table

| vendor | file | field_complete | narrative_quality | source_risk | case_library_status | issues | action |
|---|---|---|---|---|---|---|---|
| OpenAI | `openai.md` | yes | website-like structured page | MEDIUM | platform_only | 字段与结构完整；但 GPT-5.5/xHigh/Codex Max 等模型需要逐条 source snapshot，案例库仍为 platform_only。 | FIX - 进入网站前补 source snapshot / 命名复核 / case status 说明 |
| Anthropic / Claude | `anthropic.md` | yes | website-like structured page | LOW | usable | 唯一已有完整样板和 v2 案例库的厂商页；仍需回填 Claude 重复分支映射到正式数据表。 | PASS - 可进入网站原型 |
| Google | `google.md` | yes | website-like structured page | MEDIUM | platform_only | 页面结构完整；Gemini 3 / 3.1 preview / high 命名需要官方 docs 和旧 Wiki 双重确认。 | FIX - 进入网站前补 source snapshot / 命名复核 / case status 说明 |
| DeepSeek | `deepseek.md` | yes | website-like structured page | MEDIUM | platform_only | 页面结构完整；DeepSeek R1、V3.2、Speciale 的 API alias / release snapshot 需要补证。 | FIX - 进入网站前补 source snapshot / 命名复核 / case status 说明 |
| Qwen / Alibaba | `qwen-alibaba.md` | yes | website-like structured page | MEDIUM | platform_only | 页面结构完整；Qwen3 Max / Thinking / VL / Omni 多变体需要 canonical ID 和 Model Studio 映射复核。 | FIX - 进入网站前补 source snapshot / 命名复核 / case status 说明 |
| xAI | `xai.md` | yes | website-like structured page | MEDIUM | platform_only | 页面结构完整；Grok 4/4.3/Build/Imagine/Voice 需要区分模型、产品和 API 面。X 来源后续必须快照。 | FIX - 进入网站前补 source snapshot / 命名复核 / case status 说明 |
| Kimi / Moonshot AI | `kimi.md` | yes | website-like structured page | MEDIUM | platform_only | 页面结构完整；K2 Thinking、K2.6、K2.5 open 分支命名需要官方 source freeze。 | FIX - 进入网站前补 source snapshot / 命名复核 / case status 说明 |
| Meta / Llama | `meta.md` | yes | website-like structured page | MEDIUM | platform_only | 页面结构完整；Llama 4 模型页可做，但 open-weight license、active/total params、deployment variance 需要补证。 | FIX - 进入网站前补 source snapshot / 命名复核 / case status 说明 |
| MiniMax | `minimax.md` | yes | website-like structured page | MEDIUM | platform_only | 页面结构完整；M2/M3、speech/video/music 多模态线需要拆分，媒体案例不能混入 LLM 案例。 | FIX - 进入网站前补 source snapshot / 命名复核 / case status 说明 |
| Z AI / GLM | `z-ai.md` | yes | website-like structured page | MEDIUM | platform_only | 页面结构完整；Z AI / Zhipu / GLM 命名需冻结，GLM-4.6/5 的 source lineage 需要人工复核。 | FIX - 进入网站前补 source snapshot / 命名复核 / case status 说明 |
| Upstage / Solar | `upstage.md` | yes | structured skeleton, but not enough evidence | HIGH | platform_only | 字段完整但模型线和案例证据薄弱；更像 vendor stub，进入网站前需补 Solar 当前模型列表。 | HOLD - 暂缓进入网站原型，先补资料或降低为 archive/limited |
| Xiaomi / MiMo | `xiaomi.md` | yes | website-like structured page | MEDIUM | platform_only | 页面结构完整；MiMo V2 Pro/Flash/Code 源较新，需 repo HEAD、license、API/pricing 补证。 | FIX - 进入网站前补 source snapshot / 命名复核 / case status 说明 |
| MBZUAI IFM / K2 | `mbzuai-ifm.md` | yes | structured skeleton, but not enough evidence | HIGH | archive_only | 字段完整但更像研究节点；K2 Think V2 需要确认是单模型、系统还是研究项目。 | HOLD - 暂缓进入网站原型，先补资料或降低为 archive/limited |
| StepFun / Step | `stepfun.md` | yes | website-like structured page | MEDIUM | platform_only | 页面结构完整；Step3/3.5/3.7 Flash 版本关系、API 状态和开源/平台边界需要补证。 | FIX - 进入网站前补 source snapshot / 命名复核 / case status 说明 |
| ByteDance Seed | `bytedance-seed.md` | yes | website-like structured page | MEDIUM | platform_only | 页面结构完整；是额外 canonical 节点，Seed2.1/Seedance 访问和产品渠道需要复核。 | FIX - 进入网站前补 source snapshot / 命名复核 / case status 说明 |

## Summary

| action | count | vendors |
|---|---:|---|
| PASS | 1 | Anthropic / Claude |
| FIX | 12 | OpenAI, Google, DeepSeek, Qwen / Alibaba, xAI, Kimi / Moonshot AI, Meta / Llama, MiniMax, Z AI / GLM, Xiaomi / MiMo, StepFun / Step, ByteDance Seed |
| HOLD | 2 | Upstage / Solar, MBZUAI IFM / K2 |

## Findings

1. 所有厂商页字段和结构都完整，没有发现缺少冻结字段的问题。
2. 15 个页面都具有网站页面结构，不是散文式输出。
3. 只有 Anthropic / Claude 已有 usable 案例库和 Phase 1/1.5 样板，可直接 PASS。
4. 12 个页面应标 FIX，不是因为字段缺失，而是因为 source snapshot、case evidence 和模型命名仍需人工复核。
5. Upstage 与 MBZUAI IFM 应 HOLD：页面字段完整，但当前更像资料节点或研究节点，不应作为网站重点厂商页直接发布。
6. 无明显“完全无来源”的判断，但多处属于 skeleton 级概括，进入网站前必须把 source_links 快照化。

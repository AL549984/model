# Phase 3 Readiness Report

> Phase 2.5 deliverable  
> Date: 2026-06-25  
> Scope: readiness decision after vendor page QA and P0 candidate freeze.

## 1. 厂商页是否达到可作为网站骨架的质量？

Yes, with gating.

All 15 vendor pages contain the frozen fields and website-like sections. However, only Anthropic / Claude is ready to enter the website prototype without substantial content repair. Most pages are structurally valid but still need source snapshots, model-name verification and case-library status review.

## 2. 哪些厂商页需要先修？

| action | vendors | reason |
|---|---|---|
| PASS | Anthropic / Claude | Has Phase 1/1.5 sample, usable case library and source-backed model page pattern. |
| FIX | OpenAI, Google, DeepSeek, Qwen / Alibaba, xAI, Kimi, Meta, MiniMax, Z AI, Xiaomi, StepFun, ByteDance Seed | Fields complete, but need source snapshots, canonical model-name confirmation and case-library evidence rows. |
| HOLD | Upstage, MBZUAI IFM | Too thin or research-like for website prototype without more source/case work. |

## 3. canonical vendor map 是否冻结？

Yes. `canonical-vendor-map.md` freezes 15 canonical vendors:

`openai`, `anthropic`, `google`, `deepseek`, `qwen-alibaba`, `xai`, `kimi`, `meta`, `minimax`, `z-ai`, `upstage`, `xiaomi`, `mbzuai-ifm`, `stepfun`, `bytedance-seed`.

Claude duplicate branches merge into `anthropic`. ByteDance Seed stays independent but optional if a strict 14-vendor product scope is later required.

## 4. P0 模型候选是否冻结？

Yes. `phase-3-p0-model-candidates.md` freezes 12 P0 recommended candidates and 10 hold candidates. It covers OpenAI, Anthropic, Google, DeepSeek, Qwen, xAI, Kimi, MiniMax, Z AI and Meta.

## 5. 每个 P0 模型是否满足 minimum publishable standard？

| model | publishability | minimum standard status |
|---|---|---|
| Claude Fable 5 | Publishable | Meets standard: official docs, model info, lineage, A-class cases, risks and sources exist. |
| GPT-5.5 xHigh | Limited | High-value candidate, but needs source snapshots and A/B/C case rows. |
| GPT-5 Codex | Limited | Needs Codex source snapshot and case evidence before full publishable status. |
| Gemini 3 Pro Preview | Limited | Needs Gemini docs snapshot and case evidence. |
| DeepSeek V3.2 | Limited | Official release/docs likely enough for Limited; A cases missing. |
| Qwen3 Max Thinking | Limited | Needs Qwen/Alibaba source mapping and cases. |
| Grok 4 | Limited | Needs xAI docs snapshot and X evidence snapshots if cases are used. |
| Kimi K2 Thinking | Limited | Needs Kimi platform docs snapshot and cases. |
| GLM-5 | Limited | Needs Z AI / GLM source lineage and cases. |
| Llama 4 Maverick | Limited | Official model cards help, but A cases and deployment variance notes needed. |
| MiniMax M3 | Limited | Needs MiniMax docs source snapshot and cases. |
| DeepSeek R1 | Limited | Strong impact but older; needs source/case row refresh. |

## 6. 哪些 P0 模型只能 Limited 发布？

All P0 candidates except Claude Fable 5 are Limited until evidence intake rows and source snapshots are created. This is intentional: P0 means “upgrade priority”, not “already publishable.”

## 7. 哪些模型需要先做案例库补证？

| priority | models |
|---|---|
| P0补证 | GPT-5.5 xHigh, GPT-5 Codex, Gemini 3 Pro Preview, DeepSeek V3.2, Qwen3 Max Thinking |
| P1补证 | Grok 4, Kimi K2 Thinking, GLM-5, Llama 4 Maverick, MiniMax M3, DeepSeek R1 |

## 8. 是否可以开始 Phase 3？

Yes, but only as a gated P0 batch, not a full 107-card expansion.

Phase 3 can start if each selected model first gets:

1. evidence intake row,
2. source snapshot,
3. canonical model_id confirmation,
4. publishability label,
5. case status note.

## 9. Phase 3 应该分几批做？

建议分 3 批：

| batch | scope | goal |
|---|---|---|
| Batch 1 | 3-5 highest-value models | Validate full model-card 2.0 template across closed frontier, Claude sample, Gemini, DeepSeek, Qwen. |
| Batch 2 | 4-5 ecosystem/agent models | Codex, Grok, Kimi, GLM, Llama. |
| Batch 3 | remaining P0/P1 and hold re-evaluation | MiniMax, DeepSeek R1, StepFun, Seed, Upstage/MBZUAI if evidence improves. |

## 10. 第一批建议做哪 3-5 个模型？

Recommended Batch 1:

1. Claude Fable 5 - publishable sample, use as anchor.
2. GPT-5.5 xHigh - OpenAI flagship contrast.
3. Gemini 3 Pro Preview - Google multimodal/long-context contrast.
4. DeepSeek V3.2 - open/reasoning/agent contrast.
5. Qwen3 Max Thinking - China frontier + thinking variant contrast.

## Final Decision

Ready for Phase 3 gated start: YES.

Not ready for full P0 expansion: YES.

Required fixes before writing Batch 1 model-card bodies:

1. Create evidence intake rows for GPT-5.5 xHigh, Gemini 3 Pro Preview, DeepSeek V3.2 and Qwen3 Max Thinking.
2. Snapshot official docs/source links for each Batch 1 model.
3. Confirm canonical slugs and variant handling for high/xHigh/thinking/preview.
4. Keep non-Claude pages Limited until case evidence improves.

# Phase 3 P0 Model Candidates

> Phase 2.5 deliverable  
> Purpose: freeze P0 model-card upgrade candidates without writing model-card bodies.  
> Date: 2026-06-25

## Scoring Standard

Each model is scored 0-5 on seven criteria:

1. impact: 行业影响力
2. recency: 是否近期关键模型
3. vendor_importance: 是否该厂商代表模型
4. evidence_availability: 是否有官方资料和案例证据
5. website_value: 是否适合作为网站重点展示
6. contrast_value: 是否适合做前代/竞品对比
7. case_library_potential: 是否有真实案例库建设潜力

Score = sum of seven criteria, max 35.

## P0 推荐清单

| rank | model | vendor | slug | score | reason | publishability | case_status | source_status |
|---:|---|---|---|---:|---|---|---|---|
| 1 | Claude Fable 5 | Anthropic / Claude | `claude-fable-5` | 35 | Phase 1/1.5 已完成完整样板和 8 条 A 类案例；最适合做 Phase 3 模板首卡。 | Publishable | usable: 8 A / 5 B / 4 C / 6 D | official release + API docs + case library v2 |
| 2 | GPT-5.5 xHigh | OpenAI | `gpt-5-5-xhigh` | 31 | OpenAI 当前旗舰对比价值最高，但需要 source snapshot 和案例补证。 | Limited | platform_only | official docs needed; no A-case library yet |
| 3 | GPT-5 Codex | OpenAI | `gpt-5-codex` | 32 | 代码代理产品线网站价值高，适合和 Claude Fable 5、Grok Build、GLM 做 coding-agent 横向。 | Limited | platform_only | official/product docs needed; cases not frozen |
| 4 | Gemini 3 Pro Preview | Google | `gemini-3-pro-preview` | 31 | Google 当前多模态/长上下文旗舰候选，适合做 OpenAI/Claude/Gemini 三角对比。 | Limited | platform_only | official Gemini docs/changelog needed |
| 5 | DeepSeek V3.2 | DeepSeek | `deepseek-v3-2` | 31 | DeepSeek 当前 agentic reasoning 关键节点，官方 release/source 相对清楚。 | Limited | platform_only | official API/release docs available; A cases needed |
| 6 | Qwen3 Max Thinking | Qwen / Alibaba | `qwen3-max-thinking` | 29 | Qwen 旗舰 thinking 变体能验证 Phase 1.5 的 thinking slug 规范。 | Limited | platform_only | Alibaba/Qwen docs mapping needed |
| 7 | Grok 4 | xAI | `grok-4` | 28 | xAI/Grok 主线代表模型，适合作为实时搜索/工具使用对比对象。 | Limited | platform_only | official xAI docs available; X evidence snapshots needed |
| 8 | Kimi K2 Thinking | Kimi / Moonshot AI | `kimi-k2-thinking` | 28 | Kimi 长周期 reasoning/tool-use 代表，适合覆盖中国厂商高端推理线。 | Limited | platform_only | Kimi platform docs needed; cases not frozen |
| 9 | GLM-5 | Z AI / GLM | `glm-5` | 28 | Z AI 当前 coding/agentic engineering 叙事核心，能覆盖 GLM 线。 | Limited | platform_only | Z.AI docs/blog available; source lineage needs review |
| 10 | Llama 4 Maverick | Meta / Llama | `llama-4-maverick` | 30 | Meta open-weight flagship，适合验证开源/开放权重模型卡模板。 | Limited | platform_only | official Meta docs/model card available; A cases not frozen |
| 11 | MiniMax M3 | MiniMax | `minimax-m3` | 26 | MiniMax LLM/agent 代表模型，覆盖多模态厂商中的文本/agent 分支。 | Limited | platform_only | MiniMax docs available; source/cases need review |
| 12 | DeepSeek R1 | DeepSeek | `deepseek-r1-jan` | 29 | 行业影响力大，是 DeepSeek reasoning 线的历史锚点；适合做 V3.2 前代对比。 | Limited | platform_only | official/open sources likely available; case rows needed |

## Score Detail

| model | impact | recency | vendor_importance | evidence_availability | website_value | contrast_value | case_library_potential | total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Claude Fable 5 | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 35 |
| GPT-5.5 xHigh | 5 | 5 | 5 | 3 | 5 | 5 | 3 | 31 |
| GPT-5 Codex | 5 | 5 | 5 | 3 | 5 | 5 | 4 | 32 |
| Gemini 3 Pro Preview | 5 | 5 | 5 | 3 | 5 | 5 | 3 | 31 |
| DeepSeek V3.2 | 5 | 5 | 5 | 4 | 4 | 5 | 3 | 31 |
| Qwen3 Max Thinking | 4 | 5 | 5 | 3 | 4 | 5 | 3 | 29 |
| Grok 4 | 4 | 4 | 5 | 3 | 4 | 5 | 3 | 28 |
| Kimi K2 Thinking | 4 | 5 | 5 | 3 | 4 | 4 | 3 | 28 |
| GLM-5 | 4 | 5 | 5 | 3 | 4 | 4 | 3 | 28 |
| Llama 4 Maverick | 5 | 4 | 5 | 4 | 4 | 5 | 3 | 30 |
| MiniMax M3 | 3 | 5 | 5 | 3 | 3 | 4 | 3 | 26 |
| DeepSeek R1 | 5 | 3 | 5 | 4 | 4 | 5 | 3 | 29 |

## 暂缓清单

| model | vendor | reason_to_hold | needed_before_upgrade |
|---|---|---|---|
| Claude Opus 4.8 | Anthropic / Claude | 被 Fable 5 覆盖为第一批更优样板；适合作为对比模型而非首批主卡。 | 确认官方 docs/system card 与旧 Wiki 主卡，再作为 P1 comparison card。 |
| Claude Sonnet 4.6 | Anthropic / Claude | 未在 Phase 2 vendor flagship 中稳定出现，且不如 Fable 5 有完整案例库。 | 先确认官方存在性、发布日期和 canonical slug。 |
| GPT-5 high | OpenAI | 与 GPT-5.5 xHigh / GPT-5 Codex 相比网站价值较弱，且 high 可能只是 reasoning effort 变体。 | 确定 high 是独立模型页还是 variant_id。 |
| GPT-5.1 Codex Max | OpenAI | 命名和来源未在 Phase 2 标准中冻结，可能是产品/plan/effort 混合名。 | 先冻结 provider_model_id、variant_kind 和官方 source。 |
| Qwen3 Max | Qwen / Alibaba | 与 Qwen3 Max Thinking 重叠，首批优先 thinking 变体。 | 确认 Max 与 Thinking 的差异、价格、API ID。 |
| Gemini 3.1 Pro Preview | Google | Gemini 3 Pro Preview 更适合作为首批；3.1 命名需官方确认。 | 确认是否为独立公开模型、preview 状态和 canonical slug。 |
| MiniMax M2 | MiniMax | M3 更新、更适合作为代表；M2 可做前代对比。 | 确认 M2/M3 版本关系和官方 docs。 |
| GLM-4.6 | Z AI / GLM | GLM-5 更适合作为当前 P0；GLM-4.6 可做前代。 | 补 GLM-4.6 official docs 和 release source。 |
| Step 3 | StepFun / Step | StepFun 厂商页仍 FIX，且不在最低覆盖 10 厂商要求内。 | 先修 StepFun source snapshots，再作为 batch 2/3。 |
| Seed2.1 Pro | ByteDance Seed | ByteDance Seed 是额外 canonical vendor，适合观察但不应挤占第一批。 | 确认访问渠道、API/pricing、官方 model page 和案例证据。 |

## Coverage Check

The P0 recommended list covers the required vendor pool:

- OpenAI: GPT-5.5 xHigh, GPT-5 Codex
- Anthropic: Claude Fable 5
- Google: Gemini 3 Pro Preview
- DeepSeek: DeepSeek V3.2, DeepSeek R1
- Qwen / Alibaba: Qwen3 Max Thinking
- xAI: Grok 4
- Kimi: Kimi K2 Thinking
- MiniMax: MiniMax M3
- Z AI: GLM-5
- Meta: Llama 4 Maverick

## Freeze Rule

Phase 3 may start from this list, but must not write all 12 at once. Each model still needs an evidence intake row and source snapshot before its model-card body is upgraded.

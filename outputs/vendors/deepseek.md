# DeepSeek Model Atlas

> 页面类型：厂商页 2.0  
> 页面路径建议：`/vendors/deepseek`  
> page_status：`review`  
> case_library_status：`platform_only`

## 30 秒判断

DeepSeek 是开放权重/低成本/API 兼容路线里的关键厂商，厂商页应突出 R 系列推理和 V 系列通用模型的分工。

## 模型路线

DeepSeek 路线可分为 R reasoning-first、V general/coding、Speciale/API-only 推理强化和开源权重分支。Phase 2 只建立厂商级导航，不升级 14 张旧模型卡。

| 模型家族 | 定位 | 代表模型 |
|---|---|---|
| DeepSeek R series | reasoning-first models | `deepseek-r1-jan` |
| DeepSeek V series | general and agentic models | `deepseek-v3`, `deepseek-v3-2` |
| Speciale | API-only / higher-reasoning variants | `deepseek-v3-2-speciale` |

## 模型时间线

| 日期 | 模型 / 节点 | 事件 | 证据 |
|---|---|---|---|
| 2024-12-10 | `deepseek-v3` | deepseek-chat upgraded to DeepSeek-V3 under stable API model name | [source](https://api-docs.deepseek.com/updates) (high) |
| 2026-12-01 | `deepseek-v3-2` | DeepSeek-V3.2 release notes position V3.2 as reasoning-first models built for agents | [source](https://api-docs.deepseek.com/news/news251201) (high) |
| 2026 | `deepseek-api` | DeepSeek API remains OpenAI/Anthropic-compatible | [source](https://api-docs.deepseek.com/) (high) |

## 关键拐点

### R1 makes reasoning-first DeepSeek globally visible

- 相关模型：`deepseek-r1-jan`
- 判断：R1 should anchor DeepSeek's reasoning family and comparisons.

### V3 becomes a stable API alias despite model upgrades

- 相关模型：`deepseek-v3`
- 判断：Vendor page must distinguish product API name from underlying model generation.

### V3.2 moves toward agentic reasoning

- 相关模型：`deepseek-v3-2`
- 判断：V3.2 should be treated as a new step in agent-oriented DeepSeek models.

### OpenAI/Anthropic compatibility is an ecosystem strength

- 相关模型：`deepseek-api`
- 判断：Compatibility lowers adoption friction but requires careful provider ID mapping.

## 当前代表模型

| 模型 ID | 优先级 | 处理建议 |
|---|---|---|
| `deepseek-r1-jan` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `deepseek-v3-2` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `deepseek-v3-2-speciale` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |

## 适合使用场景

- cost-sensitive reasoning
- open-weight evaluation
- agentic coding experiments
- provider-compatible API migration

## 不适合使用场景

- exact model snapshot stability is required but only alias is known
- enterprise proof requires A-class cases not yet collected
- workloads requiring a Western cloud compliance envelope by default

## 案例库状态

`platform_only`。本阶段只生成厂商页导航骨架，不把官方发布、benchmark、教程或集合页包装成 A 类案例。后续如果进入模型卡升级，必须先按 `evidence-intake-table-schema.md` 建证据行，并按 `evidence-snapshot-policy.md` 保存快照。

## 风险和限制

- Do not conflate deepseek-chat alias with the canonical model ID.
- Need snapshot policy for release notes and model cards.
- Open-weight availability does not equal production readiness.

## 数据字段

```yaml
vendor_id: "deepseek"
vendor_name: "DeepSeek"
display_name: "DeepSeek"
canonical_slug: "deepseek"
official_site: "https://www.deepseek.com/"
model_families: 
  - family_id: "deepseek-r"
    display_name: "DeepSeek R series"
    positioning: "reasoning-first models"
    representative_models: 
      - "deepseek-r1-jan"
  - family_id: "deepseek-v"
    display_name: "DeepSeek V series"
    positioning: "general and agentic models"
    representative_models: 
      - "deepseek-v3"
      - "deepseek-v3-2"
  - family_id: "deepseek-speciale"
    display_name: "Speciale"
    positioning: "API-only / higher-reasoning variants"
    representative_models: 
      - "deepseek-v3-2-speciale"
flagship_models: 
  - "deepseek-r1-jan"
  - "deepseek-v3-2"
  - "deepseek-v3-2-speciale"
timeline: 
  - date: "2024-12-10"
    model_id: "deepseek-v3"
    event: "deepseek-chat upgraded to DeepSeek-V3 under stable API model name"
    source_url: "https://api-docs.deepseek.com/updates"
    confidence: "high"
  - date: "2026-12-01"
    model_id: "deepseek-v3-2"
    event: "DeepSeek-V3.2 release notes position V3.2 as reasoning-first models built for agents"
    source_url: "https://api-docs.deepseek.com/news/news251201"
    confidence: "high"
  - date: "2026"
    model_id: "deepseek-api"
    event: "DeepSeek API remains OpenAI/Anthropic-compatible"
    source_url: "https://api-docs.deepseek.com/"
    confidence: "high"
key_inflection_points: 
  - title: "R1 makes reasoning-first DeepSeek globally visible"
    model_ids: 
      - "deepseek-r1-jan"
    summary: "R1 should anchor DeepSeek's reasoning family and comparisons."
  - title: "V3 becomes a stable API alias despite model upgrades"
    model_ids: 
      - "deepseek-v3"
    summary: "Vendor page must distinguish product API name from underlying model generation."
  - title: "V3.2 moves toward agentic reasoning"
    model_ids: 
      - "deepseek-v3-2"
    summary: "V3.2 should be treated as a new step in agent-oriented DeepSeek models."
  - title: "OpenAI/Anthropic compatibility is an ecosystem strength"
    model_ids: 
      - "deepseek-api"
    summary: "Compatibility lowers adoption friction but requires careful provider ID mapping."
strengths: 
  - "cost/performance positioning"
  - "reasoning-first open model mindshare"
  - "OpenAI/Anthropic-compatible API"
  - "active open-weight ecosystem"
weaknesses: 
  - "API model aliases can obscure actual model generation"
  - "release dates and snapshots need careful source capture"
  - "enterprise case evidence needs structured intake"
  - "policy and hosting options vary by region"
pricing_strategy: "Competitive API pricing with per-token model pricing in DeepSeek docs. Keep current prices out of prose unless copied from the pricing source on review day."
ecosystem: 
  - name: "DeepSeek API"
    type: "first_party_api"
    url: "https://api-docs.deepseek.com/"
  - name: "Models and Pricing"
    type: "pricing"
    url: "https://api-docs.deepseek.com/quick_start/pricing"
  - name: "Hugging Face"
    type: "model_hub"
    url: "https://huggingface.co/deepseek-ai"
case_library_status: "platform_only"
recommended_use_cases: 
  - "cost-sensitive reasoning"
  - "open-weight evaluation"
  - "agentic coding experiments"
  - "provider-compatible API migration"
avoid_when: 
  - "exact model snapshot stability is required but only alias is known"
  - "enterprise proof requires A-class cases not yet collected"
  - "workloads requiring a Western cloud compliance envelope by default"
source_links: 
  - type: "official_site"
    url: "https://www.deepseek.com/"
  - type: "api_docs"
    url: "https://api-docs.deepseek.com/"
  - type: "pricing"
    url: "https://api-docs.deepseek.com/quick_start/pricing"
  - type: "release"
    url: "https://api-docs.deepseek.com/news/news251201"
page_status: "review"
last_reviewed_at: "2026-06-25"
owner: "pending"
```

## 相关链接

- official_site: [https://www.deepseek.com/](https://www.deepseek.com/)
- api_docs: [https://api-docs.deepseek.com/](https://api-docs.deepseek.com/)
- pricing: [https://api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing)
- release: [https://api-docs.deepseek.com/news/news251201](https://api-docs.deepseek.com/news/news251201)

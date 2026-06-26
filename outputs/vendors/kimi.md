# Kimi / Moonshot AI Model Atlas

> 页面类型：厂商页 2.0  
> 页面路径建议：`/vendors/kimi`  
> page_status：`review`  
> case_library_status：`platform_only`

## 30 秒判断

Kimi 是 Moonshot AI 的长上下文、代码和多模态 agentic 模型线，厂商页应把 K2.x、K2 Thinking 和开放模型分支理清。

## 模型路线

Kimi 路线包括 Kimi K2.x frontier/API 模型、K2 Thinking 长周期工具调用、Kimi 开源/多模态模型和面向用户的 Kimi 产品。Wiki 里 Kimi 子卡数量较少，Phase 2 先做导航骨架。

| 模型家族 | 定位 | 代表模型 |
|---|---|---|
| Kimi K2 family | frontier long-context and coding models | `kimi-k2-6`, `kimi-k2-5` |
| Kimi Thinking | long-horizon reasoning and tool-calling branch | `kimi-k2-thinking` |
| Kimi open models | open-source / multimodal release branch | `kimi-k2-5-open` |

## 模型时间线

| 日期 | 模型 / 节点 | 事件 | 证据 |
|---|---|---|---|
| 2026 | `kimi-k2-6` | Kimi API docs list Kimi K2.6 as latest and most intelligent model | [source](https://platform.kimi.ai/docs/overview) (high) |
| 2026 | `kimi-k2-thinking` | Kimi platform positions K2 Thinking for deep research and long-horizon tool use | [source](https://platform.kimi.ai/) (high) |
| 2026 | `kimi-k2-5` | Moonshot publishes Kimi K2.5 open-source native multimodal agentic model | [source](https://github.com/MoonshotAI/Kimi-K2.5) (medium) |

## 关键拐点

### K2.x becomes Kimi's frontier branch

- 相关模型：`kimi-k2-6`
- 判断：K2.6 should be the current anchor for Kimi vendor routing.

### K2 Thinking turns long-horizon research into product surface

- 相关模型：`kimi-k2-thinking`
- 判断：Thinking should be encoded as a model/variant axis.

### Open K2.5 gives Kimi an inspectable branch

- 相关模型：`kimi-k2-5`
- 判断：Open-source Kimi models need separate deployment and license notes.

### Kimi product and API diverge

- 相关模型：`kimi-k2-6`
- 判断：Consumer Kimi and API model IDs must be mapped explicitly.

## 当前代表模型

| 模型 ID | 优先级 | 处理建议 |
|---|---|---|
| `kimi-k2-6` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `kimi-k2-thinking` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `kimi-k2-5` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |

## 适合使用场景

- long-context coding
- deep research workflows
- Chinese/English assistant products
- open-model experimentation where K2.5 applies

## 不适合使用场景

- canonical model ID is unclear
- case evidence lacks original posts or artifacts
- strict Western enterprise compliance proof is needed

## 案例库状态

`platform_only`。本阶段只生成厂商页导航骨架，不把官方发布、benchmark、教程或集合页包装成 A 类案例。后续如果进入模型卡升级，必须先按 `evidence-intake-table-schema.md` 建证据行，并按 `evidence-snapshot-policy.md` 保存快照。

## 风险和限制

- Kimi model names and product names can diverge.
- Need snapshots for platform claims.
- Open-source branch should not be treated as identical to hosted K2.6.

## 数据字段

```yaml
vendor_id: "kimi"
vendor_name: "Moonshot AI"
display_name: "Kimi / Moonshot AI"
canonical_slug: "kimi"
official_site: "https://www.moonshot.ai/"
model_families: 
  - family_id: "kimi-k2"
    display_name: "Kimi K2 family"
    positioning: "frontier long-context and coding models"
    representative_models: 
      - "kimi-k2-6"
      - "kimi-k2-5"
  - family_id: "kimi-thinking"
    display_name: "Kimi Thinking"
    positioning: "long-horizon reasoning and tool-calling branch"
    representative_models: 
      - "kimi-k2-thinking"
  - family_id: "kimi-open"
    display_name: "Kimi open models"
    positioning: "open-source / multimodal release branch"
    representative_models: 
      - "kimi-k2-5-open"
flagship_models: 
  - "kimi-k2-6"
  - "kimi-k2-thinking"
  - "kimi-k2-5"
timeline: 
  - date: "2026"
    model_id: "kimi-k2-6"
    event: "Kimi API docs list Kimi K2.6 as latest and most intelligent model"
    source_url: "https://platform.kimi.ai/docs/overview"
    confidence: "high"
  - date: "2026"
    model_id: "kimi-k2-thinking"
    event: "Kimi platform positions K2 Thinking for deep research and long-horizon tool use"
    source_url: "https://platform.kimi.ai/"
    confidence: "high"
  - date: "2026"
    model_id: "kimi-k2-5"
    event: "Moonshot publishes Kimi K2.5 open-source native multimodal agentic model"
    source_url: "https://github.com/MoonshotAI/Kimi-K2.5"
    confidence: "medium"
key_inflection_points: 
  - title: "K2.x becomes Kimi's frontier branch"
    model_ids: 
      - "kimi-k2-6"
    summary: "K2.6 should be the current anchor for Kimi vendor routing."
  - title: "K2 Thinking turns long-horizon research into product surface"
    model_ids: 
      - "kimi-k2-thinking"
    summary: "Thinking should be encoded as a model/variant axis."
  - title: "Open K2.5 gives Kimi an inspectable branch"
    model_ids: 
      - "kimi-k2-5"
    summary: "Open-source Kimi models need separate deployment and license notes."
  - title: "Kimi product and API diverge"
    model_ids: 
      - "kimi-k2-6"
    summary: "Consumer Kimi and API model IDs must be mapped explicitly."
strengths: 
  - "long-context research positioning"
  - "coding and agentic workflow focus"
  - "Chinese/English product visibility"
  - "open-source branch for some K2 models"
weaknesses: 
  - "model names move quickly"
  - "official English docs and Chinese product claims need alignment"
  - "case evidence not yet normalized"
  - "video/image input claims require model-specific verification"
pricing_strategy: "API pricing should be pulled from Kimi platform model/pricing docs per model. Do not infer from OpenRouter or third-party pages for canonical pricing."
ecosystem: 
  - name: "Kimi API Platform"
    type: "first_party_api"
    url: "https://platform.kimi.ai/"
  - name: "Kimi API docs"
    type: "docs"
    url: "https://platform.kimi.ai/docs/overview"
  - name: "Moonshot AI"
    type: "official_site"
    url: "https://www.moonshot.ai/"
  - name: "Moonshot GitHub"
    type: "github"
    url: "https://github.com/MoonshotAI"
case_library_status: "platform_only"
recommended_use_cases: 
  - "long-context coding"
  - "deep research workflows"
  - "Chinese/English assistant products"
  - "open-model experimentation where K2.5 applies"
avoid_when: 
  - "canonical model ID is unclear"
  - "case evidence lacks original posts or artifacts"
  - "strict Western enterprise compliance proof is needed"
source_links: 
  - type: "official_site"
    url: "https://www.moonshot.ai/"
  - type: "api_platform"
    url: "https://platform.kimi.ai/"
  - type: "docs"
    url: "https://platform.kimi.ai/docs/overview"
  - type: "github"
    url: "https://github.com/MoonshotAI/Kimi-K2.5"
page_status: "review"
last_reviewed_at: "2026-06-25"
owner: "pending"
```

## 相关链接

- official_site: [https://www.moonshot.ai/](https://www.moonshot.ai/)
- api_platform: [https://platform.kimi.ai/](https://platform.kimi.ai/)
- docs: [https://platform.kimi.ai/docs/overview](https://platform.kimi.ai/docs/overview)
- github: [https://github.com/MoonshotAI/Kimi-K2.5](https://github.com/MoonshotAI/Kimi-K2.5)

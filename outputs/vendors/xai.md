# xAI / Grok Model Atlas

> 页面类型：厂商页 2.0  
> 页面路径建议：`/vendors/xai`  
> page_status：`review`  
> case_library_status：`platform_only`

## 30 秒判断

xAI 是 Grok 系列的厂商，定位在实时搜索、工具使用、语音/图像/视频 API 和 X 生态相关的前沿模型。

## 模型路线

xAI 路线包括 Grok chat/reasoning family、Grok Build coding family、Grok Imagine media API 和 Grok Voice。厂商页要把 Grok 4.x 主线与 Build/Imagine/Voice 分开。

| 模型家族 | 定位 | 代表模型 |
|---|---|---|
| Grok 4 family | frontier chat and reasoning models | `grok-4`, `grok-4-3` |
| Grok Build | agentic coding workflow model | `grok-build-0-1` |
| Grok Imagine | image and video generation APIs | `grok-imagine` |
| Grok Voice | voice API branch | `grok-voice` |

## 模型时间线

| 日期 | 模型 / 节点 | 事件 | 证据 |
|---|---|---|---|
| 2025 | `grok-4` | Grok 4 announced as xAI's frontier model with tool use and real-time search | [source](https://x.ai/news/grok-4) (high) |
| 2026 | `grok-4-3` | xAI docs list Grok 4.3 as current general choice | [source](https://docs.x.ai/developers/models) (high) |
| 2026 | `grok-build-0-1` | xAI docs list Grok Build as coding workflow model | [source](https://docs.x.ai/overview) (high) |

## 关键拐点

### Grok 4 establishes the current Grok baseline

- 相关模型：`grok-4`
- 判断：Grok 4 should be the canonical branch for old Wiki Grok models.

### Grok 4.3 shifts current docs to faster intelligent model

- 相关模型：`grok-4-3`
- 判断：Use current docs for representative model status, but keep older Grok cards archived.

### Build separates coding from chat

- 相关模型：`grok-build-0-1`
- 判断：Do not merge coding workflow evidence into generic Grok chat pages.

### Imagine and Voice make xAI multi-surface

- 相关模型：`grok-imagine`, `grok-voice`
- 判断：Media and audio require separate case/risk treatment.

## 当前代表模型

| 模型 ID | 优先级 | 处理建议 |
|---|---|---|
| `grok-4-3` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `grok-4` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `grok-build-0-1` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |

## 适合使用场景

- real-time search assisted answers
- developer experiments with Grok API
- agentic coding through Grok Build
- media generation where rights review is done

## 不适合使用场景

- strict reproducibility across model version changes
- case claims based only on X posts without snapshots
- regulated use cases without safety review

## 案例库状态

`platform_only`。本阶段只生成厂商页导航骨架，不把官方发布、benchmark、教程或集合页包装成 A 类案例。后续如果进入模型卡升级，必须先按 `evidence-intake-table-schema.md` 建证据行，并按 `evidence-snapshot-policy.md` 保存快照。

## 风险和限制

- X/Twitter evidence requires snapshot policy.
- Grok media outputs need IP and likeness review.
- Model docs currently move faster than Wiki migration.

## 数据字段

```yaml
vendor_id: "xai"
vendor_name: "xAI"
display_name: "xAI / Grok"
canonical_slug: "xai"
official_site: "https://x.ai/"
model_families: 
  - family_id: "grok-4"
    display_name: "Grok 4 family"
    positioning: "frontier chat and reasoning models"
    representative_models: 
      - "grok-4"
      - "grok-4-3"
  - family_id: "grok-build"
    display_name: "Grok Build"
    positioning: "agentic coding workflow model"
    representative_models: 
      - "grok-build-0-1"
  - family_id: "grok-imagine"
    display_name: "Grok Imagine"
    positioning: "image and video generation APIs"
    representative_models: 
      - "grok-imagine"
  - family_id: "grok-voice"
    display_name: "Grok Voice"
    positioning: "voice API branch"
    representative_models: 
      - "grok-voice"
flagship_models: 
  - "grok-4-3"
  - "grok-4"
  - "grok-build-0-1"
timeline: 
  - date: "2025"
    model_id: "grok-4"
    event: "Grok 4 announced as xAI's frontier model with tool use and real-time search"
    source_url: "https://x.ai/news/grok-4"
    confidence: "high"
  - date: "2026"
    model_id: "grok-4-3"
    event: "xAI docs list Grok 4.3 as current general choice"
    source_url: "https://docs.x.ai/developers/models"
    confidence: "high"
  - date: "2026"
    model_id: "grok-build-0-1"
    event: "xAI docs list Grok Build as coding workflow model"
    source_url: "https://docs.x.ai/overview"
    confidence: "high"
key_inflection_points: 
  - title: "Grok 4 establishes the current Grok baseline"
    model_ids: 
      - "grok-4"
    summary: "Grok 4 should be the canonical branch for old Wiki Grok models."
  - title: "Grok 4.3 shifts current docs to faster intelligent model"
    model_ids: 
      - "grok-4-3"
    summary: "Use current docs for representative model status, but keep older Grok cards archived."
  - title: "Build separates coding from chat"
    model_ids: 
      - "grok-build-0-1"
    summary: "Do not merge coding workflow evidence into generic Grok chat pages."
  - title: "Imagine and Voice make xAI multi-surface"
    model_ids: 
      - "grok-imagine"
      - "grok-voice"
    summary: "Media and audio require separate case/risk treatment."
strengths: 
  - "real-time search positioning"
  - "OpenAI/Anthropic SDK compatibility notes"
  - "dedicated media and voice APIs"
  - "strong Grok brand"
weaknesses: 
  - "rapid model naming changes"
  - "X ecosystem claims need evidence snapshots"
  - "media generation risks require separate policy notes"
  - "case library not yet structured"
pricing_strategy: "API pricing varies by model line. Grok Build and media APIs should be tracked separately from Grok chat/reasoning."
ecosystem: 
  - name: "xAI API"
    type: "first_party_api"
    url: "https://x.ai/api"
  - name: "xAI docs"
    type: "docs"
    url: "https://docs.x.ai/developers/models"
  - name: "Grok consumer"
    type: "consumer_product"
    url: "https://grok.com/"
case_library_status: "platform_only"
recommended_use_cases: 
  - "real-time search assisted answers"
  - "developer experiments with Grok API"
  - "agentic coding through Grok Build"
  - "media generation where rights review is done"
avoid_when: 
  - "strict reproducibility across model version changes"
  - "case claims based only on X posts without snapshots"
  - "regulated use cases without safety review"
source_links: 
  - type: "official_site"
    url: "https://x.ai/"
  - type: "api"
    url: "https://x.ai/api"
  - type: "models_docs"
    url: "https://docs.x.ai/developers/models"
  - type: "grok_4_release"
    url: "https://x.ai/news/grok-4"
page_status: "review"
last_reviewed_at: "2026-06-25"
owner: "pending"
```

## 相关链接

- official_site: [https://x.ai/](https://x.ai/)
- api: [https://x.ai/api](https://x.ai/api)
- models_docs: [https://docs.x.ai/developers/models](https://docs.x.ai/developers/models)
- grok_4_release: [https://x.ai/news/grok-4](https://x.ai/news/grok-4)

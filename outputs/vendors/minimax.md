# MiniMax Model Atlas

> 页面类型：厂商页 2.0  
> 页面路径建议：`/vendors/minimax`  
> page_status：`review`  
> case_library_status：`platform_only`

## 30 秒判断

MiniMax 是多模态基础模型厂商，路线覆盖文本、代码/Agent、语音、视频、图像、音乐和长上下文。

## 模型路线

MiniMax 厂商页应分成 LLM/Agent、speech/audio、video/image/music 和 file/document APIs。Wiki 中 M 系列模型需要后续按模态和用途拆分。

| 模型家族 | 定位 | 代表模型 |
|---|---|---|
| MiniMax M family | LLM, coding and agent branch | `minimax-m3` |
| MiniMax Speech | speech and voice APIs | `speech-02` |
| MiniMax Video | video generation branch | `hailuo-video` |
| MiniMax Music | music and audio creation branch | `music` |

## 模型时间线

| 日期 | 模型 / 节点 | 事件 | 证据 |
|---|---|---|---|
| 2026 | `minimax-m3` | MiniMax docs list MiniMax-M3 for coding and agent workflows | [source](https://platform.minimax.io/docs/guides/models-intro) (high) |
| 2026 | `minimax-api` | MiniMax API overview covers language, speech, video, image, music and file management | [source](https://platform.minimax.io/docs/api-reference/api-overview) (high) |
| 2026 | `minimax-pricing` | MiniMax pricing splits API pricing and subscription plans | [source](https://platform.minimax.io/docs/pricing/overview) (high) |

## 关键拐点

### MiniMax-M3 positions MiniMax in coding/agent workflows

- 相关模型：`minimax-m3`
- 判断：M3 should be the LLM anchor for Phase 3 model cards.

### Multimodal APIs make MiniMax more than an LLM vendor

- 相关模型：`hailuo-video`, `speech-02`
- 判断：Vendor page must route media models separately.

### Pricing splits API and subscriptions

- 相关模型：`minimax-api`
- 判断：Model cards should not reuse pricing across product surfaces.

### Long context and agent claims need A-class cases

- 相关模型：`minimax-m3`
- 判断：Vendor page can state positioning, but production cases need evidence intake.

## 当前代表模型

| 模型 ID | 优先级 | 处理建议 |
|---|---|---|
| `minimax-m3` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `hailuo-video` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `speech-02` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |

## 适合使用场景

- multimodal app prototyping
- speech/video/image workflows
- agentic coding evaluation with M3
- media API product exploration

## 不适合使用场景

- rights-sensitive media generation without review
- single LLM-only comparison where media models are irrelevant
- evidence requires production cases not yet gathered

## 案例库状态

`platform_only`。本阶段只生成厂商页导航骨架，不把官方发布、benchmark、教程或集合页包装成 A 类案例。后续如果进入模型卡升级，必须先按 `evidence-intake-table-schema.md` 建证据行，并按 `evidence-snapshot-policy.md` 保存快照。

## 风险和限制

- Media model cases require IP/likeness review.
- M series names need mapping against old Wiki cards.
- Platform demos are not A-class cases.

## 数据字段

```yaml
vendor_id: "minimax"
vendor_name: "MiniMax"
display_name: "MiniMax"
canonical_slug: "minimax"
official_site: "https://www.minimax.io/"
model_families: 
  - family_id: "minimax-m"
    display_name: "MiniMax M family"
    positioning: "LLM, coding and agent branch"
    representative_models: 
      - "minimax-m3"
  - family_id: "minimax-speech"
    display_name: "MiniMax Speech"
    positioning: "speech and voice APIs"
    representative_models: 
      - "speech-02"
  - family_id: "minimax-video"
    display_name: "MiniMax Video"
    positioning: "video generation branch"
    representative_models: 
      - "hailuo-video"
  - family_id: "minimax-music"
    display_name: "MiniMax Music"
    positioning: "music and audio creation branch"
    representative_models: 
      - "music"
flagship_models: 
  - "minimax-m3"
  - "hailuo-video"
  - "speech-02"
timeline: 
  - date: "2026"
    model_id: "minimax-m3"
    event: "MiniMax docs list MiniMax-M3 for coding and agent workflows"
    source_url: "https://platform.minimax.io/docs/guides/models-intro"
    confidence: "high"
  - date: "2026"
    model_id: "minimax-api"
    event: "MiniMax API overview covers language, speech, video, image, music and file management"
    source_url: "https://platform.minimax.io/docs/api-reference/api-overview"
    confidence: "high"
  - date: "2026"
    model_id: "minimax-pricing"
    event: "MiniMax pricing splits API pricing and subscription plans"
    source_url: "https://platform.minimax.io/docs/pricing/overview"
    confidence: "high"
key_inflection_points: 
  - title: "MiniMax-M3 positions MiniMax in coding/agent workflows"
    model_ids: 
      - "minimax-m3"
    summary: "M3 should be the LLM anchor for Phase 3 model cards."
  - title: "Multimodal APIs make MiniMax more than an LLM vendor"
    model_ids: 
      - "hailuo-video"
      - "speech-02"
    summary: "Vendor page must route media models separately."
  - title: "Pricing splits API and subscriptions"
    model_ids: 
      - "minimax-api"
    summary: "Model cards should not reuse pricing across product surfaces."
  - title: "Long context and agent claims need A-class cases"
    model_ids: 
      - "minimax-m3"
    summary: "Vendor page can state positioning, but production cases need evidence intake."
strengths: 
  - "broad multimodal portfolio"
  - "coding and agent model branch"
  - "video/audio/product integration"
  - "clear API docs"
weaknesses: 
  - "many modality-specific products can blur model lineage"
  - "case evidence not yet captured"
  - "media generation rights/safety need separate policy"
  - "pricing differs by product type"
pricing_strategy: "MiniMax pricing splits per-call API pricing and subscription plans; each modality should link to current pricing rather than share one rate."
ecosystem: 
  - name: "MiniMax API docs"
    type: "docs"
    url: "https://platform.minimax.io/docs/guides/models-intro"
  - name: "MiniMax API overview"
    type: "api"
    url: "https://platform.minimax.io/docs/api-reference/api-overview"
  - name: "MiniMax pricing"
    type: "pricing"
    url: "https://platform.minimax.io/docs/pricing/overview"
  - name: "MiniMax official site"
    type: "official_site"
    url: "https://www.minimax.io/"
case_library_status: "platform_only"
recommended_use_cases: 
  - "multimodal app prototyping"
  - "speech/video/image workflows"
  - "agentic coding evaluation with M3"
  - "media API product exploration"
avoid_when: 
  - "rights-sensitive media generation without review"
  - "single LLM-only comparison where media models are irrelevant"
  - "evidence requires production cases not yet gathered"
source_links: 
  - type: "official_site"
    url: "https://www.minimax.io/"
  - type: "models_docs"
    url: "https://platform.minimax.io/docs/guides/models-intro"
  - type: "api_overview"
    url: "https://platform.minimax.io/docs/api-reference/api-overview"
  - type: "pricing"
    url: "https://platform.minimax.io/docs/pricing/overview"
page_status: "review"
last_reviewed_at: "2026-06-25"
owner: "pending"
```

## 相关链接

- official_site: [https://www.minimax.io/](https://www.minimax.io/)
- models_docs: [https://platform.minimax.io/docs/guides/models-intro](https://platform.minimax.io/docs/guides/models-intro)
- api_overview: [https://platform.minimax.io/docs/api-reference/api-overview](https://platform.minimax.io/docs/api-reference/api-overview)
- pricing: [https://platform.minimax.io/docs/pricing/overview](https://platform.minimax.io/docs/pricing/overview)

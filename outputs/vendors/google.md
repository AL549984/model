# Google / Gemini Model Atlas

> 页面类型：厂商页 2.0  
> 页面路径建议：`/vendors/google`  
> page_status：`review`  
> case_library_status：`platform_only`

## 30 秒判断

Google 是 Gemini / Gemma / Veo 等多模态模型线的核心厂商，优势是长上下文、多模态、开发者 API 与 Google Cloud 生态。

## 模型路线

Google 路线应拆成 Gemini frontier family、Gemma open models、Veo/Imagen media models 与 Vertex AI enterprise distribution。Wiki 里的 Google 节点模型多，Phase 2 只做厂商导航骨架。

| 模型家族 | 定位 | 代表模型 |
|---|---|---|
| Gemini 3 | frontier multimodal and long-context family | `gemini-3-pro`, `gemini-3-pro-preview-high` |
| Gemini 2.5 | previous stable Gemini API generation | `gemini-2-5-pro`, `gemini-2-5-flash` |
| Gemma | open model family for local and developer deployment | `gemma-3` |
| Veo / Imagen | video and image generation model lines | `veo`, `imagen` |

## 模型时间线

| 日期 | 模型 / 节点 | 事件 | 证据 |
|---|---|---|---|
| 2026-03 | `gemini-3` | Gemini API changelog tracks Gemini 3 tooling and model updates | [source](https://ai.google.dev/gemini-api/docs/changelog) (high) |
| 2026 | `gemini-3-pro-preview-high` | Gemini API model docs list stable, preview, latest and experimental naming patterns | [source](https://ai.google.dev/gemini-api/docs/models) (high) |
| 2025-2026 | `gemini-3` | Gemini Enterprise Agent Platform exposes Gemini 3 developer paths | [source](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models) (medium) |

## 关键拐点

### Gemini becomes the unified multimodal API line

- 相关模型：`gemini-2-5-pro`, `gemini-3-pro`
- 判断：Gemini should be the core page path, with preview/high variants handled by lineage rules.

### Gemma separates open models from API-only Gemini

- 相关模型：`gemma-3`
- 判断：Open models need different risk and deployment language than hosted Gemini.

### Google Cloud becomes the enterprise distribution layer

- 相关模型：`gemini-3`
- 判断：Vertex AI / Gemini Enterprise links should be ecosystem entries, not separate model pages.

### Media models require safety and rights treatment

- 相关模型：`veo`, `imagen`
- 判断：Video/image models should not be mixed with LLM case evidence without modality labels.

## 当前代表模型

| 模型 ID | 优先级 | 处理建议 |
|---|---|---|
| `gemini-3-pro-preview-high` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `gemini-3-pro` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `gemini-2-5-pro` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `gemma-3` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |

## 适合使用场景

- multimodal document/video/image understanding
- long-context analysis
- enterprise workflows already on Google Cloud
- developer prototyping in AI Studio

## 不适合使用场景

- model ID stability is required across preview variants
- open-weight deployment is mandatory for all workloads
- cases require independent A-class proof not yet collected

## 案例库状态

`platform_only`。本阶段只生成厂商页导航骨架，不把官方发布、benchmark、教程或集合页包装成 A 类案例。后续如果进入模型卡升级，必须先按 `evidence-intake-table-schema.md` 建证据行，并按 `evidence-snapshot-policy.md` 保存快照。

## 风险和限制

- Preview/high model naming must follow the lineage spec.
- Google product announcements are not A-class cases.
- Media model pages need separate rights/safety review.

## 数据字段

```yaml
vendor_id: "google"
vendor_name: "Google LLC / Google DeepMind"
display_name: "Google / Gemini"
canonical_slug: "google"
official_site: "https://deepmind.google/"
model_families: 
  - family_id: "gemini-3"
    display_name: "Gemini 3"
    positioning: "frontier multimodal and long-context family"
    representative_models: 
      - "gemini-3-pro"
      - "gemini-3-pro-preview-high"
  - family_id: "gemini-2-5"
    display_name: "Gemini 2.5"
    positioning: "previous stable Gemini API generation"
    representative_models: 
      - "gemini-2-5-pro"
      - "gemini-2-5-flash"
  - family_id: "gemma"
    display_name: "Gemma"
    positioning: "open model family for local and developer deployment"
    representative_models: 
      - "gemma-3"
  - family_id: "google-media"
    display_name: "Veo / Imagen"
    positioning: "video and image generation model lines"
    representative_models: 
      - "veo"
      - "imagen"
flagship_models: 
  - "gemini-3-pro-preview-high"
  - "gemini-3-pro"
  - "gemini-2-5-pro"
  - "gemma-3"
timeline: 
  - date: "2026-03"
    model_id: "gemini-3"
    event: "Gemini API changelog tracks Gemini 3 tooling and model updates"
    source_url: "https://ai.google.dev/gemini-api/docs/changelog"
    confidence: "high"
  - date: "2026"
    model_id: "gemini-3-pro-preview-high"
    event: "Gemini API model docs list stable, preview, latest and experimental naming patterns"
    source_url: "https://ai.google.dev/gemini-api/docs/models"
    confidence: "high"
  - date: "2025-2026"
    model_id: "gemini-3"
    event: "Gemini Enterprise Agent Platform exposes Gemini 3 developer paths"
    source_url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models"
    confidence: "medium"
key_inflection_points: 
  - title: "Gemini becomes the unified multimodal API line"
    model_ids: 
      - "gemini-2-5-pro"
      - "gemini-3-pro"
    summary: "Gemini should be the core page path, with preview/high variants handled by lineage rules."
  - title: "Gemma separates open models from API-only Gemini"
    model_ids: 
      - "gemma-3"
    summary: "Open models need different risk and deployment language than hosted Gemini."
  - title: "Google Cloud becomes the enterprise distribution layer"
    model_ids: 
      - "gemini-3"
    summary: "Vertex AI / Gemini Enterprise links should be ecosystem entries, not separate model pages."
  - title: "Media models require safety and rights treatment"
    model_ids: 
      - "veo"
      - "imagen"
    summary: "Video/image models should not be mixed with LLM case evidence without modality labels."
strengths: 
  - "multimodal and long-context API"
  - "Google Cloud enterprise channel"
  - "strong media model stack"
  - "open Gemma branch"
weaknesses: 
  - "preview/latest/experimental naming can create slug churn"
  - "models span many product surfaces"
  - "case evidence must separate Google product demos from independent usage"
  - "regional and platform availability need review"
pricing_strategy: "Tiered Gemini API and Google Cloud pricing. Vendor page should link to current model docs rather than freezing prices in prose."
ecosystem: 
  - name: "Gemini API"
    type: "first_party_api"
    url: "https://ai.google.dev/gemini-api/docs"
  - name: "Google AI Studio"
    type: "developer_tool"
    url: "https://aistudio.google.com/"
  - name: "Vertex AI"
    type: "cloud_platform"
    url: "https://cloud.google.com/vertex-ai"
  - name: "Gemini Enterprise Agent Platform"
    type: "enterprise_platform"
    url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models"
case_library_status: "platform_only"
recommended_use_cases: 
  - "multimodal document/video/image understanding"
  - "long-context analysis"
  - "enterprise workflows already on Google Cloud"
  - "developer prototyping in AI Studio"
avoid_when: 
  - "model ID stability is required across preview variants"
  - "open-weight deployment is mandatory for all workloads"
  - "cases require independent A-class proof not yet collected"
source_links: 
  - type: "official_site"
    url: "https://deepmind.google/"
  - type: "gemini_docs"
    url: "https://ai.google.dev/gemini-api/docs/models"
  - type: "changelog"
    url: "https://ai.google.dev/gemini-api/docs/changelog"
  - type: "enterprise_docs"
    url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models"
page_status: "review"
last_reviewed_at: "2026-06-25"
owner: "pending"
```

## 相关链接

- official_site: [https://deepmind.google/](https://deepmind.google/)
- gemini_docs: [https://ai.google.dev/gemini-api/docs/models](https://ai.google.dev/gemini-api/docs/models)
- changelog: [https://ai.google.dev/gemini-api/docs/changelog](https://ai.google.dev/gemini-api/docs/changelog)
- enterprise_docs: [https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models)

# Qwen / Alibaba Model Atlas

> 页面类型：厂商页 2.0  
> 页面路径建议：`/vendors/qwen-alibaba`  
> page_status：`review`  
> case_library_status：`platform_only`

## 30 秒判断

Qwen 是 Alibaba 的多模态、开源和云服务模型线，厂商页要把 Qwen3、Qwen3-VL、Qwen Coder / Max / Thinking 等变体先理成家族。

## 模型路线

Qwen 路线横跨开源 Hugging Face/GitHub、Alibaba Cloud Model Studio、Qwen Chat 和多模态模型。Phase 2 只做厂商页骨架，后续模型卡按 lineage spec 处理 Max、Thinking、VL、Omni 等变体。

| 模型家族 | 定位 | 代表模型 |
|---|---|---|
| Qwen3 | main LLM family | `qwen3`, `qwen3-max`, `qwen3-max-thinking` |
| Qwen3-VL | vision-language and document understanding branch | `qwen3-vl`, `qwen3-vl-max` |
| Qwen Coder | coding model branch | `qwen3-coder` |
| Qwen Omni / Audio | audio and multimodal realtime branch | `qwen3-5-omni` |

## 模型时间线

| 日期 | 模型 / 节点 | 事件 | 证据 |
|---|---|---|---|
| 2026 | `qwen3` | Qwen docs position Qwen as Alibaba's LLM and LMM series | [source](https://qwen.readthedocs.io/) (high) |
| 2026 | `qwen3-vl` | Alibaba Cloud Model Studio model list includes Qwen3-VL and Omni families | [source](https://www.alibabacloud.com/help/en/model-studio/models) (high) |
| 2026 | `qwen3` | Qwen GitHub/Hugging Face remain primary open distribution channels | [source](https://huggingface.co/Qwen) (high) |

## 关键拐点

### Qwen3 consolidates the main text/reasoning line

- 相关模型：`qwen3`, `qwen3-max`
- 判断：Use Qwen3 as the family anchor, not every snapshot as a separate vendor story.

### Thinking becomes a variant axis

- 相关模型：`qwen3-max-thinking`
- 判断：Model ID must encode thinking following Phase 1.5 spec.

### Qwen3-VL gives Qwen a document/vision branch

- 相关模型：`qwen3-vl`
- 判断：Vision-language models should have modality labels and separate cases.

### Alibaba Cloud Model Studio is the enterprise distribution layer

- 相关模型：`qwen3-max`
- 判断：Cloud availability belongs in ecosystem/source_links.

## 当前代表模型

| 模型 ID | 优先级 | 处理建议 |
|---|---|---|
| `qwen3-max-thinking` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `qwen3-max` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `qwen3-vl` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `qwen3-coder` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |

## 适合使用场景

- open-weight model evaluation
- multilingual applications
- vision-language document parsing
- Alibaba Cloud-native deployments

## 不适合使用场景

- model variant mapping is unresolved
- production claims rely only on collections or leaderboards
- single stable hosted model ID is required but source naming differs

## 案例库状态

`platform_only`。本阶段只生成厂商页导航骨架，不把官方发布、benchmark、教程或集合页包装成 A 类案例。后续如果进入模型卡升级，必须先按 `evidence-intake-table-schema.md` 建证据行，并按 `evidence-snapshot-policy.md` 保存快照。

## 风险和限制

- Qwen has many model variants; freeze IDs before model-card migration.
- Do not merge VL/Omni/Coder cases into generic Qwen unless modality is explicit.
- Cloud names and open weights require source mapping.

## 数据字段

```yaml
vendor_id: "qwen-alibaba"
vendor_name: "Alibaba Cloud / Qwen Team"
display_name: "Qwen / Alibaba"
canonical_slug: "qwen-alibaba"
official_site: "https://qwenlm.github.io/"
model_families: 
  - family_id: "qwen3"
    display_name: "Qwen3"
    positioning: "main LLM family"
    representative_models: 
      - "qwen3"
      - "qwen3-max"
      - "qwen3-max-thinking"
  - family_id: "qwen3-vl"
    display_name: "Qwen3-VL"
    positioning: "vision-language and document understanding branch"
    representative_models: 
      - "qwen3-vl"
      - "qwen3-vl-max"
  - family_id: "qwen-coder"
    display_name: "Qwen Coder"
    positioning: "coding model branch"
    representative_models: 
      - "qwen3-coder"
  - family_id: "qwen-omni"
    display_name: "Qwen Omni / Audio"
    positioning: "audio and multimodal realtime branch"
    representative_models: 
      - "qwen3-5-omni"
flagship_models: 
  - "qwen3-max-thinking"
  - "qwen3-max"
  - "qwen3-vl"
  - "qwen3-coder"
timeline: 
  - date: "2026"
    model_id: "qwen3"
    event: "Qwen docs position Qwen as Alibaba's LLM and LMM series"
    source_url: "https://qwen.readthedocs.io/"
    confidence: "high"
  - date: "2026"
    model_id: "qwen3-vl"
    event: "Alibaba Cloud Model Studio model list includes Qwen3-VL and Omni families"
    source_url: "https://www.alibabacloud.com/help/en/model-studio/models"
    confidence: "high"
  - date: "2026"
    model_id: "qwen3"
    event: "Qwen GitHub/Hugging Face remain primary open distribution channels"
    source_url: "https://huggingface.co/Qwen"
    confidence: "high"
key_inflection_points: 
  - title: "Qwen3 consolidates the main text/reasoning line"
    model_ids: 
      - "qwen3"
      - "qwen3-max"
    summary: "Use Qwen3 as the family anchor, not every snapshot as a separate vendor story."
  - title: "Thinking becomes a variant axis"
    model_ids: 
      - "qwen3-max-thinking"
    summary: "Model ID must encode thinking following Phase 1.5 spec."
  - title: "Qwen3-VL gives Qwen a document/vision branch"
    model_ids: 
      - "qwen3-vl"
    summary: "Vision-language models should have modality labels and separate cases."
  - title: "Alibaba Cloud Model Studio is the enterprise distribution layer"
    model_ids: 
      - "qwen3-max"
    summary: "Cloud availability belongs in ecosystem/source_links."
strengths: 
  - "open model ecosystem"
  - "broad model family coverage"
  - "strong multilingual and multimodal coverage"
  - "Alibaba Cloud deployment channel"
weaknesses: 
  - "many variants create slug and dedupe pressure"
  - "cloud model names can differ from open model names"
  - "case evidence needs strict A/B/C/D separation"
  - "pricing and regional availability need source review"
pricing_strategy: "Mixed open-weight and Alibaba Cloud API pricing. Pricing should be tracked by provider/source because open models, Model Studio, and third-party hosts differ."
ecosystem: 
  - name: "Qwen docs"
    type: "docs"
    url: "https://qwen.readthedocs.io/"
  - name: "Alibaba Cloud Model Studio"
    type: "cloud_platform"
    url: "https://www.alibabacloud.com/help/en/model-studio/models"
  - name: "Qwen Hugging Face"
    type: "model_hub"
    url: "https://huggingface.co/Qwen"
  - name: "Qwen GitHub"
    type: "github"
    url: "https://github.com/QwenLM"
case_library_status: "platform_only"
recommended_use_cases: 
  - "open-weight model evaluation"
  - "multilingual applications"
  - "vision-language document parsing"
  - "Alibaba Cloud-native deployments"
avoid_when: 
  - "model variant mapping is unresolved"
  - "production claims rely only on collections or leaderboards"
  - "single stable hosted model ID is required but source naming differs"
source_links: 
  - type: "official_docs"
    url: "https://qwen.readthedocs.io/"
  - type: "model_studio"
    url: "https://www.alibabacloud.com/help/en/model-studio/models"
  - type: "huggingface"
    url: "https://huggingface.co/Qwen"
  - type: "github"
    url: "https://github.com/QwenLM"
page_status: "review"
last_reviewed_at: "2026-06-25"
owner: "pending"
```

## 相关链接

- official_docs: [https://qwen.readthedocs.io/](https://qwen.readthedocs.io/)
- model_studio: [https://www.alibabacloud.com/help/en/model-studio/models](https://www.alibabacloud.com/help/en/model-studio/models)
- huggingface: [https://huggingface.co/Qwen](https://huggingface.co/Qwen)
- github: [https://github.com/QwenLM](https://github.com/QwenLM)

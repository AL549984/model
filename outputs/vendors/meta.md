# Meta / Llama Model Atlas

> 页面类型：厂商页 2.0  
> 页面路径建议：`/vendors/meta`  
> page_status：`review`  
> case_library_status：`platform_only`

## 30 秒判断

Meta 是 open-weight Llama 生态的核心厂商，厂商页重点在 Llama 4 多模态 MoE、Llama 3.x 生态和许可/开放边界。

## 模型路线

Meta 路线包括 Llama open-weight family、Llama Guard / safety tools、Meta AI product integration 和研究模型。Wiki 中 Meta 节点模型不多，但后续模型卡应优先处理 Llama 4 Scout/Maverick/Behemoth。

| 模型家族 | 定位 | 代表模型 |
|---|---|---|
| Llama 4 | open-weight multimodal MoE family | `llama-4-scout`, `llama-4-maverick`, `llama-4-behemoth` |
| Llama 3.x | previous widely deployed open-weight family | `llama-3-3`, `llama-3-1` |
| Llama safety/tools | guard and safety support models | `llama-guard` |

## 模型时间线

| 日期 | 模型 / 节点 | 事件 | 证据 |
|---|---|---|---|
| 2025 | `llama-4` | Meta introduces Llama 4 Scout and Maverick as open-weight natively multimodal MoE models | [source](https://ai.meta.com/blog/llama-4-multimodal-intelligence/) (high) |
| 2025 | `llama-4` | Llama docs provide model cards and prompt formats for Llama 4 | [source](https://www.llama.com/docs/model-cards-and-prompt-formats/llama4/) (high) |
| 2025-2026 | `llama` | Meta Llama models distributed through Hugging Face and GitHub tooling | [source](https://huggingface.co/meta-llama) (high) |

## 关键拐点

### Llama 4 makes Meta natively multimodal

- 相关模型：`llama-4-scout`, `llama-4-maverick`
- 判断：Llama 4 should reset the vendor page away from text-only Llama assumptions.

### MoE architecture changes deployment economics

- 相关模型：`llama-4`
- 判断：Model pages should explain active vs total parameters.

### Open-weight does not mean unrestricted

- 相关模型：`llama-4`
- 判断：License and acceptable use need visible risk notes.

### Meta AI product integration creates consumer scale

- 相关模型：`meta-ai`
- 判断：Product adoption should be separated from model capability evidence.

## 当前代表模型

| 模型 ID | 优先级 | 处理建议 |
|---|---|---|
| `llama-4-maverick` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `llama-4-scout` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `llama-4-behemoth` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |

## 适合使用场景

- open-weight experimentation
- self-hosted assistants
- multimodal open model evaluation
- research and fine-tuning workflows

## 不适合使用场景

- fully closed compliance support is required
- deployment team cannot manage infra
- license terms conflict with product scale
- benchmarks are treated as real cases

## 案例库状态

`platform_only`。本阶段只生成厂商页导航骨架，不把官方发布、benchmark、教程或集合页包装成 A 类案例。后续如果进入模型卡升级，必须先按 `evidence-intake-table-schema.md` 建证据行，并按 `evidence-snapshot-policy.md` 保存快照。

## 风险和限制

- License and redistribution terms must be reviewed per model.
- Hardware setup materially affects observed quality.
- Do not treat Meta AI consumer usage as A-class model case evidence.

## 数据字段

```yaml
vendor_id: "meta"
vendor_name: "Meta Platforms, Inc."
display_name: "Meta / Llama"
canonical_slug: "meta"
official_site: "https://ai.meta.com/"
model_families: 
  - family_id: "llama-4"
    display_name: "Llama 4"
    positioning: "open-weight multimodal MoE family"
    representative_models: 
      - "llama-4-scout"
      - "llama-4-maverick"
      - "llama-4-behemoth"
  - family_id: "llama-3"
    display_name: "Llama 3.x"
    positioning: "previous widely deployed open-weight family"
    representative_models: 
      - "llama-3-3"
      - "llama-3-1"
  - family_id: "llama-safety"
    display_name: "Llama safety/tools"
    positioning: "guard and safety support models"
    representative_models: 
      - "llama-guard"
flagship_models: 
  - "llama-4-maverick"
  - "llama-4-scout"
  - "llama-4-behemoth"
timeline: 
  - date: "2025"
    model_id: "llama-4"
    event: "Meta introduces Llama 4 Scout and Maverick as open-weight natively multimodal MoE models"
    source_url: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/"
    confidence: "high"
  - date: "2025"
    model_id: "llama-4"
    event: "Llama docs provide model cards and prompt formats for Llama 4"
    source_url: "https://www.llama.com/docs/model-cards-and-prompt-formats/llama4/"
    confidence: "high"
  - date: "2025-2026"
    model_id: "llama"
    event: "Meta Llama models distributed through Hugging Face and GitHub tooling"
    source_url: "https://huggingface.co/meta-llama"
    confidence: "high"
key_inflection_points: 
  - title: "Llama 4 makes Meta natively multimodal"
    model_ids: 
      - "llama-4-scout"
      - "llama-4-maverick"
    summary: "Llama 4 should reset the vendor page away from text-only Llama assumptions."
  - title: "MoE architecture changes deployment economics"
    model_ids: 
      - "llama-4"
    summary: "Model pages should explain active vs total parameters."
  - title: "Open-weight does not mean unrestricted"
    model_ids: 
      - "llama-4"
    summary: "License and acceptable use need visible risk notes."
  - title: "Meta AI product integration creates consumer scale"
    model_ids: 
      - "meta-ai"
    summary: "Product adoption should be separated from model capability evidence."
strengths: 
  - "open-weight ecosystem scale"
  - "strong developer adoption"
  - "multimodal Llama 4 branch"
  - "rich model cards and prompt docs"
weaknesses: 
  - "license restrictions and acceptable-use policy complexity"
  - "frontier hosted APIs may outperform open-weight deployments"
  - "hardware/runtime variance affects user results"
  - "case evidence can be scattered across repos and demos"
pricing_strategy: "Open-weight deployment shifts cost to infrastructure rather than per-token vendor pricing. Hosted providers must be tracked separately."
ecosystem: 
  - name: "Meta AI"
    type: "official_site"
    url: "https://ai.meta.com/"
  - name: "Llama docs"
    type: "docs"
    url: "https://www.llama.com/docs/model-cards-and-prompt-formats/llama4/"
  - name: "Meta Llama Hugging Face"
    type: "model_hub"
    url: "https://huggingface.co/meta-llama"
  - name: "Llama GitHub utilities"
    type: "github"
    url: "https://github.com/meta-llama/llama-models"
case_library_status: "platform_only"
recommended_use_cases: 
  - "open-weight experimentation"
  - "self-hosted assistants"
  - "multimodal open model evaluation"
  - "research and fine-tuning workflows"
avoid_when: 
  - "fully closed compliance support is required"
  - "deployment team cannot manage infra"
  - "license terms conflict with product scale"
  - "benchmarks are treated as real cases"
source_links: 
  - type: "official_site"
    url: "https://ai.meta.com/"
  - type: "llama_4_blog"
    url: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/"
  - type: "model_card"
    url: "https://www.llama.com/docs/model-cards-and-prompt-formats/llama4/"
  - type: "huggingface"
    url: "https://huggingface.co/meta-llama"
page_status: "review"
last_reviewed_at: "2026-06-25"
owner: "pending"
```

## 相关链接

- official_site: [https://ai.meta.com/](https://ai.meta.com/)
- llama_4_blog: [https://ai.meta.com/blog/llama-4-multimodal-intelligence/](https://ai.meta.com/blog/llama-4-multimodal-intelligence/)
- model_card: [https://www.llama.com/docs/model-cards-and-prompt-formats/llama4/](https://www.llama.com/docs/model-cards-and-prompt-formats/llama4/)
- huggingface: [https://huggingface.co/meta-llama](https://huggingface.co/meta-llama)

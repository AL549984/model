# ByteDance Seed Model Atlas

> 页面类型：厂商页 2.0  
> 页面路径建议：`/vendors/bytedance-seed`  
> page_status：`review`  
> case_library_status：`platform_only`

## 30 秒判断

ByteDance Seed 是 Wiki 中额外出现的 Seed 模型节点，覆盖 Seed2.1、Seedance、Seed multimodal research 和 ByteDance 内部产品生态。

## 模型路线

ByteDance Seed 路线包括 Seed2.1 productivity models、Seedance video generation、Seed1.5 VL / Seed multimodal research，以及 Doubao/Volcano/Coze 等产品分发。由于 Wiki 只有 1 个直接子卡，Phase 2 先创建厂商页并在 QA 说明额外节点。

| 模型家族 | 定位 | 代表模型 |
|---|---|---|
| Seed2.1 | AI productivity model family | `seed-2-1-pro`, `seed-2-1-turbo` |
| Seedance | video generation model family | `seedance-1-0`, `seedance-2-0` |
| Seed multimodal research | vision, speech and multimodal research models | `seed1-5-vl`, `bagel` |

## 模型时间线

| 日期 | 模型 / 节点 | 事件 | 证据 |
|---|---|---|---|
| 2026-06-19 | `seed-2-1-pro-preview` | Seed-2.1-Pro-Preview released on Arena AI code arena | [source](https://seed.bytedance.com/en/blog/seed-2-1-preview-model-release-on-arena) (high) |
| 2026-06-23 | `seed-2-1` | Seed2.1 officially released, with Pro and Turbo models | [source](https://seed.bytedance.com/en/blog/seed2-1-officially-released-advancing-ai-productivity) (high) |
| 2026 | `seedance-1-0` | Seedance 1.0 page describes multi-shot text/image-to-video generation | [source](https://seed.bytedance.com/en/seedance) (high) |

## 关键拐点

### Seed team becomes explicit AI research vendor node

- 相关模型：`seed`
- 判断：Blueprint identified ByteDance Seed as an extra root node beyond the named 14-vendor table.

### Seed2.1 creates a productivity-model branch

- 相关模型：`seed-2-1-pro`, `seed-2-1-turbo`
- 判断：Seed2.1 should be the first model-card target if this vendor enters Phase 3.

### Arena preview gives external evaluation access

- 相关模型：`seed-2-1-pro-preview`
- 判断：Arena release is a platform signal, not an A-class case.

### Seedance adds high-risk video modality

- 相关模型：`seedance-1-0`
- 判断：Video generation needs rights, likeness and safety risk treatment.

## 当前代表模型

| 模型 ID | 优先级 | 处理建议 |
|---|---|---|
| `seed-2-1-pro` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `seed-2-1-turbo` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `seedance-1-0` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |

## 适合使用场景

- productivity model tracking
- video generation model comparison
- ByteDance ecosystem research
- Arena preview monitoring

## 不适合使用场景

- stable API/pricing is required but not captured
- rights-sensitive video generation lacks review
- only one old Wiki model card is available

## 案例库状态

`platform_only`。本阶段只生成厂商页导航骨架，不把官方发布、benchmark、教程或集合页包装成 A 类案例。后续如果进入模型卡升级，必须先按 `evidence-intake-table-schema.md` 建证据行，并按 `evidence-snapshot-policy.md` 保存快照。

## 风险和限制

- Seedance video cases require strict IP/safety policy.
- Seed2.1 access channels may change quickly.
- ByteDance Seed appears as extra vendor node; QA must explain coverage.

## 数据字段

```yaml
vendor_id: "bytedance-seed"
vendor_name: "ByteDance Seed"
display_name: "ByteDance Seed"
canonical_slug: "bytedance-seed"
official_site: "https://seed.bytedance.com/en/"
model_families: 
  - family_id: "seed-2-1"
    display_name: "Seed2.1"
    positioning: "AI productivity model family"
    representative_models: 
      - "seed-2-1-pro"
      - "seed-2-1-turbo"
  - family_id: "seedance"
    display_name: "Seedance"
    positioning: "video generation model family"
    representative_models: 
      - "seedance-1-0"
      - "seedance-2-0"
  - family_id: "seed-multimodal"
    display_name: "Seed multimodal research"
    positioning: "vision, speech and multimodal research models"
    representative_models: 
      - "seed1-5-vl"
      - "bagel"
flagship_models: 
  - "seed-2-1-pro"
  - "seed-2-1-turbo"
  - "seedance-1-0"
timeline: 
  - date: "2026-06-19"
    model_id: "seed-2-1-pro-preview"
    event: "Seed-2.1-Pro-Preview released on Arena AI code arena"
    source_url: "https://seed.bytedance.com/en/blog/seed-2-1-preview-model-release-on-arena"
    confidence: "high"
  - date: "2026-06-23"
    model_id: "seed-2-1"
    event: "Seed2.1 officially released, with Pro and Turbo models"
    source_url: "https://seed.bytedance.com/en/blog/seed2-1-officially-released-advancing-ai-productivity"
    confidence: "high"
  - date: "2026"
    model_id: "seedance-1-0"
    event: "Seedance 1.0 page describes multi-shot text/image-to-video generation"
    source_url: "https://seed.bytedance.com/en/seedance"
    confidence: "high"
key_inflection_points: 
  - title: "Seed team becomes explicit AI research vendor node"
    model_ids: 
      - "seed"
    summary: "Blueprint identified ByteDance Seed as an extra root node beyond the named 14-vendor table."
  - title: "Seed2.1 creates a productivity-model branch"
    model_ids: 
      - "seed-2-1-pro"
      - "seed-2-1-turbo"
    summary: "Seed2.1 should be the first model-card target if this vendor enters Phase 3."
  - title: "Arena preview gives external evaluation access"
    model_ids: 
      - "seed-2-1-pro-preview"
    summary: "Arena release is a platform signal, not an A-class case."
  - title: "Seedance adds high-risk video modality"
    model_ids: 
      - "seedance-1-0"
    summary: "Video generation needs rights, likeness and safety risk treatment."
strengths: 
  - "ByteDance product ecosystem"
  - "Seed2.1 productivity focus"
  - "video and multimodal research breadth"
  - "official English Seed site with model pages"
weaknesses: 
  - "Wiki footprint is small"
  - "model access may route through Doubao/Volcano/Coze rather than generic API"
  - "video model rights risks are high"
  - "case evidence not yet structured"
pricing_strategy: "Pricing/access should be tracked through Doubao, Volcano Engine, Feishu Spark, Coze or Seed official links once captured. Phase 2 leaves pricing strategy as pending/source-linked."
ecosystem: 
  - name: "ByteDance Seed"
    type: "official_site"
    url: "https://seed.bytedance.com/en/"
  - name: "Seed2.1"
    type: "model_page"
    url: "https://seed.bytedance.com/en/seed2_1"
  - name: "Seedance"
    type: "model_page"
    url: "https://seed.bytedance.com/en/seedance"
  - name: "ByteDance Seed GitHub"
    type: "github"
    url: "https://github.com/ByteDance-Seed"
case_library_status: "platform_only"
recommended_use_cases: 
  - "productivity model tracking"
  - "video generation model comparison"
  - "ByteDance ecosystem research"
  - "Arena preview monitoring"
avoid_when: 
  - "stable API/pricing is required but not captured"
  - "rights-sensitive video generation lacks review"
  - "only one old Wiki model card is available"
source_links: 
  - type: "official_site"
    url: "https://seed.bytedance.com/en/"
  - type: "seed2_1"
    url: "https://seed.bytedance.com/en/seed2_1"
  - type: "preview_release"
    url: "https://seed.bytedance.com/en/blog/seed-2-1-preview-model-release-on-arena"
  - type: "official_release"
    url: "https://seed.bytedance.com/en/blog/seed2-1-officially-released-advancing-ai-productivity"
  - type: "seedance"
    url: "https://seed.bytedance.com/en/seedance"
page_status: "review"
last_reviewed_at: "2026-06-25"
owner: "pending"
```

## 相关链接

- official_site: [https://seed.bytedance.com/en/](https://seed.bytedance.com/en/)
- seed2_1: [https://seed.bytedance.com/en/seed2_1](https://seed.bytedance.com/en/seed2_1)
- preview_release: [https://seed.bytedance.com/en/blog/seed-2-1-preview-model-release-on-arena](https://seed.bytedance.com/en/blog/seed-2-1-preview-model-release-on-arena)
- official_release: [https://seed.bytedance.com/en/blog/seed2-1-officially-released-advancing-ai-productivity](https://seed.bytedance.com/en/blog/seed2-1-officially-released-advancing-ai-productivity)
- seedance: [https://seed.bytedance.com/en/seedance](https://seed.bytedance.com/en/seedance)

# MBZUAI IFM / K2 Model Atlas

> 页面类型：厂商页 2.0  
> 页面路径建议：`/vendors/mbzuai-ifm`  
> page_status：`limited`  
> case_library_status：`archive_only`

## 30 秒判断

MBZUAI IFM 是 K2 系列和 sovereign reasoning 方向的研究型厂商节点，厂商页应标注为 limited/review，避免把研究发布直接包装成产品化模型线。

## 模型路线

MBZUAI IFM 路线围绕 K2/K2 Think，强调开放基础模型、主权 AI、reasoning、long context 和训练透明度。Wiki 中只有少量模型卡，Phase 2 主要建立导航和风险边界。

| 模型家族 | 定位 | 代表模型 |
|---|---|---|
| K2 | foundation model family from MBZUAI IFM | `k2-65b`, `k2-think-v2` |
| K2 Think | reasoning system / sovereign model branch | `k2-think-v2` |

## 模型时间线

| 日期 | 模型 / 节点 | 事件 | 证据 |
|---|---|---|---|
| 2025 | `k2` | MBZUAI launches Institute of Foundation Models and describes K2 reasoning direction | [source](https://mbzuai.ac.ae/news/mbzuai-launches-institute-of-foundation-models-and-establishes-silicon-valley-ai-lab/) (high) |
| 2026 | `k2-think-v2` | MBZUAI IFM releases K2 Think V2 as fully sovereign reasoning model | [source](https://mbzuai.ac.ae/news/k2-think-v2-a-fully-sovereign-reasoning-model/) (high) |
| 2026 | `k2-think-v2` | K2 Think site provides model/system entry point | [source](https://www.k2think.ai/k2think) (medium) |

## 关键拐点

### IFM formalizes MBZUAI foundation model work

- 相关模型：`k2`
- 判断：Use IFM as vendor namespace instead of generic MBZUAI.

### K2 establishes the foundation model line

- 相关模型：`k2-65b`
- 判断：Older K2 cards should map into one K2 family.

### K2 Think V2 shifts focus to sovereign reasoning

- 相关模型：`k2-think-v2`
- 判断：Reasoning system language should not be reduced to a plain LLM card.

### Open-source transparency is part of positioning

- 相关模型：`k2-think-v2`
- 判断：Source links must include dataset/model/code if available during model-card upgrade.

## 当前代表模型

| 模型 ID | 优先级 | 处理建议 |
|---|---|---|
| `k2-think-v2` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `k2-65b` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |

## 适合使用场景

- research comparison
- sovereign AI landscape mapping
- reasoning model analysis
- open model governance discussion

## 不适合使用场景

- commercial deployment details are required
- production cases are mandatory
- pricing/API needs are central

## 案例库状态

`archive_only`。本阶段只生成厂商页导航骨架，不把官方发布、benchmark、教程或集合页包装成 A 类案例。后续如果进入模型卡升级，必须先按 `evidence-intake-table-schema.md` 建证据行，并按 `evidence-snapshot-policy.md` 保存快照。

## 风险和限制

- Research announcements are not production cases.
- K2 Think may be a system rather than a single model; model-card upgrade must verify granularity.
- Use official MBZUAI/IFM links, not press-release mirrors when possible.

## 数据字段

```yaml
vendor_id: "mbzuai-ifm"
vendor_name: "MBZUAI Institute of Foundation Models"
display_name: "MBZUAI IFM / K2"
canonical_slug: "mbzuai-ifm"
official_site: "https://mbzuai.ac.ae/"
model_families: 
  - family_id: "k2"
    display_name: "K2"
    positioning: "foundation model family from MBZUAI IFM"
    representative_models: 
      - "k2-65b"
      - "k2-think-v2"
  - family_id: "k2-think"
    display_name: "K2 Think"
    positioning: "reasoning system / sovereign model branch"
    representative_models: 
      - "k2-think-v2"
flagship_models: 
  - "k2-think-v2"
  - "k2-65b"
timeline: 
  - date: "2025"
    model_id: "k2"
    event: "MBZUAI launches Institute of Foundation Models and describes K2 reasoning direction"
    source_url: "https://mbzuai.ac.ae/news/mbzuai-launches-institute-of-foundation-models-and-establishes-silicon-valley-ai-lab/"
    confidence: "high"
  - date: "2026"
    model_id: "k2-think-v2"
    event: "MBZUAI IFM releases K2 Think V2 as fully sovereign reasoning model"
    source_url: "https://mbzuai.ac.ae/news/k2-think-v2-a-fully-sovereign-reasoning-model/"
    confidence: "high"
  - date: "2026"
    model_id: "k2-think-v2"
    event: "K2 Think site provides model/system entry point"
    source_url: "https://www.k2think.ai/k2think"
    confidence: "medium"
key_inflection_points: 
  - title: "IFM formalizes MBZUAI foundation model work"
    model_ids: 
      - "k2"
    summary: "Use IFM as vendor namespace instead of generic MBZUAI."
  - title: "K2 establishes the foundation model line"
    model_ids: 
      - "k2-65b"
    summary: "Older K2 cards should map into one K2 family."
  - title: "K2 Think V2 shifts focus to sovereign reasoning"
    model_ids: 
      - "k2-think-v2"
    summary: "Reasoning system language should not be reduced to a plain LLM card."
  - title: "Open-source transparency is part of positioning"
    model_ids: 
      - "k2-think-v2"
    summary: "Source links must include dataset/model/code if available during model-card upgrade."
strengths: 
  - "research credibility"
  - "sovereign AI positioning"
  - "reasoning model focus"
  - "open-source transparency narrative"
weaknesses: 
  - "small Wiki footprint"
  - "less commercial ecosystem evidence"
  - "case library not yet built"
  - "model/product boundary may be blurry"
pricing_strategy: "No general API pricing captured in Phase 2. Treat as research/open model branch unless official API/pricing source is added."
ecosystem: 
  - name: "MBZUAI IFM news"
    type: "official_news"
    url: "https://mbzuai.ac.ae/news/k2-think-v2-a-fully-sovereign-reasoning-model/"
  - name: "K2 Think"
    type: "model_page"
    url: "https://www.k2think.ai/k2think"
  - name: "MBZUAI"
    type: "official_site"
    url: "https://mbzuai.ac.ae/"
case_library_status: "archive_only"
recommended_use_cases: 
  - "research comparison"
  - "sovereign AI landscape mapping"
  - "reasoning model analysis"
  - "open model governance discussion"
avoid_when: 
  - "commercial deployment details are required"
  - "production cases are mandatory"
  - "pricing/API needs are central"
source_links: 
  - type: "official_site"
    url: "https://mbzuai.ac.ae/"
  - type: "ifm_launch"
    url: "https://mbzuai.ac.ae/news/mbzuai-launches-institute-of-foundation-models-and-establishes-silicon-valley-ai-lab/"
  - type: "k2_think_v2"
    url: "https://mbzuai.ac.ae/news/k2-think-v2-a-fully-sovereign-reasoning-model/"
  - type: "k2_think_site"
    url: "https://www.k2think.ai/k2think"
page_status: "limited"
last_reviewed_at: "2026-06-25"
owner: "pending"
```

## 相关链接

- official_site: [https://mbzuai.ac.ae/](https://mbzuai.ac.ae/)
- ifm_launch: [https://mbzuai.ac.ae/news/mbzuai-launches-institute-of-foundation-models-and-establishes-silicon-valley-ai-lab/](https://mbzuai.ac.ae/news/mbzuai-launches-institute-of-foundation-models-and-establishes-silicon-valley-ai-lab/)
- k2_think_v2: [https://mbzuai.ac.ae/news/k2-think-v2-a-fully-sovereign-reasoning-model/](https://mbzuai.ac.ae/news/k2-think-v2-a-fully-sovereign-reasoning-model/)
- k2_think_site: [https://www.k2think.ai/k2think](https://www.k2think.ai/k2think)

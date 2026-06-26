# Xiaomi / MiMo Model Atlas

> 页面类型：厂商页 2.0  
> 页面路径建议：`/vendors/xiaomi`  
> page_status：`review`  
> case_library_status：`platform_only`

## 30 秒判断

Xiaomi 的 MiMo 路线把 reasoning、coding、agentic foundation model 和终端/生态潜力连接起来，是 Model Atlas 中需要单独跟踪的新兴厂商线。

## 模型路线

Xiaomi 路线包括 MiMo、MiMo-V2-Flash、MiMo-V2-Pro、MiMo-Code 和音频/多模态分支。厂商页应先把 MiMo 作为 family，再把 Code/Audio/Pro/Flash 拆成代表模型或产品线。

| 模型家族 | 定位 | 代表模型 |
|---|---|---|
| MiMo | reasoning foundation model line | `mimo`, `mimo-v2-pro`, `mimo-v2-flash` |
| MiMo Code | terminal-native coding assistant and coding model branch | `mimo-code` |
| MiMo Audio | audio model branch | `mimo-audio` |

## 模型时间线

| 日期 | 模型 / 节点 | 事件 | 证据 |
|---|---|---|---|
| 2025 | `mimo` | Xiaomi MiMo GitHub describes MiMo reasoning model and model availability | [source](https://github.com/xiaomimimo/mimo) (high) |
| 2026 | `mimo-v2-flash` | MiMo-V2-Flash repo positions model for high-speed reasoning and agentic workflows | [source](https://github.com/xiaomimimo/MiMo-V2-Flash) (high) |
| 2026 | `mimo-v2-pro` | MiMo-V2-Pro official page positions model for real-world agentic workloads | [source](https://mimo.xiaomi.com/mimo-v2-pro) (high) |
| 2026-06-25 | `mimo-code` | MiMo-Code repository describes terminal-native AI coding assistant | [source](https://github.com/XiaomiMiMo/MiMo-Code) (medium) |

## 关键拐点

### MiMo introduces Xiaomi's reasoning model line

- 相关模型：`mimo`
- 判断：Use MiMo as canonical family, not just a one-off model.

### V2 Flash emphasizes efficient reasoning and agent workflows

- 相关模型：`mimo-v2-flash`
- 判断：Efficiency claims need model-card evidence and deployment notes.

### V2 Pro moves toward flagship agent workloads

- 相关模型：`mimo-v2-pro`
- 判断：This should be the current representative model pending model-card upgrade.

### MiMo-Code makes coding assistant a product branch

- 相关模型：`mimo-code`
- 判断：Coding assistant should be tracked as ecosystem/product, not just model.

## 当前代表模型

| 模型 ID | 优先级 | 处理建议 |
|---|---|---|
| `mimo-v2-pro` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `mimo-v2-flash` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `mimo-code` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |

## 适合使用场景

- reasoning model evaluation
- coding assistant experiments
- efficient agentic workflow tests
- open-model deployment research

## 不适合使用场景

- enterprise case proof is required now
- pricing/API terms are mandatory
- model lineage cannot tolerate pending fields

## 案例库状态

`platform_only`。本阶段只生成厂商页导航骨架，不把官方发布、benchmark、教程或集合页包装成 A 类案例。后续如果进入模型卡升级，必须先按 `evidence-intake-table-schema.md` 建证据行，并按 `evidence-snapshot-policy.md` 保存快照。

## 风险和限制

- Need to distinguish XiaomiMiMo GitHub org casing from vendor slug.
- Recent repos require snapshot/HEAD capture.
- MiMo-Code is product/tool evidence, not necessarily model performance proof.

## 数据字段

```yaml
vendor_id: "xiaomi"
vendor_name: "Xiaomi"
display_name: "Xiaomi / MiMo"
canonical_slug: "xiaomi"
official_site: "https://mimo.xiaomi.com/"
model_families: 
  - family_id: "mimo"
    display_name: "MiMo"
    positioning: "reasoning foundation model line"
    representative_models: 
      - "mimo"
      - "mimo-v2-pro"
      - "mimo-v2-flash"
  - family_id: "mimo-code"
    display_name: "MiMo Code"
    positioning: "terminal-native coding assistant and coding model branch"
    representative_models: 
      - "mimo-code"
  - family_id: "mimo-audio"
    display_name: "MiMo Audio"
    positioning: "audio model branch"
    representative_models: 
      - "mimo-audio"
flagship_models: 
  - "mimo-v2-pro"
  - "mimo-v2-flash"
  - "mimo-code"
timeline: 
  - date: "2025"
    model_id: "mimo"
    event: "Xiaomi MiMo GitHub describes MiMo reasoning model and model availability"
    source_url: "https://github.com/xiaomimimo/mimo"
    confidence: "high"
  - date: "2026"
    model_id: "mimo-v2-flash"
    event: "MiMo-V2-Flash repo positions model for high-speed reasoning and agentic workflows"
    source_url: "https://github.com/xiaomimimo/MiMo-V2-Flash"
    confidence: "high"
  - date: "2026"
    model_id: "mimo-v2-pro"
    event: "MiMo-V2-Pro official page positions model for real-world agentic workloads"
    source_url: "https://mimo.xiaomi.com/mimo-v2-pro"
    confidence: "high"
  - date: "2026-06-25"
    model_id: "mimo-code"
    event: "MiMo-Code repository describes terminal-native AI coding assistant"
    source_url: "https://github.com/XiaomiMiMo/MiMo-Code"
    confidence: "medium"
key_inflection_points: 
  - title: "MiMo introduces Xiaomi's reasoning model line"
    model_ids: 
      - "mimo"
    summary: "Use MiMo as canonical family, not just a one-off model."
  - title: "V2 Flash emphasizes efficient reasoning and agent workflows"
    model_ids: 
      - "mimo-v2-flash"
    summary: "Efficiency claims need model-card evidence and deployment notes."
  - title: "V2 Pro moves toward flagship agent workloads"
    model_ids: 
      - "mimo-v2-pro"
    summary: "This should be the current representative model pending model-card upgrade."
  - title: "MiMo-Code makes coding assistant a product branch"
    model_ids: 
      - "mimo-code"
    summary: "Coding assistant should be tracked as ecosystem/product, not just model."
strengths: 
  - "reasoning and agentic workflow focus"
  - "GitHub/Hugging Face distribution"
  - "potential device/ecosystem angle"
  - "coding assistant branch"
weaknesses: 
  - "newer ecosystem with limited independent cases"
  - "official API/platform availability needs review"
  - "model names and org casing need slug normalization"
  - "production evidence not yet collected"
pricing_strategy: "Mixed open model / official API posture. Pricing should remain pending until the MiMo API or official pricing source is captured."
ecosystem: 
  - name: "MiMo official site"
    type: "official_site"
    url: "https://mimo.xiaomi.com/"
  - name: "MiMo GitHub"
    type: "github"
    url: "https://github.com/XiaomiMiMo"
  - name: "MiMo Hugging Face"
    type: "model_hub"
    url: "https://huggingface.co/XiaomiMiMo"
  - name: "MiMo V2 Pro"
    type: "model_page"
    url: "https://mimo.xiaomi.com/mimo-v2-pro"
case_library_status: "platform_only"
recommended_use_cases: 
  - "reasoning model evaluation"
  - "coding assistant experiments"
  - "efficient agentic workflow tests"
  - "open-model deployment research"
avoid_when: 
  - "enterprise case proof is required now"
  - "pricing/API terms are mandatory"
  - "model lineage cannot tolerate pending fields"
source_links: 
  - type: "official_site"
    url: "https://mimo.xiaomi.com/"
  - type: "mimo_v2_pro"
    url: "https://mimo.xiaomi.com/mimo-v2-pro"
  - type: "github_org"
    url: "https://github.com/XiaomiMiMo"
  - type: "mimo_v2_flash"
    url: "https://github.com/xiaomimimo/MiMo-V2-Flash"
page_status: "review"
last_reviewed_at: "2026-06-25"
owner: "pending"
```

## 相关链接

- official_site: [https://mimo.xiaomi.com/](https://mimo.xiaomi.com/)
- mimo_v2_pro: [https://mimo.xiaomi.com/mimo-v2-pro](https://mimo.xiaomi.com/mimo-v2-pro)
- github_org: [https://github.com/XiaomiMiMo](https://github.com/XiaomiMiMo)
- mimo_v2_flash: [https://github.com/xiaomimimo/MiMo-V2-Flash](https://github.com/xiaomimimo/MiMo-V2-Flash)

# StepFun / Step Model Atlas

> 页面类型：厂商页 2.0  
> 页面路径建议：`/vendors/stepfun`  
> page_status：`review`  
> case_library_status：`platform_only`

## 30 秒判断

StepFun 是 Step 系列多模态 reasoning、coding 和高效率 MoE 模型厂商，厂商页要把 Step3、Step 3.5 Flash、Step 3.7 Flash 串成一条效率导向路线。

## 模型路线

StepFun 路线包括 Step3 multimodal reasoning、Step 3.5 Flash open-source/efficient branch、Step 3.7 Flash API branch 和开放平台。Phase 2 先建立厂商页，不升级 6 张旧卡。

| 模型家族 | 定位 | 代表模型 |
|---|---|---|
| Step 3 | multimodal reasoning MoE model | `step-3` |
| Step Flash | efficient reasoning/coding/agentic models | `step-3-5-flash`, `step-3-7-flash` |
| StepFun Platform | API and model experience center | `step-api` |

## 模型时间线

| 日期 | 模型 / 节点 | 事件 | 证据 |
|---|---|---|---|
| 2025 | `step-3` | Step3 GitHub introduces multimodal reasoning MoE model with 321B total / 38B active parameters | [source](https://github.com/stepfun-ai/Step3) (high) |
| 2026 | `step-3-5-flash` | Step 3.5 Flash GitHub positions model as efficient agentic intelligence | [source](https://github.com/stepfun-ai/Step-3.5-Flash) (high) |
| 2026 | `step-3-7-flash` | StepFun docs note Step 3.7 Flash is live for Agent / Coding / multimodal workflows | [source](https://platform.stepfun.ai/docs/en/api-reference/models/object) (medium) |

## 关键拐点

### Step3 establishes hardware-aware multimodal reasoning

- 相关模型：`step-3`
- 判断：Step3 should anchor StepFun's technical lineage.

### Step 3.5 Flash shifts emphasis to efficient agentic workflows

- 相关模型：`step-3-5-flash`
- 判断：Flash variants need their own IDs and pricing/deployment notes.

### Step 3.7 Flash becomes current platform signal

- 相关模型：`step-3-7-flash`
- 判断：Docs show StepFun moving from paper/repo to API distribution.

### Open platform gives developer access

- 相关模型：`step-api`
- 判断：Platform availability belongs in ecosystem, not model capability proof.

## 当前代表模型

| 模型 ID | 优先级 | 处理建议 |
|---|---|---|
| `step-3-7-flash` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `step-3-5-flash` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `step-3` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |

## 适合使用场景

- efficient multimodal reasoning tests
- agentic coding model comparison
- open model deployment evaluation
- StepFun API prototyping

## 不适合使用场景

- A-class production cases are required immediately
- version mapping between Step3/3.5/3.7 is unresolved
- media model claims lack source snapshots

## 案例库状态

`platform_only`。本阶段只生成厂商页导航骨架，不把官方发布、benchmark、教程或集合页包装成 A 类案例。后续如果进入模型卡升级，必须先按 `evidence-intake-table-schema.md` 建证据行，并按 `evidence-snapshot-policy.md` 保存快照。

## 风险和限制

- Decimal versions must map to stable slugs.
- Papers and repos are strong sources but not user cases.
- Step 3.7 Flash status needs current docs snapshot.

## 数据字段

```yaml
vendor_id: "stepfun"
vendor_name: "StepFun"
display_name: "StepFun / Step"
canonical_slug: "stepfun"
official_site: "https://platform.stepfun.ai/"
model_families: 
  - family_id: "step-3"
    display_name: "Step 3"
    positioning: "multimodal reasoning MoE model"
    representative_models: 
      - "step-3"
  - family_id: "step-flash"
    display_name: "Step Flash"
    positioning: "efficient reasoning/coding/agentic models"
    representative_models: 
      - "step-3-5-flash"
      - "step-3-7-flash"
  - family_id: "step-platform"
    display_name: "StepFun Platform"
    positioning: "API and model experience center"
    representative_models: 
      - "step-api"
flagship_models: 
  - "step-3-7-flash"
  - "step-3-5-flash"
  - "step-3"
timeline: 
  - date: "2025"
    model_id: "step-3"
    event: "Step3 GitHub introduces multimodal reasoning MoE model with 321B total / 38B active parameters"
    source_url: "https://github.com/stepfun-ai/Step3"
    confidence: "high"
  - date: "2026"
    model_id: "step-3-5-flash"
    event: "Step 3.5 Flash GitHub positions model as efficient agentic intelligence"
    source_url: "https://github.com/stepfun-ai/Step-3.5-Flash"
    confidence: "high"
  - date: "2026"
    model_id: "step-3-7-flash"
    event: "StepFun docs note Step 3.7 Flash is live for Agent / Coding / multimodal workflows"
    source_url: "https://platform.stepfun.ai/docs/en/api-reference/models/object"
    confidence: "medium"
key_inflection_points: 
  - title: "Step3 establishes hardware-aware multimodal reasoning"
    model_ids: 
      - "step-3"
    summary: "Step3 should anchor StepFun's technical lineage."
  - title: "Step 3.5 Flash shifts emphasis to efficient agentic workflows"
    model_ids: 
      - "step-3-5-flash"
    summary: "Flash variants need their own IDs and pricing/deployment notes."
  - title: "Step 3.7 Flash becomes current platform signal"
    model_ids: 
      - "step-3-7-flash"
    summary: "Docs show StepFun moving from paper/repo to API distribution."
  - title: "Open platform gives developer access"
    model_ids: 
      - "step-api"
    summary: "Platform availability belongs in ecosystem, not model capability proof."
strengths: 
  - "efficient MoE reasoning"
  - "multimodal model-system co-design"
  - "open GitHub/Hugging Face releases"
  - "developer platform with OpenAI-style examples"
weaknesses: 
  - "model naming and decimal versions require slug normalization"
  - "case evidence not yet normalized"
  - "some claims live in repos/papers rather than product docs"
  - "pricing needs current source review"
pricing_strategy: "API pricing should be captured from StepFun docs/pricing when model cards are upgraded; open releases require separate hosting cost notes."
ecosystem: 
  - name: "StepFun Platform"
    type: "first_party_api"
    url: "https://platform.stepfun.ai/"
  - name: "StepFun docs"
    type: "docs"
    url: "https://platform.stepfun.ai/docs/en/quickstart/overview"
  - name: "Step3 GitHub"
    type: "github"
    url: "https://github.com/stepfun-ai/Step3"
  - name: "Step 3.5 Flash GitHub"
    type: "github"
    url: "https://github.com/stepfun-ai/Step-3.5-Flash"
case_library_status: "platform_only"
recommended_use_cases: 
  - "efficient multimodal reasoning tests"
  - "agentic coding model comparison"
  - "open model deployment evaluation"
  - "StepFun API prototyping"
avoid_when: 
  - "A-class production cases are required immediately"
  - "version mapping between Step3/3.5/3.7 is unresolved"
  - "media model claims lack source snapshots"
source_links: 
  - type: "official_platform"
    url: "https://platform.stepfun.ai/"
  - type: "quickstart"
    url: "https://platform.stepfun.ai/docs/en/quickstart/overview"
  - type: "model_object"
    url: "https://platform.stepfun.ai/docs/en/api-reference/models/object"
  - type: "step3_github"
    url: "https://github.com/stepfun-ai/Step3"
page_status: "review"
last_reviewed_at: "2026-06-25"
owner: "pending"
```

## 相关链接

- official_platform: [https://platform.stepfun.ai/](https://platform.stepfun.ai/)
- quickstart: [https://platform.stepfun.ai/docs/en/quickstart/overview](https://platform.stepfun.ai/docs/en/quickstart/overview)
- model_object: [https://platform.stepfun.ai/docs/en/api-reference/models/object](https://platform.stepfun.ai/docs/en/api-reference/models/object)
- step3_github: [https://github.com/stepfun-ai/Step3](https://github.com/stepfun-ai/Step3)

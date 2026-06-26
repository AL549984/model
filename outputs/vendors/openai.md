# OpenAI Model Atlas

> 页面类型：厂商页 2.0  
> 页面路径建议：`/vendors/openai`  
> page_status：`review`  
> case_library_status：`platform_only`

## 30 秒判断

OpenAI 是闭源前沿模型、API 平台和 agentic coding 产品化的主轴厂商，厂商页应重点解释 GPT / o-series / Codex 的关系，而不是把所有 GPT 版本平铺。

## 模型路线

OpenAI 路线可以分成 GPT 通用旗舰、o-series 推理线、Codex 代码代理线和 open-weight / edge 试验线。Model Atlas 2.0 应把 GPT-5.x 作为主线，把 Codex 作为开发者工作流分支，把小模型和 open-weight 放在成本/部署分支。

| 模型家族 | 定位 | 代表模型 |
|---|---|---|
| GPT-5 family | general frontier models for coding, reasoning, agentic tasks | `gpt-5-5`, `gpt-5-high`, `gpt-5-4-mini`, `gpt-5-4-nano` |
| o-series | reasoning-first family for deliberate problem solving | `o3`, `o4-mini` |
| Codex | coding-agent and software engineering workflow line | `gpt-5-codex` |
| gpt-oss | open-weight / local deployment experiments | `gpt-oss-120b`, `gpt-oss-20b` |

## 模型时间线

| 日期 | 模型 / 节点 | 事件 | 证据 |
|---|---|---|---|
| 2026-04 | `gpt-5-5` | GPT-5.5 becomes the current high-end reasoning/coding reference in OpenAI API docs | [source](https://developers.openai.com/api/docs/models) (high) |
| 2026-06 | `gpt-5-cyber` | OpenAI continues specialized GPT-5.5-class model branches for vetted cybersecurity use | [source](https://openai.com/api/) (medium) |
| 2025-2026 | `gpt-5` | GPT-5 line becomes the migration target from older OpenAI models | [source](https://openai.com/api/) (high) |

## 关键拐点

### GPT-5 becomes the baseline frontier family

- 相关模型：`gpt-5`, `gpt-5-5`
- 判断：OpenAI's platform docs place GPT-5.x at the center of complex reasoning, coding and professional work.

### Codex separates coding-agent product surface from general chat

- 相关模型：`gpt-5-codex`
- 判断：For Model Atlas, Codex should be tracked as a workflow model line, not only as another GPT variant.

### Reasoning effort becomes a first-class variant axis

- 相关模型：`gpt-5-high`, `gpt-5-5-xhigh`
- 判断：high/xhigh should be encoded as variant IDs or model pages following Phase 1.5 lineage rules.

### Open-weight models create a deployment branch

- 相关模型：`gpt-oss-120b`, `gpt-oss-20b`
- 判断：They should be separated from hosted frontier GPT models because deployment, pricing and risk are different.

## 当前代表模型

| 模型 ID | 优先级 | 处理建议 |
|---|---|---|
| `gpt-5-5` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `gpt-5-codex` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `gpt-5-high` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `o3` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |

## 适合使用场景

- agentic coding and code review
- professional reasoning workflows
- tool-using assistants
- high-value product prototyping

## 不适合使用场景

- workloads requiring open weights by default
- strictly fixed model behavior across long periods
- low-cost bulk generation without quality requirements
- regulated tasks without policy review

## 案例库状态

`platform_only`。本阶段只生成厂商页导航骨架，不把官方发布、benchmark、教程或集合页包装成 A 类案例。后续如果进入模型卡升级，必须先按 `evidence-intake-table-schema.md` 建证据行，并按 `evidence-snapshot-policy.md` 保存快照。

## 风险和限制

- Model and pricing churn requires frequent source review.
- Do not infer GPT-5.5 behavior from older GPT-5 cards.
- Specialized models such as cyber variants may have access restrictions.

## 数据字段

```yaml
vendor_id: "openai"
vendor_name: "OpenAI, L.L.C."
display_name: "OpenAI"
canonical_slug: "openai"
official_site: "https://openai.com/"
model_families: 
  - family_id: "gpt-5"
    display_name: "GPT-5 family"
    positioning: "general frontier models for coding, reasoning, agentic tasks"
    representative_models: 
      - "gpt-5-5"
      - "gpt-5-high"
      - "gpt-5-4-mini"
      - "gpt-5-4-nano"
  - family_id: "openai-o-series"
    display_name: "o-series"
    positioning: "reasoning-first family for deliberate problem solving"
    representative_models: 
      - "o3"
      - "o4-mini"
  - family_id: "openai-codex"
    display_name: "Codex"
    positioning: "coding-agent and software engineering workflow line"
    representative_models: 
      - "gpt-5-codex"
  - family_id: "gpt-oss"
    display_name: "gpt-oss"
    positioning: "open-weight / local deployment experiments"
    representative_models: 
      - "gpt-oss-120b"
      - "gpt-oss-20b"
flagship_models: 
  - "gpt-5-5"
  - "gpt-5-codex"
  - "gpt-5-high"
  - "o3"
timeline: 
  - date: "2026-04"
    model_id: "gpt-5-5"
    event: "GPT-5.5 becomes the current high-end reasoning/coding reference in OpenAI API docs"
    source_url: "https://developers.openai.com/api/docs/models"
    confidence: "high"
  - date: "2026-06"
    model_id: "gpt-5-cyber"
    event: "OpenAI continues specialized GPT-5.5-class model branches for vetted cybersecurity use"
    source_url: "https://openai.com/api/"
    confidence: "medium"
  - date: "2025-2026"
    model_id: "gpt-5"
    event: "GPT-5 line becomes the migration target from older OpenAI models"
    source_url: "https://openai.com/api/"
    confidence: "high"
key_inflection_points: 
  - title: "GPT-5 becomes the baseline frontier family"
    model_ids: 
      - "gpt-5"
      - "gpt-5-5"
    summary: "OpenAI's platform docs place GPT-5.x at the center of complex reasoning, coding and professional work."
  - title: "Codex separates coding-agent product surface from general chat"
    model_ids: 
      - "gpt-5-codex"
    summary: "For Model Atlas, Codex should be tracked as a workflow model line, not only as another GPT variant."
  - title: "Reasoning effort becomes a first-class variant axis"
    model_ids: 
      - "gpt-5-high"
      - "gpt-5-5-xhigh"
    summary: "high/xhigh should be encoded as variant IDs or model pages following Phase 1.5 lineage rules."
  - title: "Open-weight models create a deployment branch"
    model_ids: 
      - "gpt-oss-120b"
      - "gpt-oss-20b"
    summary: "They should be separated from hosted frontier GPT models because deployment, pricing and risk are different."
strengths: 
  - "frontier coding and agentic task performance"
  - "mature API ecosystem and tooling"
  - "strong developer mindshare"
  - "broad product integration surface"
weaknesses: 
  - "closed model internals"
  - "pricing and availability can shift by tier"
  - "model naming and variants can be confusing"
  - "high-risk domains need tighter policy review"
pricing_strategy: "Premium API pricing with model-tier differentiation. GPT-5.x should be tracked separately from mini/nano, Codex, and open-weight models because cost, latency, context and deployment assumptions differ."
ecosystem: 
  - name: "OpenAI API"
    type: "first_party_api"
    url: "https://openai.com/api/"
  - name: "OpenAI API docs"
    type: "docs"
    url: "https://developers.openai.com/api/docs/models"
  - name: "ChatGPT"
    type: "consumer_product"
    url: "https://chatgpt.com/"
  - name: "Codex"
    type: "developer_tool"
    url: "https://openai.com/codex/"
case_library_status: "platform_only"
recommended_use_cases: 
  - "agentic coding and code review"
  - "professional reasoning workflows"
  - "tool-using assistants"
  - "high-value product prototyping"
avoid_when: 
  - "workloads requiring open weights by default"
  - "strictly fixed model behavior across long periods"
  - "low-cost bulk generation without quality requirements"
  - "regulated tasks without policy review"
source_links: 
  - type: "official_site"
    url: "https://openai.com/"
  - type: "api"
    url: "https://openai.com/api/"
  - type: "models_docs"
    url: "https://developers.openai.com/api/docs/models"
  - type: "model_page"
    url: "https://openai.com/gpt-5/"
page_status: "review"
last_reviewed_at: "2026-06-25"
owner: "pending"
```

## 相关链接

- official_site: [https://openai.com/](https://openai.com/)
- api: [https://openai.com/api/](https://openai.com/api/)
- models_docs: [https://developers.openai.com/api/docs/models](https://developers.openai.com/api/docs/models)
- model_page: [https://openai.com/gpt-5/](https://openai.com/gpt-5/)

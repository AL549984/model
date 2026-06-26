# Upstage / Solar Model Atlas

> 页面类型：厂商页 2.0  
> 页面路径建议：`/vendors/upstage`  
> page_status：`limited`  
> case_library_status：`platform_only`

## 30 秒判断

Upstage 是 Solar LLM 和 Document AI 工作流厂商，厂商页重点在小而强的 Solar 模型、文档处理和企业工作流。

## 模型路线

Upstage 路线包括 Solar LLM、Solar Pro/Preview、Document AI、Document Parse 和 API/Studio。Wiki 中 Solar 子卡少，Phase 2 页面应标为 limited/review，避免夸大。

| 模型家族 | 定位 | 代表模型 |
|---|---|---|
| Solar | LLM family for enterprise work | `solar-pro`, `solar-pro-preview` |
| Document AI | document parsing and workflow models | `document-parse` |

## 模型时间线

| 日期 | 模型 / 节点 | 事件 | 证据 |
|---|---|---|---|
| 2024-02-22 | `solar-api` | Upstage announces Solar API beta | [source](https://www.upstage.ai/news/solar-api-beta) (high) |
| 2026 | `upstage-platform` | Upstage site positions LLMs and document processing for future-of-work workflows | [source](https://www.upstage.ai/) (high) |
| 2026 | `upstage-pricing` | Upstage API pricing page covers Solar Pro and Document Parse support programs | [source](https://www.upstage.ai/pricing/api) (medium) |

## 关键拐点

### Solar API makes Upstage accessible to developers

- 相关模型：`solar-api`
- 判断：Solar API beta is the natural timeline anchor for older Solar cards.

### Document AI differentiates Upstage from pure LLM vendors

- 相关模型：`document-parse`
- 判断：Vendor page should emphasize document workflow cases.

### Solar Pro Preview introduces open/evaluation branch

- 相关模型：`solar-pro-preview`
- 判断：Open or preview models need separate status and source review.

### Enterprise workflow positioning dominates

- 相关模型：`solar-pro`
- 判断：Cases should focus on document automation rather than generic chat demos.

## 当前代表模型

| 模型 ID | 优先级 | 处理建议 |
|---|---|---|
| `solar-pro` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `solar-pro-preview` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `document-parse` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |

## 适合使用场景

- document parsing and enterprise workflows
- Solar LLM experiments
- Korean/enterprise document use cases
- workflow automation pilots

## 不适合使用场景

- frontier coding benchmark comparison is the primary goal
- A-class cases are required immediately
- model list cannot be verified from current docs

## 案例库状态

`platform_only`。本阶段只生成厂商页导航骨架，不把官方发布、benchmark、教程或集合页包装成 A 类案例。后续如果进入模型卡升级，必须先按 `evidence-intake-table-schema.md` 建证据行，并按 `evidence-snapshot-policy.md` 保存快照。

## 风险和限制

- Document AI examples must not be treated as LLM cases.
- Cookbook examples are tutorials unless they have concrete artifacts.
- Current Solar model names need manual source verification.

## 数据字段

```yaml
vendor_id: "upstage"
vendor_name: "Upstage AI"
display_name: "Upstage / Solar"
canonical_slug: "upstage"
official_site: "https://www.upstage.ai/"
model_families: 
  - family_id: "solar"
    display_name: "Solar"
    positioning: "LLM family for enterprise work"
    representative_models: 
      - "solar-pro"
      - "solar-pro-preview"
  - family_id: "upstage-document-ai"
    display_name: "Document AI"
    positioning: "document parsing and workflow models"
    representative_models: 
      - "document-parse"
flagship_models: 
  - "solar-pro"
  - "solar-pro-preview"
  - "document-parse"
timeline: 
  - date: "2024-02-22"
    model_id: "solar-api"
    event: "Upstage announces Solar API beta"
    source_url: "https://www.upstage.ai/news/solar-api-beta"
    confidence: "high"
  - date: "2026"
    model_id: "upstage-platform"
    event: "Upstage site positions LLMs and document processing for future-of-work workflows"
    source_url: "https://www.upstage.ai/"
    confidence: "high"
  - date: "2026"
    model_id: "upstage-pricing"
    event: "Upstage API pricing page covers Solar Pro and Document Parse support programs"
    source_url: "https://www.upstage.ai/pricing/api"
    confidence: "medium"
key_inflection_points: 
  - title: "Solar API makes Upstage accessible to developers"
    model_ids: 
      - "solar-api"
    summary: "Solar API beta is the natural timeline anchor for older Solar cards."
  - title: "Document AI differentiates Upstage from pure LLM vendors"
    model_ids: 
      - "document-parse"
    summary: "Vendor page should emphasize document workflow cases."
  - title: "Solar Pro Preview introduces open/evaluation branch"
    model_ids: 
      - "solar-pro-preview"
    summary: "Open or preview models need separate status and source review."
  - title: "Enterprise workflow positioning dominates"
    model_ids: 
      - "solar-pro"
    summary: "Cases should focus on document automation rather than generic chat demos."
strengths: 
  - "document AI focus"
  - "enterprise workflow framing"
  - "Solar LLM brand"
  - "pricing and support programs for institutions"
weaknesses: 
  - "fewer frontier model nodes in Wiki"
  - "case library not yet built"
  - "model naming less visible globally"
  - "needs source review for current model list"
pricing_strategy: "API and enterprise pricing should reference Upstage pricing page. Document AI and LLM pricing must stay separate."
ecosystem: 
  - name: "Upstage official site"
    type: "official_site"
    url: "https://www.upstage.ai/"
  - name: "Upstage Console"
    type: "developer_console"
    url: "https://console.upstage.ai/"
  - name: "Upstage pricing"
    type: "pricing"
    url: "https://www.upstage.ai/pricing/api"
  - name: "Upstage cookbook"
    type: "github"
    url: "https://github.com/UpstageAI/cookbook"
case_library_status: "platform_only"
recommended_use_cases: 
  - "document parsing and enterprise workflows"
  - "Solar LLM experiments"
  - "Korean/enterprise document use cases"
  - "workflow automation pilots"
avoid_when: 
  - "frontier coding benchmark comparison is the primary goal"
  - "A-class cases are required immediately"
  - "model list cannot be verified from current docs"
source_links: 
  - type: "official_site"
    url: "https://www.upstage.ai/"
  - type: "solar_api_beta"
    url: "https://www.upstage.ai/news/solar-api-beta"
  - type: "pricing"
    url: "https://www.upstage.ai/pricing/api"
  - type: "cookbook"
    url: "https://github.com/UpstageAI/cookbook"
page_status: "limited"
last_reviewed_at: "2026-06-25"
owner: "pending"
```

## 相关链接

- official_site: [https://www.upstage.ai/](https://www.upstage.ai/)
- solar_api_beta: [https://www.upstage.ai/news/solar-api-beta](https://www.upstage.ai/news/solar-api-beta)
- pricing: [https://www.upstage.ai/pricing/api](https://www.upstage.ai/pricing/api)
- cookbook: [https://github.com/UpstageAI/cookbook](https://github.com/UpstageAI/cookbook)

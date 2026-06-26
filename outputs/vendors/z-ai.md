# Z AI / GLM Model Atlas

> 页面类型：厂商页 2.0  
> 页面路径建议：`/vendors/z-ai`  
> page_status：`review`  
> case_library_status：`platform_only`

## 30 秒判断

Z AI 是 GLM 系列厂商，当前叙事集中在 reasoning、coding 和 agent-oriented GLM 模型。

## 模型路线

Z AI 路线包括 GLM-4.5 agent foundation models、GLM-5 / GLM-5.2 coding and agentic engineering 线，以及 API/Claude Code compatibility 场景。厂商页先固定 GLM 家族和风险。

| 模型家族 | 定位 | 代表模型 |
|---|---|---|
| GLM-4.5 | agent-oriented foundation model family | `glm-4-5`, `glm-4-5-air` |
| GLM-5 | vibe coding to agentic engineering family | `glm-5`, `glm-5-2` |
| Z.AI API | API and developer integration surface | `glm-5-2` |

## 模型时间线

| 日期 | 模型 / 节点 | 事件 | 证据 |
|---|---|---|---|
| 2025 | `glm-4-5` | GLM-4.5 docs describe agent-oriented MoE foundation models | [source](https://docs.z.ai/guides/llm/glm-4.5) (high) |
| 2026 | `glm-5` | Z.AI blog frames GLM-5 from vibe coding to agentic engineering | [source](https://z.ai/blog/glm-5) (high) |
| 2026 | `glm-5-2` | Z.AI docs list GLM-5.2 as coding model with 1M context and reasoning_effort | [source](https://docs.z.ai/guides/overview/quick-start) (high) |

## 关键拐点

### GLM-4.5 defines agent-oriented foundation positioning

- 相关模型：`glm-4-5`
- 判断：Use this as the older GLM anchor in the vendor timeline.

### GLM-5 moves from vibe coding to agentic engineering

- 相关模型：`glm-5`
- 判断：Z AI should be tracked as a coding/agent vendor, not only general chat.

### GLM-5.2 adds long context and reasoning_effort

- 相关模型：`glm-5-2`
- 判断：reasoning_effort needs variant/parameter handling consistent with OpenAI/Gemini pages.

### Developer compatibility broadens adoption

- 相关模型：`glm-api`
- 判断：API compatibility is an ecosystem signal, not a real case.

## 当前代表模型

| 模型 ID | 优先级 | 处理建议 |
|---|---|---|
| `glm-5-2` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `glm-5` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `glm-4-5` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `glm-4-5-air` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |

## 适合使用场景

- agent-oriented coding evaluation
- long-context coding tasks
- open GLM model experiments
- Claude Code compatible workflow testing

## 不适合使用场景

- brand/model mapping is unresolved
- only benchmark claims are available
- enterprise production evidence is required immediately

## 案例库状态

`platform_only`。本阶段只生成厂商页导航骨架，不把官方发布、benchmark、教程或集合页包装成 A 类案例。后续如果进入模型卡升级，必须先按 `evidence-intake-table-schema.md` 建证据行，并按 `evidence-snapshot-policy.md` 保存快照。

## 风险和限制

- GLM naming needs stable canonical IDs.
- Do not turn docs/tutorials into A-class cases.
- Claude-compatible usage requires separate evidence rows.

## 数据字段

```yaml
vendor_id: "z-ai"
vendor_name: "Z.AI"
display_name: "Z AI / GLM"
canonical_slug: "z-ai"
official_site: "https://z.ai/"
model_families: 
  - family_id: "glm-4-5"
    display_name: "GLM-4.5"
    positioning: "agent-oriented foundation model family"
    representative_models: 
      - "glm-4-5"
      - "glm-4-5-air"
  - family_id: "glm-5"
    display_name: "GLM-5"
    positioning: "vibe coding to agentic engineering family"
    representative_models: 
      - "glm-5"
      - "glm-5-2"
  - family_id: "glm-api"
    display_name: "Z.AI API"
    positioning: "API and developer integration surface"
    representative_models: 
      - "glm-5-2"
flagship_models: 
  - "glm-5-2"
  - "glm-5"
  - "glm-4-5"
  - "glm-4-5-air"
timeline: 
  - date: "2025"
    model_id: "glm-4-5"
    event: "GLM-4.5 docs describe agent-oriented MoE foundation models"
    source_url: "https://docs.z.ai/guides/llm/glm-4.5"
    confidence: "high"
  - date: "2026"
    model_id: "glm-5"
    event: "Z.AI blog frames GLM-5 from vibe coding to agentic engineering"
    source_url: "https://z.ai/blog/glm-5"
    confidence: "high"
  - date: "2026"
    model_id: "glm-5-2"
    event: "Z.AI docs list GLM-5.2 as coding model with 1M context and reasoning_effort"
    source_url: "https://docs.z.ai/guides/overview/quick-start"
    confidence: "high"
key_inflection_points: 
  - title: "GLM-4.5 defines agent-oriented foundation positioning"
    model_ids: 
      - "glm-4-5"
    summary: "Use this as the older GLM anchor in the vendor timeline."
  - title: "GLM-5 moves from vibe coding to agentic engineering"
    model_ids: 
      - "glm-5"
    summary: "Z AI should be tracked as a coding/agent vendor, not only general chat."
  - title: "GLM-5.2 adds long context and reasoning_effort"
    model_ids: 
      - "glm-5-2"
    summary: "reasoning_effort needs variant/parameter handling consistent with OpenAI/Gemini pages."
  - title: "Developer compatibility broadens adoption"
    model_ids: 
      - "glm-api"
    summary: "API compatibility is an ecosystem signal, not a real case."
strengths: 
  - "agent-oriented model positioning"
  - "coding workflow focus"
  - "open GitHub model releases for GLM-4.5"
  - "long-context and reasoning_effort docs"
weaknesses: 
  - "brand transition from Zhipu/GLM/Z AI can confuse mapping"
  - "case evidence not yet normalized"
  - "pricing and regional availability need review"
  - "some claims appear in developer docs rather than independent cases"
pricing_strategy: "API pricing should be tied to Z.AI docs/model pages; open-source GLM branches need separate hosting cost assumptions."
ecosystem: 
  - name: "Z.AI docs"
    type: "docs"
    url: "https://docs.z.ai/guides/overview/quick-start"
  - name: "GLM-4.5 docs"
    type: "docs"
    url: "https://docs.z.ai/guides/llm/glm-4.5"
  - name: "Z.AI blog"
    type: "blog"
    url: "https://z.ai/blog/glm-5"
  - name: "zai-org GitHub"
    type: "github"
    url: "https://github.com/zai-org/GLM-4.5"
case_library_status: "platform_only"
recommended_use_cases: 
  - "agent-oriented coding evaluation"
  - "long-context coding tasks"
  - "open GLM model experiments"
  - "Claude Code compatible workflow testing"
avoid_when: 
  - "brand/model mapping is unresolved"
  - "only benchmark claims are available"
  - "enterprise production evidence is required immediately"
source_links: 
  - type: "official_site"
    url: "https://z.ai/"
  - type: "docs"
    url: "https://docs.z.ai/guides/overview/quick-start"
  - type: "glm_4_5_docs"
    url: "https://docs.z.ai/guides/llm/glm-4.5"
  - type: "glm_5_blog"
    url: "https://z.ai/blog/glm-5"
page_status: "review"
last_reviewed_at: "2026-06-25"
owner: "pending"
```

## 相关链接

- official_site: [https://z.ai/](https://z.ai/)
- docs: [https://docs.z.ai/guides/overview/quick-start](https://docs.z.ai/guides/overview/quick-start)
- glm_4_5_docs: [https://docs.z.ai/guides/llm/glm-4.5](https://docs.z.ai/guides/llm/glm-4.5)
- glm_5_blog: [https://z.ai/blog/glm-5](https://z.ai/blog/glm-5)

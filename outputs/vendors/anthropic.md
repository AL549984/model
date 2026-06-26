# Anthropic / Claude Model Atlas

> 页面类型：厂商页 2.0  
> 页面路径建议：`/vendors/anthropic`  
> page_status：`publishable`  
> case_library_status：`usable`

## 30 秒判断

Anthropic 是 Claude 系列的安全优先、长上下文和长周期 agentic work 厂商，Phase 2 直接继承 Phase 1/1.5 的 Anthropic 样板。

## 模型路线

Claude 路线从 Claude 3/3.5 的通用与编码能力，演进到 Claude 4/Opus 4.x，再到 Claude Fable 5 / Mythos 5 的 Mythos-class 分层。厂商页要明确 Fable 公开可用、Mythos 受限可用，以及 safety/fallback/data retention 对工程集成的影响。

| 模型家族 | 定位 | 代表模型 |
|---|---|---|
| Claude 3 / 3.5 | earlier multimodal and coding-capable Claude family | `claude-3-opus`, `claude-3-5-sonnet`, `claude-3-7-sonnet` |
| Claude 4 / Opus 4.x | advanced reasoning and coding generation before Mythos-class | `claude-opus-4-8` |
| Claude 5 / Mythos-class | long-horizon reasoning and agentic work | `claude-fable-5`, `claude-mythos-5` |

## 模型时间线

| 日期 | 模型 / 节点 | 事件 | 证据 |
|---|---|---|---|
| 2026-06-09 | `claude-fable-5` | Claude Fable 5 and Claude Mythos 5 announced | [source](https://www.anthropic.com/news/claude-fable-5-mythos-5) (high) |
| 2026-06-09 | `claude-fable-5` | Claude API docs list Fable 5 model ID, context, output, pricing and retention | [source](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5) (high) |
| 2026-06-12 | `claude-fable-5` | GitHub Copilot changelog notes access / policy update | [source](https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/) (medium) |

## 关键拐点

### Claude 3.7 makes extended thinking mainstream

- 相关模型：`claude-3-7-sonnet`
- 判断：The older cards position Claude 3.7 as a bridge from chat to thinking-integrated coding and agent work.

### Opus 4.x becomes the immediate pre-Fable comparison line

- 相关模型：`claude-opus-4-8`
- 判断：Use it as a baseline for cost, risk and capability comparison.

### Fable 5 brings Mythos-class capability to broad release

- 相关模型：`claude-fable-5`
- 判断：Fable 5 is the current Model Atlas sample for long-horizon agentic work.

### Safety/fallback becomes part of the product contract

- 相关模型：`claude-fable-5`, `claude-mythos-5`
- 判断：Refusal, fallback and retention must be visible in model and vendor pages.

## 当前代表模型

| 模型 ID | 优先级 | 处理建议 |
|---|---|---|
| `claude-fable-5` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `claude-mythos-5` | P0 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `claude-opus-4-8` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |
| `claude-3-7-sonnet` | P1 | 后续 Phase 3 候选；先按最低发布门槛补证 |

## 适合使用场景

- long-horizon coding
- document-heavy research
- codebase understanding
- high-value prototypes requiring long context

## 不适合使用场景

- strict zero-retention requirements unless availability is confirmed
- bulk low-cost generation
- workflows that cannot handle refusals or fallback
- unclear policy-sensitive use cases

## 案例库状态

`usable`。本阶段只生成厂商页导航骨架，不把官方发布、benchmark、教程或集合页包装成 A 类案例。后续如果进入模型卡升级，必须先按 `evidence-intake-table-schema.md` 建证据行，并按 `evidence-snapshot-policy.md` 保存快照。

## 风险和限制

- Availability status can change by platform.
- A-class cases skew toward developer demos, not enterprise production.
- Duplicate Claude Wiki branches must be mapped, not deleted.

## 数据字段

```yaml
vendor_id: "anthropic"
vendor_name: "Anthropic PBC"
display_name: "Anthropic / Claude"
canonical_slug: "anthropic"
official_site: "https://www.anthropic.com/"
model_families: 
  - family_id: "claude-3"
    display_name: "Claude 3 / 3.5"
    positioning: "earlier multimodal and coding-capable Claude family"
    representative_models: 
      - "claude-3-opus"
      - "claude-3-5-sonnet"
      - "claude-3-7-sonnet"
  - family_id: "claude-4"
    display_name: "Claude 4 / Opus 4.x"
    positioning: "advanced reasoning and coding generation before Mythos-class"
    representative_models: 
      - "claude-opus-4-8"
  - family_id: "claude-5-mythos"
    display_name: "Claude 5 / Mythos-class"
    positioning: "long-horizon reasoning and agentic work"
    representative_models: 
      - "claude-fable-5"
      - "claude-mythos-5"
flagship_models: 
  - "claude-fable-5"
  - "claude-mythos-5"
  - "claude-opus-4-8"
  - "claude-3-7-sonnet"
timeline: 
  - date: "2026-06-09"
    model_id: "claude-fable-5"
    event: "Claude Fable 5 and Claude Mythos 5 announced"
    source_url: "https://www.anthropic.com/news/claude-fable-5-mythos-5"
    confidence: "high"
  - date: "2026-06-09"
    model_id: "claude-fable-5"
    event: "Claude API docs list Fable 5 model ID, context, output, pricing and retention"
    source_url: "https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5"
    confidence: "high"
  - date: "2026-06-12"
    model_id: "claude-fable-5"
    event: "GitHub Copilot changelog notes access / policy update"
    source_url: "https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/"
    confidence: "medium"
key_inflection_points: 
  - title: "Claude 3.7 makes extended thinking mainstream"
    model_ids: 
      - "claude-3-7-sonnet"
    summary: "The older cards position Claude 3.7 as a bridge from chat to thinking-integrated coding and agent work."
  - title: "Opus 4.x becomes the immediate pre-Fable comparison line"
    model_ids: 
      - "claude-opus-4-8"
    summary: "Use it as a baseline for cost, risk and capability comparison."
  - title: "Fable 5 brings Mythos-class capability to broad release"
    model_ids: 
      - "claude-fable-5"
    summary: "Fable 5 is the current Model Atlas sample for long-horizon agentic work."
  - title: "Safety/fallback becomes part of the product contract"
    model_ids: 
      - "claude-fable-5"
      - "claude-mythos-5"
    summary: "Refusal, fallback and retention must be visible in model and vendor pages."
strengths: 
  - "long-context document and codebase work"
  - "agentic coding and autonomous task execution"
  - "clear safety positioning"
  - "strong cloud/platform distribution"
weaknesses: 
  - "premium price tier"
  - "retention and ZDR constraints for Fable 5"
  - "safety classifier and fallback can change outputs"
  - "public enterprise A-class cases still need补证"
pricing_strategy: "Premium frontier pricing. Fable 5 API docs list $10/M input and $50/M output; vendor page should keep pricing tied to source links and review date."
ecosystem: 
  - name: "Claude API"
    type: "first_party_api"
    url: "https://platform.claude.com/"
  - name: "Claude docs"
    type: "docs"
    url: "https://platform.claude.com/docs/"
  - name: "Amazon Bedrock"
    type: "cloud_platform"
    url: "https://aws.amazon.com/bedrock/"
  - name: "Google Vertex AI"
    type: "cloud_platform"
    url: "https://cloud.google.com/vertex-ai"
  - name: "Microsoft Foundry"
    type: "cloud_platform"
    url: "https://ai.azure.com/"
case_library_status: "usable"
recommended_use_cases: 
  - "long-horizon coding"
  - "document-heavy research"
  - "codebase understanding"
  - "high-value prototypes requiring long context"
avoid_when: 
  - "strict zero-retention requirements unless availability is confirmed"
  - "bulk low-cost generation"
  - "workflows that cannot handle refusals or fallback"
  - "unclear policy-sensitive use cases"
source_links: 
  - type: "official_site"
    url: "https://www.anthropic.com/"
  - type: "official_release"
    url: "https://www.anthropic.com/news/claude-fable-5-mythos-5"
  - type: "api_docs"
    url: "https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5"
  - type: "case_library"
    url: "../claude-fable-5-case-library-v2.md"
  - type: "phase_1_sample"
    url: "../anthropic-vendor-page.md"
page_status: "publishable"
last_reviewed_at: "2026-06-25"
owner: "pending"
```

## 相关链接

- official_site: [https://www.anthropic.com/](https://www.anthropic.com/)
- official_release: [https://www.anthropic.com/news/claude-fable-5-mythos-5](https://www.anthropic.com/news/claude-fable-5-mythos-5)
- api_docs: [https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5)
- case_library: [../claude-fable-5-case-library-v2.md](../claude-fable-5-case-library-v2.md)
- phase_1_sample: [../anthropic-vendor-page.md](../anthropic-vendor-page.md)

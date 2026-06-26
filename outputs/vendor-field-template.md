# Vendor Field Template

> Phase 1.5 deliverable  
> Purpose: 冻结厂商页字段，使 Phase 2 厂商页扩展不再自由发挥。  
> Page type: vendor page 2.0

## 字段模板

| 字段 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| vendor_id | string | 是 | 稳定厂商 ID，用小写 slug，不随展示名变化 |
| vendor_name | string | 是 | 法人或实验室名称 |
| display_name | string | 是 | 页面展示名称 |
| canonical_slug | string | 是 | URL slug，通常等于 vendor_id |
| official_site | url | 是 | 厂商官网 |
| model_families | list<object> | 是 | 模型家族，包含 family_id、display_name、positioning、representative_models |
| flagship_models | list<string> | 是 | 当前应重点展示的模型 ID |
| timeline | list<object> | 是 | 关键发布时间线，包含 date、model_id、event、source_url、confidence |
| key_inflection_points | list<object> | 是 | 厂商路线拐点，不是所有模型流水账 |
| strengths | list<string> | 是 | 厂商相对优势 |
| weaknesses | list<string> | 是 | 厂商相对短板或使用限制 |
| pricing_strategy | long_text | 是 | 价格层级、订阅/API 差异、缓存、区域倍率等 |
| ecosystem | list<object> | 是 | API、云平台、IDE、代理框架、企业平台等生态入口 |
| case_library_status | enum | 是 | rich, usable, thin, platform_only, archive_only |
| recommended_use_cases | list<string> | 是 | 推荐使用场景 |
| avoid_when | list<string> | 是 | 不建议使用的情况 |
| source_links | list<object> | 是 | 官方、docs、system card、旧 Wiki、案例库链接 |
| page_status | enum | 是 | draft, review, publishable, limited, archive_only |
| last_reviewed_at | date | 是 | 最近审核日期 |
| owner | string | 否 | 内容负责人 |

## 模块顺序

厂商页统一按以下模块渲染：

1. 30 秒厂商定位
2. 模型家族
3. 代表模型
4. 时间线
5. 关键拐点
6. 模型列表
7. 案例精选与采用信号
8. 使用建议
9. 风险与限制
10. 来源链接
11. 旧 Wiki / Archive 回链

## Anthropic 示例

```yaml
vendor_id: anthropic
vendor_name: Anthropic PBC
display_name: Anthropic / Claude
canonical_slug: anthropic
official_site: https://www.anthropic.com/
model_families:
  - family_id: claude-3
    display_name: Claude 3 family
    positioning: multimodal foundation family, older generation
    representative_models:
      - claude-3-opus
      - claude-3-5-sonnet
  - family_id: claude-4
    display_name: Claude 4 / Opus 4.x
    positioning: advanced reasoning and coding generation before Mythos-class
    representative_models:
      - claude-opus-4-8
  - family_id: claude-5-mythos
    display_name: Claude 5 / Mythos-class
    positioning: highest-tier long-horizon reasoning and agentic work
    representative_models:
      - claude-fable-5
      - claude-mythos-5
flagship_models:
  - claude-fable-5
  - claude-opus-4-8
timeline:
  - date: 2026-06-09
    model_id: claude-fable-5
    event: Claude Fable 5 and Claude Mythos 5 announced
    source_url: https://www.anthropic.com/news/claude-fable-5-mythos-5
    confidence: high
  - date: 2026-06-09
    model_id: claude-fable-5
    event: API docs list claude-fable-5, 1M context, 128K output, $10/$50 pricing
    source_url: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5
    confidence: high
  - date: 2026-06-12
    model_id: claude-fable-5
    event: GitHub changelog notes access suspension / policy update
    source_url: https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/
    confidence: medium
key_inflection_points:
  - title: Claude shifts from chat/coding model line to Mythos-class long-horizon work
    model_ids:
      - claude-fable-5
      - claude-mythos-5
    summary: Fable 5 is positioned as the most capable widely released Anthropic model, while Mythos 5 remains limited access.
  - title: Safety and fallback become product-surface requirements
    model_ids:
      - claude-fable-5
    summary: Integrators must handle refusals, fallback, billing, retention, and no-ZDR limitations.
strengths:
  - long-horizon agentic coding
  - large-context knowledge work
  - codebase and document reasoning
  - strong developer ecosystem through Claude API, Claude Code, AWS, Bedrock, Vertex AI, Microsoft Foundry
weaknesses:
  - high token cost
  - 30-day data retention for Fable 5
  - not ZDR at launch
  - safety classifiers and fallback can affect determinism
  - public enterprise production cases remain limited
pricing_strategy: Premium frontier pricing. Fable 5 uses $10 per million input tokens and $50 per million output tokens in the API docs, with additional operational considerations for cache, region, fallback, and subscription transition.
ecosystem:
  - name: Claude API
    type: first_party_api
    url: https://platform.claude.com/
  - name: AWS / Bedrock
    type: cloud_platform
    url: https://aws.amazon.com/bedrock/
  - name: Google Vertex AI
    type: cloud_platform
    url: https://cloud.google.com/vertex-ai
  - name: Microsoft Foundry
    type: cloud_platform
    url: https://ai.azure.com/
  - name: GitHub Copilot
    type: developer_tool
    url: https://github.com/features/copilot
case_library_status: usable
recommended_use_cases:
  - complex agentic coding with review loops
  - long-context codebase and document analysis
  - high-value prototyping where cost is acceptable
  - reverse engineering and evidence-led reconstruction when legally permitted
avoid_when:
  - low-cost high-volume chat
  - strict zero-retention enterprise workloads
  - workflows that cannot tolerate refusals or fallback
  - cases requiring guaranteed geographic availability
source_links:
  - type: official_release
    url: https://www.anthropic.com/news/claude-fable-5-mythos-5
  - type: api_docs
    url: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5
  - type: case_library
    url: /cases/models/claude-fable-5
  - type: phase_1_sample
    url: /outputs/anthropic-vendor-page.md
page_status: publishable
last_reviewed_at: 2026-06-25
owner: pending
```

## page_status 判定

| page_status | 条件 |
|---|---|
| draft | 字段未齐或来源未核验 |
| review | 字段齐全但需要人工事实复核 |
| publishable | 字段齐全、来源可追溯、案例状态清楚 |
| limited | 厂商页可发布但案例库薄弱，需显著提示 |
| archive_only | 只保留旧资料，不做传播型厂商页 |

## case_library_status 判定

| case_library_status | 条件 |
|---|---|
| rich | 至少 5 个 A 类案例，且包含企业/生产/研究多种场景 |
| usable | 至少 3 个 A 类案例，案例结构可用于模型页 |
| thin | 1-2 个 A 类案例，必须提示公开案例不足 |
| platform_only | 只有平台接入、官方评价或 benchmark |
| archive_only | 无可核验案例，只保留历史资料 |

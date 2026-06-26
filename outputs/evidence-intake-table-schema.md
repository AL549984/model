# Evidence Intake Table Schema

> Phase 1.5 deliverable  
> Purpose: 统一模型案例、平台接入、评测资料、排除线索的证据抓取表。  
> Scope: 先服务 Anthropic / Claude Fable 5 样板，字段可直接扩展到全量 Model Atlas。

## 使用原则

1. 每一行只记录一个可审核的证据单元。
2. 集合页可以作为 discovery_source_url，但不能作为 original_evidence_url。
3. benchmark、教程、介绍文可以入表，但 source_type 必须标为 evaluation、tutorial、overview 或 collection，不得标为 real_case。
4. selected_for_model_card 只能在 evidence_grade 为 A 且 showcase_eligible 为 true 时为 true。
5. 所有 A 类案例必须有 original_evidence_url，并且 artifact_url 或 artifact_type 至少一个不为空。

## 字段定义

| 字段名 | 字段类型 | 是否必填 | 示例 | 用途 | 是否可自动抓取 | 是否需要人工审核 |
|---|---|---:|---|---|---:|---:|
| vendor | string | 是 | Anthropic | 厂商名称，用于厂商页聚合 | 是 | 是 |
| vendor_id | string | 是 | anthropic | 厂商稳定 ID，用于 URL、数据关联和去重 | 可半自动 | 是 |
| model_name | string | 是 | Claude Fable 5 | 展示名称 | 是 | 是 |
| model_id | string | 是 | claude-fable-5 | 模型稳定 ID，用于模型页和案例库关联 | 可半自动 | 是 |
| case_title | string | 是 | LAAS WebGPU open world | 案例标题 | 可半自动 | 是 |
| case_id | string | 是 | cf5-case-laas-webgpu-world | 案例稳定 ID | 可半自动 | 是 |
| user_or_org | string | 是 | Braffolk | 使用者、作者或组织 | 是 | 是 |
| original_evidence_url | url | 是 | https://github.com/Braffolk/fable5-world-demo | 原始证据链接，不允许填集合页 | 是 | 是 |
| artifact_url | url | 条件必填 | https://dc5fzrbo8ssfx.cloudfront.net/laas/ | 产物、demo、repo、PR、视频或产品页 | 是 | 是 |
| artifact_type | enum | 条件必填 | repo, live_demo, video, pull_request | 当 artifact_url 不足以说明产物时补充类型 | 可半自动 | 是 |
| source_platform | enum | 是 | GitHub, Reddit, Official Blog, X, YouTube, Product Site | 来源平台，用于快照策略 | 是 | 是 |
| evidence_snapshot_url | url | A/B 必填 | https://archive.example/... | 快照、截图包、归档副本或内部附件 URL | 否 | 是 |
| discovery_source_url | url | 否 | https://github.com/.../awesome-claude-fable-5 | 发现线索来源，集合页只能放这里 | 是 | 是 |
| source_type | enum | 是 | real_case, platform_integration, customer_quote, evaluation, tutorial, overview, collection, invalid | 证据类型，决定是否可进入精选 | 可半自动 | 是 |
| task_category | enum/list | 是 | agentic_coding, browser_game, reverse_engineering | 场景分类 | 可半自动 | 是 |
| task_description | long_text | 是 | 构建 4x4km 程序化 WebGPU 世界 | 说明任务是什么 | 可半自动 | 是 |
| output_result | long_text | 是 | 公开 repo、公开 demo、README 说明模型参与 | 说明产生了什么可验证结果 | 可半自动 | 是 |
| model_contribution | long_text | 是 | 作者称约 99% 由 Fable 5 构建 | 说明模型贡献点和证据来源 | 可半自动 | 是 |
| evidence_grade | enum | 是 | A, B, C, D | 证据等级 | 可半自动 | 是 |
| grade_reason | long_text | 是 | 有 repo、demo、作者说明；模型贡献仍为作者自述 | 记录为什么给这个等级 | 否 | 是 |
| showcase_eligible | boolean | 是 | true | 是否允许进入案例精选池 | 可半自动 | 是 |
| selected_for_model_card | boolean | 是 | true | 是否进入模型卡真实案例精选 | 否 | 是 |
| selected_for_vendor_page | boolean | 是 | true | 是否进入厂商页案例精选或采用信号 | 否 | 是 |
| risk_notes | long_text | 是 | 模型贡献比例需抽检 commit history | 风险、弱证据和发布限制 | 否 | 是 |
| collected_at | datetime | 是 | 2026-06-25T17:45:00+08:00 | 采集时间 | 是 | 否 |
| collected_by | string | 是 | codex | 采集者 | 是 | 否 |
| reviewed_by | string | 条件必填 | YY | 审核人 | 否 | 是 |
| review_status | enum | 是 | pending, approved, rejected, needs_snapshot, needs_source, duplicate | 审核状态 | 否 | 是 |
| review_notes | long_text | 否 | 需要保存 Reddit 截图和 demo 运行截图 | 审核备注 | 否 | 是 |
| last_checked_at | datetime | 否 | 2026-06-25T18:10:00+08:00 | 最近一次链接可用性检查 | 是 | 否 |
| url_status | enum | 否 | live, redirected, dead, paywalled, login_required, removed | 原始 URL 状态 | 是 | 是 |
| duplicate_of_case_id | string | 否 | cf5-case-backrooms-escape | 重复线索归并 | 可半自动 | 是 |

## 枚举值规范

### evidence_grade

| 等级 | 定义 | 是否可精选 |
|---|---|---:|
| A | 具体主体、具体任务、具体产物、原始 URL、artifact URL 或 artifact type 可核验 | 是 |
| B | 有主体和官方/平台/产品接入证据，但缺少具体终端产物或业务结果 | 否，除非页面明确标为采用信号 |
| C | benchmark、评测、教程、介绍、媒体文章、开发者观察 | 否 |
| D | 集合页、SEO、失效 URL、重定向错页、无产物、自述过弱或不可核验 | 否 |

### source_type

| 值 | 说明 |
|---|---|
| real_case | 真实案例，必须有任务和产物 |
| platform_integration | 平台接入或模型上架 |
| customer_quote | 官方发布页中的客户评价 |
| evaluation | benchmark 或第三方评测 |
| tutorial | 教程、prompt 教学、接入指南 |
| overview | 介绍文、新闻、观察 |
| collection | 集合页、awesome 列表、topics |
| invalid | 失效、错页、不可核验 |

## 自动化建议

| 自动任务 | 规则 |
|---|---|
| URL 状态检查 | 每 7 天检查 original_evidence_url 和 artifact_url，写入 url_status 和 last_checked_at |
| 快照缺口检查 | evidence_grade 为 A/B 且 evidence_snapshot_url 为空时，review_status 自动置为 needs_snapshot |
| 集合页拦截 | source_type 为 collection 时，showcase_eligible 强制 false |
| benchmark 拦截 | source_type 为 evaluation 时，selected_for_model_card 强制 false |
| URL 去重 | 同一 original_evidence_url 多次出现时，保留最高证据等级并设置 duplicate_of_case_id |

## Claude Fable 5 示例行

| 字段 | 示例值 |
|---|---|
| vendor | Anthropic |
| vendor_id | anthropic |
| model_name | Claude Fable 5 |
| model_id | claude-fable-5 |
| case_title | LAAS WebGPU open world |
| case_id | cf5-case-laas-webgpu-world |
| user_or_org | Braffolk |
| original_evidence_url | https://github.com/Braffolk/fable5-world-demo |
| artifact_url | https://dc5fzrbo8ssfx.cloudfront.net/laas/ |
| artifact_type | live_demo |
| source_platform | GitHub |
| evidence_snapshot_url | pending |
| source_type | real_case |
| task_category | agentic_coding, webgpu, threejs |
| task_description | 构建浏览器中运行的程序化 4x4km WebGPU 开放世界 |
| output_result | 公开 repo、公开 demo、README 说明架构、验证、调试和模型参与 |
| model_contribution | README 称项目约 99% 由 Claude Fable 5 构建 |
| evidence_grade | A |
| showcase_eligible | true |
| selected_for_model_card | true |
| risk_notes | 模型贡献比例来自作者自述，需要保存 repo 快照和 demo 运行截图 |
| collected_at | 2026-06-25T17:45:00+08:00 |
| reviewed_by | pending |
| review_status | needs_snapshot |

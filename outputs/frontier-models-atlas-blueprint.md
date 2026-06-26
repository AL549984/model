# 模型卡 2.0 / Frontier Models Atlas 产品蓝图

## 0. 本阶段结论

本阶段完成的是 Phase 0 + Phase 1：盘点、诊断、标准、信息架构、样板计划和下一阶段任务拆解。没有删除、重写或迁移旧 Wiki 页面。

核心判断：

- 旧 Wiki 已经不是空库。它有根文档、一个模型数据多维表格、厂商分组页和大量模型卡。
- 旧体系更像“模型资料底稿”：适合保留为 Archive / Raw Cards，不适合直接对外发布。
- 新体系应另起一层 Model Atlas 2.0：厂商页 2.0、模型卡 2.0、案例库、评测表、网站页面、专题页。
- 第一阶段不应全量改写 107/148 个条目，应先做 Anthropic / Claude Fable 5 样板，验证模板、证据标准和发布流程。

## 1. 读取范围与证据说明

已读取 / 观察：

- 根文档：`模型卡 2.0 副本`
- 多维表格：`Artificial Analysis 14厂商视觉Step拐点`
- Bitable 记录数：界面显示 `107 条记录`
- Bitable 可见字段：`模型名称`、`厂商`、`厂商内序号`、`准确发布日期`、`准确评分`、`相对上一拐点...`（后半列名需宽屏/导出复核）
- Wiki 树直接厂商/厂商式节点：16 个，其中 `Claude` 出现两次
- 旧模型卡抽样：10 篇，覆盖 OpenAI、Claude、Google、DeepSeek、Qwen
- Claude Fable 5 主卡：存在子文档 `Claude Fable 5 and Claude Mythos 5 官网全文`

需要复核：

- Bitable 全字段名、字段类型和全部 107 行数据
- Wiki 树中 148 个 direct model-card children 与 Bitable 107 条模型记录的差异原因
- 第二个 `Claude` 节点与第二张 `Claude Fable 5 模型卡` 是否为重复、试验页或新分支
- 是否还有隐藏/权限受限/折叠状态下未完全盘点的深层子文档

## 2. 当前资产盘点

### 2.1 总览

| 项目 | 观察结果 | 说明 |
|---|---:|---|
| 根文档 | 1 | `模型卡 2.0 副本` |
| 多维表格 | 1 | `Artificial Analysis 14厂商视觉Step拐点` |
| Bitable 记录数 | 107 | 界面底部显示 |
| 厂商/厂商式节点 | 16 | 含重复 `Claude` 节点 |
| Wiki direct model-card children | 148 | 从展开 Wiki 树读取 |
| 已抽样旧模型卡 | 10 | 覆盖 5 家重点厂商 |
| 已确认有子文档的模型卡 | 1 | `Claude Fable 5 模型卡` |

### 2.2 厂商节点

| 厂商/节点 | Wiki direct model-card children | 父页状态 | 备注 |
|---|---:|---|---|
| DeepSeek | 14 | 基本为空 | 仅标题、作者、修改时间 |
| Qwen | 14 | 基本为空 | Bitable 前 17 行为 Alibaba/Qwen，Wiki 目前显示 14 张 Qwen 子卡 |
| Claude | 14 | 基本为空 | 主 Claude 分支 |
| xAI | 8 | 基本为空 | Grok 系列 |
| MBZUAI Institute of Foundation Models | 2 | 基本为空 | K2 系列 |
| OpenAI | 14 | 基本为空 | GPT / o / Codex 系列 |
| Kimi | 6 | 基本为空 | K2 系列 |
| Google | 29 | 基本为空 | Gemini / Gemma 混合 |
| Z AI | 6 | 基本为空 | GLM 系列 |
| Xiaomi | 3 | 基本为空 | MiMo 系列 |
| Upstage | 4 | 基本为空 | Solar 系列 |
| MiniMax | 6 | 基本为空 | M 系列 |
| Meta | 6 | 基本为空 | Llama / Muse |
| StepFun | 6 | 基本为空 | Step 系列 |
| Claude（第二个） | 1 | 基本为空 | 异常/重复分支 |
| ByteDance Seed | 1 | 基本为空 | Seed2.1 Pro |

### 2.3 重复与异常

| 节点 | 问题 | 建议 |
|---|---|---|
| `Claude` | 出现两个厂商节点 | 保留原文，不删除；建立 `duplicate_group_id`，人工判定主分支 |
| `Claude Fable 5 模型卡` | 至少两个 token 不同的同名页面 | 对比正文和子文档后合并为一个 Model Atlas 2.0 条目，旧页均回链 |
| Wiki 148 vs Bitable 107 | Wiki 子卡数大于表格记录数 | 建立 `legacy_page` 映射表，区分模型记录、旧卡页面、重复页、草稿页 |
| 厂商父页 | 多数为空白 | 不直接对外发布，升级为厂商页 2.0 |

## 3. 当前问题诊断

### 3.1 内容问题

旧模型卡抽样显示，当前正文普遍是 400-900 字左右的资料摘要，常见结构为：

- 标题
- 一句话总结
- 发布时间
- 基本信息
- 模型名称、厂商、API ID、模态、上下文、价格等若干字段
- 个别卡片有“口径说明”或主观判断

主要问题：

- 缺少稳定可比较的全字段模板。
- 关键事实多数没有在页面内展示可点击来源链接。
- 内容偏“模型是什么”，缺少“为什么重要、适合谁、真实怎么用”。
- 厂商页为空，无法表达厂商路线图和模型家族关系。
- 案例库缺失，benchmark / 官方宣传 / 教程与真实案例还没有分层。
- 页面没有清晰的“事实、判断、建议、证据”边界。

### 3.2 数据问题

Bitable 已经有 107 条结构化记录，说明它适合作为模型主表的种子。但当前可见字段偏 Artificial Analysis 视角：

| 可见字段 | 当前用途 | 是否保留 | 问题 |
|---|---|---|---|
| 模型名称 | 模型展示名 | 保留 | 需标准化 canonical name / slug |
| 厂商 | 厂商归属 | 保留 | 需关联厂商表，而不是纯文本 |
| 厂商内序号 | 厂商内时间/阶段排序 | 保留 | 需明确排序规则 |
| 准确发布日期 | 发布时间 | 保留 | 需来源字段和核验日期 |
| 准确评分 | Artificial Analysis 分数 | 保留但降级为评测字段 | 不能作为唯一事实来源 |
| 相对上一拐点... | 趋势/增量指标 | 待复核 | 需完整列名和计算方式 |

缺口：

- 官方链接、API 文档、System Card、价格页、模型 ID、上下文、输出上限、模态、开源状态、许可证。
- 证据来源表、案例库表、评测表、旧 Wiki 页面映射表。
- 字段维护责任和自动生成机制。

### 3.3 产品问题

当前 Wiki 还不是网站化产品：

- 首页没有“模型宇宙地图”或阅读路径。
- 厂商页没有路线图、模型谱系和推荐模型。
- 模型页没有案例精选、证据等级和可复用判断。
- 案例库不存在统一入口。
- 缺少专题页承接传播内容。

## 4. 新产品定位

`Frontier Models Atlas / 模型情报站 2.0` 的定位是：

> 一个把前沿模型、厂商路线、真实案例、评测证据和使用判断连接起来的数据内容产品。

它不是：

- 旧模型卡批量润色项目
- 简单 Wiki 重排项目
- 单纯静态网站壳子
- benchmark 排行榜搬运站

它应该服务三类读者：

| 用户 | 主要问题 | 产品回答方式 |
|---|---|---|
| 开发者 | 这个模型适合我做什么？怎么调用？有什么坑？ | 模型卡、案例库、API/价格/限制 |
| 企业决策者 | 哪家厂商在什么方向领先？是否可落地？ | 厂商页、路线图、精选案例、风险 |
| 内容/研究读者 | 模型演进发生了什么？为什么重要？ | 专题页、模型关系图、时间线 |

## 5. 信息架构

第一版网站结构：

```text
/
/vendors
/vendors/[vendor]
/models
/models/[model]
/cases
/cases/[case]
/cases/models/[model]
/compare
/topics
/topics/[topic]
/about
```

首页不是营销页，而是知识入口：

- 模型宇宙地图：厂商、模型家族、重点模型
- 最新更新：新增模型、更新模型、变更字段
- 重点模型：按能力/热度/证据质量筛选
- 真实案例精选：只放 A 类案例
- 专题入口：Coding Agent、长上下文、多模态、开源推理、企业落地
- 数据说明：证据等级、更新时间、来源规则

厂商页：

- 厂商定位
- 模型家族时间线
- 当前主力模型
- 历史模型 / Archive
- 代表案例
- 关键评测和如何解读
- 风险与限制
- 旧 Wiki 回链

模型页：

- 30 秒结论
- 基本信息
- 在厂商谱系中的位置
- 关键能力判断
- 官方评测怎么读
- 真实案例精选
- 适合 / 不适合场景
- 前代 / 竞品对比
- 风险和限制
- 来源和证据

案例库页：

- 按模型、厂商、行业、任务、证据等级筛选
- A 类案例可上首页和模型精选
- B 类进入案例库但不做强传播
- C 类仅作背景/线索
- D 类剔除或转为资料

## 6. 数据表设计

### 6.1 模型主表 2.0

| 字段 | 类型 | 用途 | 来源 | 必填 |
|---|---|---|---|---|
| model_id | string | 主键，稳定 slug | 自动生成 | 是 |
| display_name | string | 展示名称 | Bitable/Wiki | 是 |
| canonical_name | string | 去重标准名 | 人工维护 | 是 |
| vendor_id | relation | 关联厂商 | 人工维护 | 是 |
| model_family | string | GPT/Claude/Gemini 等 | 人工维护 | 是 |
| release_date | date | 发布时间 | Bitable + 官方来源 | 是 |
| status | enum | active/preview/deprecated/archive | 人工维护 | 是 |
| api_model_name | string | API ID | 官方文档 | 否 |
| input_modalities | multi_select | 输入模态 | 官方文档 | 是 |
| output_modalities | multi_select | 输出模态 | 官方文档 | 是 |
| context_window_tokens | number | 上下文 | 官方文档 | 否 |
| max_output_tokens | number | 输出上限 | 官方文档 | 否 |
| pricing_summary | string | 价格摘要 | 官方价格页 | 否 |
| open_weight_status | enum | closed/open_weights/open_source/unknown | 官方来源 | 是 |
| license | string | 许可证 | 官方/repo | 否 |
| official_url | url | 官方页面 | 人工维护 | 是 |
| docs_url | url | API 文档 | 人工维护 | 否 |
| model_card_url | url | 官方 System/Model Card | 人工维护 | 否 |
| legacy_wiki_url | url | 旧卡回链 | 自动/人工 | 是 |
| summary_short | string | 列表摘要 | 人工维护 | 是 |
| atlas_card_status | enum | raw/draft/reviewed/published | 人工维护 | 是 |
| evidence_status | enum | sufficient/partial/weak/missing | 人工维护 | 是 |
| last_verified_at | datetime | 最近核验 | 人工维护 | 是 |

### 6.2 厂商表

| 字段 | 类型 | 用途 | 来源 | 必填 |
|---|---|---|---|---|
| vendor_id | string | 主键 | 自动生成 | 是 |
| vendor_name | string | 展示名 | Wiki/Bitable | 是 |
| vendor_slug | string | URL | 自动生成 | 是 |
| vendor_type | enum | company/lab/open_source_org/university | 人工维护 | 是 |
| region | string | 地区 | 人工维护 | 否 |
| official_url | url | 官网 | 人工维护 | 是 |
| docs_url | url | 文档 | 人工维护 | 否 |
| pricing_url | url | 价格页 | 人工维护 | 否 |
| model_count | number | 模型数量 | 自动生成 | 是 |
| model_families | relation | 模型家族 | 自动/人工 | 否 |
| vendor_summary | markdown | 厂商页正文 | 人工维护 | 是 |
| roadmap_summary | markdown | 路线图摘要 | 人工维护 | 否 |
| legacy_wiki_url | url | 旧厂商页回链 | 自动/人工 | 是 |
| duplicate_notes | markdown | 重复节点说明 | 人工维护 | 否 |

### 6.3 案例库表

| 字段 | 类型 | 用途 | 来源 | 必填 |
|---|---|---|---|---|
| case_id | string | 主键 | 自动生成 | 是 |
| title | string | 案例标题 | 人工维护 | 是 |
| organization | string | 使用主体 | 原始证据 | 是 |
| task | string | 具体任务 | 原始证据 | 是 |
| product_or_output | string | 产物/demo/repo/产品页 | 原始证据 | 是 |
| related_models | relation | 关联模型 | 人工维护 | 是 |
| related_vendors | relation | 关联厂商 | 自动/人工 | 是 |
| industry | multi_select | 行业 | 人工维护 | 否 |
| scenario | multi_select | 场景 | 人工维护 | 是 |
| outcome | markdown | 结果 | 原始证据 | 是 |
| evidence_url | url | 原始证据 URL | 人工维护 | 是 |
| evidence_type | enum | repo/demo/product/blog/video/paper/customer_story | 人工维护 | 是 |
| evidence_grade | enum | A/B/C/D | 人工审核 | 是 |
| public_status | enum | public/needs_redaction/private/unknown | 人工审核 | 是 |
| review_notes | markdown | 证据审查说明 | 人工审核 | 是 |
| eligible_for_featured | boolean | 能否进模型精选 | 自动+人工 | 是 |
| last_verified_at | datetime | 最近核验 | 人工维护 | 是 |

### 6.4 评测表

| 字段 | 类型 | 用途 | 来源 | 必填 |
|---|---|---|---|---|
| eval_id | string | 主键 | 自动生成 | 是 |
| model_id | relation | 模型 | 人工/自动 | 是 |
| eval_name | string | 评测名称 | 来源 | 是 |
| eval_category | enum | reasoning/coding/math/multimodal/safety/agent | 人工维护 | 是 |
| score | number/string | 分数 | 来源 | 是 |
| rank | number | 排名 | 来源 | 否 |
| source_name | string | AA/官方/论文/榜单 | 人工维护 | 是 |
| source_url | url | 来源链接 | 人工维护 | 是 |
| eval_date | date | 评测日期 | 来源 | 否 |
| methodology_notes | markdown | 方法说明 | 人工维护 | 否 |
| confidence | enum | high/medium/low | 人工审核 | 是 |

### 6.5 旧 Wiki 映射表

必须新增，否则无法安全迁移。

| 字段 | 类型 | 用途 |
|---|---|---|
| legacy_page_id | string | Wiki token |
| legacy_title | string | 原页面标题 |
| legacy_url | url | 原页面链接 |
| parent_legacy_page_id | string | 父页面 token |
| inferred_type | enum | vendor/raw_model_card/source_doc/duplicate/archive |
| mapped_model_id | relation | 对应模型 |
| mapped_vendor_id | relation | 对应厂商 |
| duplicate_group_id | string | 重复页分组 |
| migration_status | enum | untouched/mapped/draft/published/archived |
| notes | markdown | 审查说明 |

## 7. 新版模型卡模板

```markdown
# [模型名称]：一句话传播标题

## 30 秒结论
这个模型是什么？为什么值得看？适合谁先看？

## 基本信息
- 厂商：
- 发布时间：
- 模型 ID：
- 上下文：
- 输出：
- 模态：
- 是否推理模型：
- 开源/闭源：
- 价格：
- 可用平台：
- 官方链接：
- 最后核验：

## 它在厂商模型谱系中的位置
说明它和同厂前后代模型的关系。

## 关键能力判断
解释它实际推进了什么边界，不堆 benchmark。

## 官方评测怎么读
哪些分数重要，哪些只是宣传，哪些不宜横比。

## 真实案例精选
只放 A 类案例；B 类最多作为补充并标注限制。

## 适合场景
- ...

## 不适合场景
- ...

## 和前代 / 竞品对比
- ...

## 风险和限制
- ...

## 一句话使用建议
给开发者 / 企业 / 创作者的最终判断。

## 来源和证据
- 官方发布文：
- System Card / Model Card：
- API 文档：
- 价格页：
- Artificial Analysis：
- 原始案例证据：
- 旧 Wiki 回链：
```

## 8. 案例库标准

### 8.1 什么算真实案例

A 类真实案例必须同时满足：

- 有具体人 / 团队 / 组织
- 有具体任务
- 有具体产物
- 有原始证据 URL
- repo / demo / 产品页 / 官方博客 / 视频时间点至少一种
- 不是集合页
- 可以公开核验

### 8.2 什么不算真实案例

以下不能包装成真实案例：

- benchmark
- 教程
- 评测
- 介绍文
- 排行榜
- 官方发布文
- 集合页本身
- 无法核验的二手转述
- 只提模型名但没有产物和使用证据

### 8.3 A/B/C/D 证据等级

| 等级 | 定义 | 可用于 |
|---|---|---|
| A | 主体、任务、产物、原始证据 URL 都完整；可公开核验 | 网站、首页、模型卡精选 |
| B | 有原帖但产物弱，或有产物但模型使用证据弱 | 案例候选池，不做强传播 |
| C | benchmark、教程、评测、介绍文、排行榜、官方发布文、模型说明 | 背景资料 / 能力证据 |
| D | SEO 垃圾、二手转述、无法核验、泛泛评价、集合页本身 | 剔除 |

### 8.4 案例卡片结构

```markdown
### [谁] 用 [模型] 做了 [任务]

- 主体：
- 行业：
- 模型：
- 任务：
- 产物：
- 结果：
- 证据等级：
- 原始证据：
- 审查备注：
```

## 9. 网站页面结构

### 9.1 第一版技术建议

建议第一版用静态站，不直接接飞书 API：

- 数据源：JSON / Markdown + frontmatter
- 页面生成：Astro、Next.js 或 Vite 均可，第一版偏 Astro/静态更轻
- 搜索：本地静态索引
- 数据更新：先人工导出 Bitable + Wiki 映射表，后续再自动同步
- URL：稳定英文 slug

不做：

- 登录系统
- 评论/收藏
- 实时抓取
- 自动生成强结论
- 复杂 CMS
- 先做漂亮壳子再补内容

### 9.2 页面模块

| 页面 | 核心模块 |
|---|---|
| `/` | 模型宇宙地图、重点模型、A 类案例、专题、最近更新 |
| `/vendors` | 厂商索引、地区/类型筛选、模型数量 |
| `/vendors/[vendor]` | 厂商简介、模型时间线、主力模型、案例、风险 |
| `/models` | 模型索引、厂商/能力/状态筛选 |
| `/models/[model]` | 新版模型卡完整模板 |
| `/cases` | 案例库筛选与证据等级 |
| `/cases/[case]` | 案例详情与证据说明 |
| `/compare` | 模型横比，字段来自模型主表和评测表 |
| `/topics/[topic]` | 专题叙事，如 Coding Agent、长上下文、多模态 |

## 10. Anthropic / Claude Fable 5 样板计划

### 10.1 已有资料

已观察：

- 主 Claude 分支有 14 张模型卡，从 `Claude Instant 模型卡` 到 `Claude Fable 5 模型卡`
- 主 Claude 厂商页为空，仅标题/元信息
- 主 `Claude Fable 5 模型卡` 有子文档：`Claude Fable 5 and Claude Mythos 5 官网全文`
- 另有第二个 `Claude` 分支，包含另一张 `Claude Fable 5 模型卡`

主 Claude Fable 5 旧卡已读到的信息包括：

- 标题：`Claude Fable 5 模型卡`
- 发布时间字段：`2026年6月9日`
- 模型名称：`Claude Fable 5`
- 开发商：`Anthropic`
- API 模型 ID：`claude-fable-5`
- 上下文：`1M tokens（默认）`
- 最大输出：`最高 128K tokens / request`
- 价格：`USD 10 / 百万输入 tokens；USD 50 / 百万输出 tokens`
- 子文档：`Claude Fable 5 and Claude Mythos 5 官网全文`

注意：这些来自旧卡正文，进入网站前仍需以官方来源复核。

### 10.2 样板交付物

| 交付物 | 内容 | 验收 |
|---|---|---|
| Anthropic / Claude 厂商页 2.0 | Claude 系列定位、时间线、模型索引、重复节点说明 | 不再是空父页 |
| Claude Fable 5 模型卡 2.0 | 按新版模板重组 | 每个事实有来源或标 `待核验` |
| Claude Fable 5 案例库 | A/B/C/D 分级收录 | 不把官方发布文包装成案例 |
| 重复页合并说明 | 两个 Claude Fable 5 token 对比 | 保留旧页回链，不删除 |
| 来源映射表 | 旧卡、子文档、官方 URL、案例 URL | 可追溯 |

### 10.3 Anthropic 厂商页结构

- 30 秒厂商定位
- Claude 系列时间线
- 当前主力模型
- Archive / Raw Cards
- Claude Fable 5 样板入口
- 代表案例库
- 与 OpenAI / Google / DeepSeek / Qwen 的横向关系
- 重复节点与维护说明

## 11. 分阶段实施路线

### Phase 0：冻结与盘点

- 导出 Bitable 全字段和 107 行记录
- 导出/抓取 Wiki 树完整 token/title/parent 映射
- 建立旧 Wiki 映射表
- 标记重复页、空父页、有子文档页

### Phase 1：标准与样板

- 固化模型主表 2.0、厂商表、案例库表、评测表、旧 Wiki 映射表
- 完成 Anthropic / Claude 厂商页样板
- 完成 Claude Fable 5 模型卡样板
- 完成 Claude Fable 5 案例库样板
- 产出一页网站原型或静态页面

### Phase 2：批量迁移

- 按厂商批次迁移，不按 148 页一次性重写
- 每批先做 1 个厂商页 + 3-5 个重点模型卡
- 每批保留抽检表和事实核验记录

### Phase 3：网站上线

- 生成静态站
- 加入搜索、筛选、模型对比
- 建立更新日志
- 建立发布前审核 checklist

### Phase 4：持续维护

- 每周/每月同步 Bitable 和 Wiki 新增项
- 对价格、API、上下文、可用平台做定期复核
- 对案例证据做降级/升级
- 定期归档过期模型

## 12. 验收标准

### 第一阶段验收标准

- 已读取 Wiki 子文档和 Bitable，而不是凭空设计
- 清楚说明 107 Bitable 记录与 148 Wiki direct child pages 的差异
- 不删除、不覆盖旧模型卡
- 明确 Archive / Raw Cards 和 Model Atlas 2.0 的关系
- 有统一模型卡模板
- 有案例库 A/B/C/D 标准
- 有厂商页设计
- 有网站页面结构
- 有 Anthropic / Claude Fable 5 样板计划
- 有 subagent 结论摘要
- 没有把 benchmark / 教程 / 集合页 / 官方发布文当真实案例
- 能解释为什么先做样板而不是直接全量重写

### 全项目验收标准

- 旧 Wiki 全部页面都有映射状态
- 所有发布模型卡均有来源区
- 所有案例均有证据等级
- 每个厂商页不是空目录，而是能解释路线图
- 网站页面不是空壳，有真实内容密度
- 批量迁移可回滚、可抽检、可追溯
- 新增模型有维护入口和发布 checklist

## 13. 风险和注意事项

| 风险 | 严重性 | 规避方式 |
|---|---|---|
| 直接批量重写 | 高 | 先样板，后批次 |
| 弱证据包装成案例 | 高 | 严格 A/B/C/D |
| 旧页被破坏 | 高 | 旧 Wiki 只读保留，新增映射表 |
| Bitable 与 Wiki 不一致 | 高 | 建立 `model_record` 和 `legacy_page` 两张不同表 |
| 厂商页继续为空 | 中 | 厂商页 2.0 作为必做交付 |
| Artificial Analysis 被当唯一事实源 | 中 | AA 只进评测表，不覆盖官方字段 |
| 页面好看但内容空 | 中 | 验收看内容密度和证据，不看视觉壳 |
| 过期价格/API | 中 | `last_verified_at` 和定期复核 |

## 14. Subagent 结论摘要

| Subagent | 采纳结论 | 主 agent 取舍 |
|---|---|---|
| A Wiki 资产盘点 | 根下 16 个厂商式节点，148 个 direct model-card children，Claude 重复 | 采纳，并补充 Bitable 107 记录差异 |
| B 旧卡质量审查 | 旧卡可作为底稿，但字段、来源、厂商页不足 | 采纳，并用 10 篇真实样本校正 |
| C 数据结构设计 | 建议模型、厂商、案例、评测四张核心表 | 采纳，并新增旧 Wiki 映射表 |
| D 案例库标准 | A/B/C/D 分级，不把 benchmark/教程/集合页包装成案例 | 采纳，但按任务原文严格定义 C/D |
| E 网站 IA | 首页、厂商、模型、案例、专题、对比 | 采纳，首页定位为知识入口 |
| F Claude Fable 5 样板 | 先做 Claude Fable 5 与 Anthropic 厂商页样板 | 采纳，并补充已读旧卡事实 |
| G 风险验收 | 防止跳过盘点、弱证据、网站空壳、破坏旧页 | 采纳为验收标准 |

## 15. 下一步执行任务清单

1. 导出 Bitable 全字段和 107 行记录。
2. 生成完整 Wiki 树映射：`token`、标题、父节点、层级、是否有子文档。
3. 建立 `legacy_pages.csv/json`，记录 148 个 direct model-card children 和重复节点。
4. 对比两张 `Claude Fable 5 模型卡`，输出重复页合并说明。
5. 读取 `Claude Fable 5 and Claude Mythos 5 官网全文` 子文档，抽取可引用事实。
6. 按模型卡 2.0 模板重写 Claude Fable 5 样板，不改旧页。
7. 建立 Anthropic / Claude 厂商页 2.0 样板。
8. 为 Claude Fable 5 搜集案例候选，按 A/B/C/D 分级。
9. 用 JSON/Markdown 建一个最小静态数据源。
10. 做 `/vendors/anthropic` 和 `/models/claude-fable-5` 的页面原型。

## 16. 为什么先做样板

因为当前资产存在三个不确定性：

- 结构不一致：Bitable 是 107 记录，Wiki direct 子卡是 148 页。
- 证据不一致：旧卡里有事实、判断、AA 分数和官方材料摘要，但来源链接不总是显式存在。
- 节点不一致：Claude 有重复分支，Claude Fable 5 有重复卡。

直接全量重写会把这些问题放大。先做 Anthropic / Claude Fable 5 样板，可以同时验证：

- 厂商空父页如何升级
- 旧卡如何保留为 Raw Card
- 子文档如何进入来源区
- 重复页如何处理
- 案例库如何分级
- 静态站如何从结构化数据生成

样板通过后，再扩展到 OpenAI、Google、DeepSeek、Qwen 等重点厂商。

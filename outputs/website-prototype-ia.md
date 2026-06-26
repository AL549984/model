# Frontier Models Atlas 网站样板 IA

> 页面类型：Phase 1 网站 IA 样板  
> 样板对象：Anthropic / Claude Fable 5  
> 目标：验证首页、厂商页、模型详情页、案例库页能否承载 Model Atlas 2.0 内容结构

## 站点路径

```text
/
/vendors
/vendors/anthropic
/models
/models/claude-fable-5
/cases
/cases/models/claude-fable-5
/cases/laas-webgpu-world
/cases/backrooms-escape
/compare
/topics/agentic-coding
/about/evidence-standards
```

## 首页结构

路径：`/`

### 1. 顶部导航

- Models
- Vendors
- Cases
- Compare
- Topics
- Evidence Standard

### 2. 模型宇宙地图

首页第一屏不是营销 hero，而是可扫描的模型地图：

| 区块 | 内容 |
|---|---|
| Frontier models | Claude Fable 5、GPT-5.x、Gemini 3.x、DeepSeek V3.x、Qwen3.x |
| Vendor lanes | Anthropic、OpenAI、Google、DeepSeek、Qwen |
| Evidence status | Published / Draft / Needs source / Archive |

Claude Fable 5 在地图中的卡片：

- 标题：`Claude Fable 5`
- 标签：`Anthropic`、`Mythos-class`、`1M context`、`agentic coding`
- 状态：`Sample published`
- CTA：`View model card`

### 3. 最新样板

- `Anthropic / Claude 厂商页`
- `Claude Fable 5 模型卡`
- `Claude Fable 5 案例库`

### 4. A 类案例精选

只展示：

- LAAS WebGPU world
- Backrooms Escape

每张案例卡显示：

- 使用者/作者
- 任务
- 产物链接
- 证据等级
- 模型发挥点

### 5. 证据说明

首页底部固定说明：

- A 类：可进模型精选
- B 类：候选/平台接入
- C 类：背景资料/评测
- D 类：剔除

## 厂商页结构

路径：`/vendors/anthropic`

对应文件：`anthropic-vendor-page.md`

### 1. 厂商定位

解释 Anthropic / Claude 的产品主线：安全、可靠、长上下文、agentic work。

### 2. 模型家族

以横向阶段条展示：

```text
Claude Instant / Claude 2
 -> Claude 3 / 3.7 Sonnet
 -> Claude 4 / Opus 4.x
 -> Claude Fable 5 / Mythos 5
```

### 3. 时间线

表格字段：

- 阶段
- 模型
- 发布时间
- 状态
- 旧 Wiki 回链
- Model Atlas 页面状态

### 4. 关键拐点

内容区块：

- Claude 3.7 Sonnet：hybrid reasoning
- Claude Opus 4.x：前代能力基线
- Claude Fable 5：公开 Mythos-class
- Mythos 5：受限可信访问

### 5. 模型列表

模型索引支持：

- Archive
- Compare
- Published Sample
- Needs Review

Claude Fable 5 行为：

- 状态：`Published Sample`
- 链接：`/models/claude-fable-5`
- 案例数：A 类 2，B 类 3，C 类 2

### 6. 案例精选

只展示 A 类：

- `/cases/laas-webgpu-world`
- `/cases/backrooms-escape`

B/C 类在折叠区显示为“采用信号 / 背景资料”，不和真实案例混排。

### 7. 使用建议和风险

必须放在厂商页中段，不藏在末尾：

- 成本高
- 30 天数据保留
- refusal / fallback
- 出口管制/可用性波动
- 企业生产案例不足

## 模型详情页结构

路径：`/models/claude-fable-5`

对应文件：`claude-fable-5-model-card-2.0.md`

### 1. 页面头部

- 模型名称：Claude Fable 5
- 一句话标题：`Mythos 级能力开放给长周期知识工作`
- 标签：`Anthropic`、`Mythos-class`、`agentic coding`、`1M context`、`30-day retention`
- 状态：`Draft sample / Needs final source audit`

### 2. 30 秒结论

回答：

- 它是什么
- 为什么重要
- 谁应该看
- 谁不该默认用

### 3. 基本信息

用结构化表格，字段直接映射模型主表：

- release_date
- api_model_name
- context_window_tokens
- max_output_tokens
- modalities
- pricing
- data_retention
- availability
- source_status

### 4. 谱系位置

用小型谱系图解释：

```text
Claude 3.7 Sonnet -> Claude Opus 4.8 -> Claude Fable 5
                                      -> Claude Mythos 5
```

### 5. 能力判断

四个段落：

- 长周期 agentic coding
- 文档/视觉/知识工作
- 安全分类器与 fallback
- 成本与路由策略

### 6. 官方评测怎么读

分三列：

| 来源 | 能说明什么 | 不能说明什么 |
|---|---|---|
| Anthropic System Card | 官方能力边界 | 不等于真实案例 |
| 早期客户反馈 | 采用信号 | 缺独立产物 |
| Endor Labs | 安全修复边界 | 单一 benchmark |

### 7. 真实案例精选

仅展示 A 类：

- LAAS WebGPU world
- Backrooms Escape

每个案例显示：

- 任务
- 产物
- 证据
- 模型发挥点
- 风险备注

### 8. 适合 / 不适合场景

二栏布局：

- 适合：长周期、高价值、复杂、多文件、多工具
- 不适合：短任务、高吞吐、ZDR、低延迟、敏感高风险

### 9. 对比

对比对象：

- Claude 3.7 Sonnet
- Claude Opus 4.8
- Claude Mythos 5
- GPT-5.x / Gemini 3.x 待后续样板

### 10. 来源证据

按类型分组：

- 官方来源
- 平台来源
- 案例来源
- 旧 Wiki 来源

## 案例库页结构

路径：`/cases/models/claude-fable-5`

对应文件：`claude-fable-5-case-library.md`

### 1. 案例总览

| 等级 | 数量 | 用途 |
|---|---:|---|
| A | 2 | 模型卡精选 |
| B | 3 | 候选/采用信号 |
| C | 2 | 背景/评测 |
| D | 0 | 剔除记录后续补充 |

### 2. 筛选器

- 证据等级：A / B / C / D
- 场景：agentic coding / platform integration / benchmark / knowledge work
- 是否进入精选：yes / no
- 来源类型：repo / demo / official blog / platform docs / evaluation

### 3. A 类案例卡

每张卡包括：

- 标题
- 使用者/作者
- 任务描述
- 产物 URL
- 原始证据 URL
- 模型发挥点
- 风险备注

### 4. B/C 类证据区

B 类显示为“候选案例 / 采用信号”。

C 类显示为“背景资料 / 评测”，不能和案例卡混排。

### 5. 剔除规则

页面底部显示不收录原因：

- 集合页不是案例
- benchmark 不是案例
- 教程不是案例
- 官方发布不是案例
- 没有产物 URL 不进入 A 类

## 内容区块到数据表映射

| 页面区块 | 数据来源 |
|---|---|
| 模型基础信息 | model 主表 |
| 厂商时间线 | vendor 表 + model 主表 |
| 案例精选 | case 表，`evidence_grade = A` |
| 官方评测解读 | eval 表 + sources |
| 风险提示 | model.risk_notes + source notes |
| 旧 Wiki 回链 | legacy_pages 表 |

## 第一版静态站数据结构

建议目录：

```text
content/
  vendors/
    anthropic.md
  models/
    claude-fable-5.md
  cases/
    laas-webgpu-world.md
    backrooms-escape.md
data/
  models.json
  vendors.json
  cases.json
  evaluations.json
  legacy-pages.json
```

## 样板验收点

- 首页能从模型地图进入 Claude Fable 5。
- Anthropic 厂商页不再是空父页。
- 模型页能同时展示事实、判断、案例和风险。
- 案例库能严格区分 A/B/C。
- benchmark 和平台接入不会被当作真实案例精选。
- 所有页面都有旧 Wiki 回链和来源区。

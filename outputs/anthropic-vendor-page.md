# Anthropic / Claude：从安全优先的对话模型，到长周期 Agentic Work 的 Mythos 级模型线

> 页面类型：厂商页 2.0 样板  
> 页面路径建议：`/vendors/anthropic`  
> 旧 Wiki 回链：`https://ycn3zdw6f1p7.feishu.cn/wiki/J7DTw1FQziZlNnkKuq6csF5pnFg`  
> 样板状态：Draft，可进入人工事实复核

## 厂商定位

Anthropic 是 Claude 系列模型的开发商。它的产品叙事长期围绕三个关键词展开：安全、可靠、长上下文。到 Claude Fable 5 / Mythos 5 阶段，Anthropic 的模型线出现了一个更明确的分层：公开可用的 Fable 承接最高级通用能力，受限可用的 Mythos 面向少量可信访问场景。

对 Model Atlas 2.0 来说，Anthropic 厂商页的价值不只是列出模型，而是回答：

- Claude 系列从对话模型演进到 agentic coding / knowledge work 的路径是什么？
- Fable 5 在 Claude 家族里为什么是一个拐点？
- 哪些场景适合使用 Fable 5，哪些场景会被成本、数据保留和安全分类器限制？
- 旧 Wiki 中两个 Claude 分支和两个 Claude Fable 5 页面应如何追溯？

## 模型家族

| 家族 | 代表模型 | Model Atlas 处理方式 |
|---|---|---|
| Claude 早期通用模型 | Claude Instant、Claude 2.0、Claude 2.1 | Archive / Raw Cards，保留历史定位 |
| Claude 3 系列 | Claude 3 Opus、Claude 3.5 Haiku、Claude 3.7 Sonnet | 用于说明长上下文、视觉和 hybrid reasoning 的过渡 |
| Claude 4 / Opus 系列 | Claude 4 Opus、Claude 4.1/4.5/4.6/4.7/4.8 Opus | 作为 Fable 5 的前代对比基线 |
| Claude 5 / Mythos-class | Claude Fable 5、Claude Mythos 5 | 本阶段样板重点；Fable 5 公开可用，Mythos 5 受限可用 |

## 时间线

> 说明：以下时间线混合了旧 Wiki 已观察模型节点与已读卡片事实。进入正式网站前，所有日期仍需对照官方发布文、API 文档或 System Card 复核。

| 阶段 | 模型 | 旧 Wiki 状态 | 作用 |
|---|---|---|---|
| 早期 | Claude Instant | 已有旧模型卡 | 低延迟/轻量 Claude 历史节点 |
| 2023-07 | Claude 2.0 | 已有旧模型卡 | Claude 2 代通用能力 |
| 2023-11 | Claude 2.1 | 已有旧模型卡 | Claude 2 代后续升级 |
| 2024-03 | Claude 3 Opus | 已有旧模型卡 | Claude 3 旗舰能力节点 |
| 2025-02 | Claude 3.7 Sonnet | 已读旧卡 | 首个 hybrid reasoning Claude；编码和工具调用更稳 |
| 2026 前后 | Claude 4.x Opus 系列 | 已有旧模型卡 | Fable 5 之前的 Opus 基线 |
| 2026-06-09 | Claude Fable 5 | 已读主旧卡和重复旧卡 | Mythos 级公开模型，长周期 agentic work 样板 |
| 2026-06-09 | Claude Mythos 5 | 来源于官方发布/子文档 | 与 Fable 5 同源，但面向受限可信访问 |

## 关键拐点

### 1. Claude 3.7 Sonnet：hybrid reasoning 进入 Claude 主线

旧卡中将 Claude 3.7 Sonnet 定位为 Anthropic 第一次把普通回答和扩展思考合到同一模型里的版本。它的重要性不是单点数学刷榜，而是让编码、前端、工具调用、多轮 agent 任务变得更稳。

### 2. Claude 4.x：Opus 线成为 Fable 5 的前代基准

旧 Wiki 里有多个 Opus 4.x 模型卡。它们应作为 Fable 5 的能力、成本和风险对比对象，而不是全部进入首页重点展示。

### 3. Claude Fable 5：公开模型进入 Mythos-class

官方文档将 Claude Fable 5 描述为广泛发布模型中能力最强的一档，面向 demanding reasoning 和 long-horizon agentic work。它与 Claude Mythos 5 能力同源，但 Fable 5 带有安全分类器、fallback、30 天数据保留等生产限制。

### 4. 安全与数据保留成为产品能力的一部分

Fable 5 的“强”不是只有能力更强，也意味着用户必须处理新的工程约束：拒答响应、fallback、成本、数据保留、非 ZDR 可用性、敏感任务边界。这些必须写进模型卡，而不是藏在风险段落末尾。

## 模型列表

| 模型 | 页面状态 | 建议状态 | 备注 |
|---|---|---|---|
| Claude Instant | Raw Card | Archive | 历史基线 |
| Claude 2.0 | Raw Card | Archive | 历史基线 |
| Claude 2.1 | Raw Card | Archive | 历史基线 |
| Claude 3 Opus | Raw Card | Archive / Compare | Claude 3 旗舰 |
| Claude 3.5 Haiku | Raw Card | Archive / Compare | 轻量模型 |
| Claude 3.7 Sonnet | Raw Card | Compare | hybrid reasoning 过渡点 |
| Claude 4 Opus | Raw Card | Compare | Opus 4 代基线 |
| Claude 4.1 Opus | Raw Card | Compare | Opus 4 代迭代 |
| Claude 4.5 Sonnet | Raw Card | Compare | Sonnet 线 |
| Claude Opus 4.5 | Raw Card | Compare | Fable 前代之一 |
| Claude Opus 4.6 (max) | Raw Card | Compare | Fable 前代之一 |
| Claude Opus 4.7 (max) | Raw Card | Compare | Fable 前代之一 |
| Claude Opus 4.8 | Raw Card | Compare | Fable 5 的主要前代对照 |
| Claude Fable 5 | Raw Card + 子文档 | Publish Sample | 本阶段样板 |

## 代表模型

### Claude 3.7 Sonnet

适合作为“Claude reasoning 能力进入通用模型”的过渡节点。旧卡中强调它把普通回答和扩展思考合到一个模型里，适合编码、前端、工具调用和多轮 agent 任务。

### Claude Opus 4.8

适合作为 Fable 5 的成本/能力前代基线。官方文档和第三方评测经常把 Fable 5 与 Opus 4.8 对比，因此 Opus 4.8 应进入对比页。

### Claude Fable 5

本阶段样板模型。它适合高价值、长周期、需要跨文件/跨工具/跨阶段推进的工作；不适合作为普通问答、短文本生成或高吞吐低成本任务的默认模型。

## 案例精选与采用信号

> A 类精选只列入已经有具体原始证据 URL 和产物 URL 的样例。官方客户评价、平台接入和 benchmark 不进入 A 类精选。

### A 类案例精选

| 案例 | 使用者/作者 | 场景 | 证据等级 | 是否精选 | 说明 |
|---|---|---|---|---|---|
| LAAS 4x4km WebGPU 开放世界 | Braffolk | Three.js / WebGPU 长周期工程 | A | 是 | GitHub repo 明确说明项目约 99% 由 Fable 5 构建，并提供公开 demo |
| Backrooms 浏览器恐怖游戏 | StarKnightt | Next.js + Three.js 浏览器游戏 | A | 是 | Reddit 原帖、GitHub repo、Vercel demo 均可核验 |

### 非精选采用信号 / 背景资料

| 信号 | 使用者/作者 | 类型 | 证据等级 | 是否精选 | 说明 |
|---|---|---|---|---|---|
| GitHub Copilot 接入 Fable 5 | GitHub | 开发者工具平台接入 | B | 否 | 官方 changelog，有内部基准和可用性说明，但不是具体终端产物案例 |
| TrueFoundry AI Gateway 接入 Fable 5 | TrueFoundry | 企业网关/治理/成本控制 | B | 否 | 官方产品文章，有接入路径和代码调用说明，但不是客户落地结果 |
| Endor Labs Agent Security League 评测 | Endor Labs | 安全修复 benchmark | C | 否 | 是评测/benchmark，不是案例；用于风险和能力边界 |

## 使用建议

### 优先使用 Fable 5 的场景

- 大型代码迁移、跨文件重构、长周期 agentic coding。
- 需要模型在多轮中维护计划、状态、验证线索和错误修正的工程任务。
- 复杂文档、PDF、图表、表格、代码库混合分析。
- 高价值研究或战略分析，错误成本高于 token 成本。
- 需要把任务拆成阶段并持续推进的异步工作流。

### 不建议默认使用 Fable 5 的场景

- 普通问答、短文案、摘要、改写。
- 高吞吐、低价值、成本敏感任务。
- 对 zero data retention 有硬性要求的企业场景。
- 容易触发网络安全、生物化学、蒸馏、前沿模型研发等安全分类器的任务。
- 需要确定低延迟响应的交互式产品。

## 风险

| 风险 | 说明 | 处理 |
|---|---|---|
| 数据保留 | Fable 5 / Mythos 5 有 30 天数据保留要求，不属于 ZDR 模型 | 企业页和模型卡必须显式提示 |
| 安全分类器 | 高风险领域请求可能被拒答或 fallback | 集成方必须处理 `stop_reason: refusal` 和 fallback |
| 成本 | $10/M input、$50/M output，高于多数日常模型 | 只用于高价值任务，网关层设预算 |
| 可用性波动 | 2026-06 中旬曾因出口管制出现接入暂停/调整 | 网站需维护 `availability_status` |
| 案例证据不足 | 公开 A 类案例目前以个人/开发者 demo 为主，企业生产案例不足 | 不把官方评价包装成真实案例 |
| 重复旧页 | Wiki 中有两个 Claude 分支和两个 Fable 5 页面 | 建立重复页映射，不删除旧页 |

## 来源

- Anthropic 官方发布：`https://www.anthropic.com/news/claude-fable-5-mythos-5`
- Claude API 文档：`https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5`
- System Card PDF：`https://www-cdn.anthropic.com/d00db56fa754a1b115b6dd7cb2e3c342ee809620.pdf`
- GitHub Copilot changelog：`https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/`
- Microsoft Foundry 发布：`https://azure.microsoft.com/en-us/blog/claude-fable-5-is-now-available-in-microsoft-foundry-powering-the-next-era-of-autonomous-agents/`
- 旧 Wiki 主 Claude Fable 5 卡：`https://ycn3zdw6f1p7.feishu.cn/wiki/HjnHwqz9DiBMP4kT2Y0cNEuzndg`
- 旧 Wiki 重复 Claude Fable 5 卡：`https://ycn3zdw6f1p7.feishu.cn/wiki/W1DswisDliVQNekH0bzcrEIEn1n`

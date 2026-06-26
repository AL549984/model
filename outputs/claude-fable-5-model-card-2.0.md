# Claude Fable 5：把 Mythos 级能力开放给长周期知识工作，但代价是成本、保留和安全边界

> 页面类型：模型卡 2.0 样板  
> 页面路径建议：`/models/claude-fable-5`  
> 所属厂商页：`/vendors/anthropic`  
> 旧 Wiki 主卡：`https://ycn3zdw6f1p7.feishu.cn/wiki/HjnHwqz9DiBMP4kT2Y0cNEuzndg`  
> 重复旧卡：`https://ycn3zdw6f1p7.feishu.cn/wiki/W1DswisDliVQNekH0bzcrEIEn1n`  
> 样板状态：Draft，可进入人工事实复核

## 30 秒结论

Claude Fable 5 是 Anthropic 在 2026-06-09 发布的公开 Mythos-class 模型，定位不是“更贵的日常聊天模型”，而是为长周期 agentic coding、复杂知识工作、深度研究、视觉/文档理解准备的高价值模型。它与 Claude Mythos 5 能力同源，但 Fable 5 带有安全分类器、fallback 和 30 天数据保留要求。

一句话建议：只有当任务足够长、足够复杂、错误成本足够高时，Fable 5 才值得优先调用；普通问答、短文案和高吞吐场景应继续使用更便宜、更稳定的 Claude/其他模型。

## 基本信息

| 字段 | 内容 | 证据状态 |
|---|---|---|
| 模型名称 | Claude Fable 5 | 官方 + 旧卡一致 |
| 厂商 | Anthropic | 官方 + 旧卡一致 |
| 发布日期 | 2026-06-09 | 官方发布页 / API 文档 |
| API model ID | `claude-fable-5` | API 文档 |
| 模型等级 | Mythos-class，公开可用版本 | 官方发布页 |
| 相关模型 | Claude Mythos 5 | 官方发布页 / API 文档 |
| 输入模态 | 文本、图像、文件/文档类输入 | 官方文档需进一步细分 |
| 输出模态 | 文本 | 官方文档 |
| 上下文 | 1M tokens | API 文档 |
| 最大输出 | 最高 128K tokens / request | API 文档 |
| Thinking | Adaptive thinking 默认/始终开启；不支持关闭 | API 文档 |
| 价格 | $10 / 1M input tokens；$50 / 1M output tokens | 官方发布/API 文档；平台价格需复核 |
| 数据保留 | 30 天；不支持 zero data retention | API 文档 |
| 权重开放 | 闭源，API/平台调用 | 官方公开状态 |
| 可用平台 | Claude API、AWS/Bedrock、Vertex AI、Microsoft Foundry；GitHub Copilot 曾发布接入并有暂停说明 | 官方/API/平台公告 |
| 旧 Wiki 状态 | 有主卡、重复卡、官网全文子文档 | 已读取 |

## 模型谱系位置

Claude Fable 5 位于 Claude Opus 4.x 之上，是 Anthropic 对外开放的 Mythos-class 通用模型。它不是 Claude 3.7 Sonnet 那类“把 reasoning 融入主线”的渐进升级，也不是 Opus 4.x 的普通迭代；它更像 Anthropic 把受限 Mythos 能力做成公开可用版本。

谱系关系：

```text
Claude Instant / Claude 2
  -> Claude 3 / 3.7 Sonnet
  -> Claude 4 / Opus 4.x
  -> Claude Fable 5 公开可用 Mythos-class
  -> Claude Mythos 5 受限可信访问版本
```

关键差异：

- Fable 5 与 Mythos 5 能力同源，但 Fable 5 有安全分类器。
- Mythos 5 面向 Project Glasswing 等受限可信访问，不是普通开发者默认可用模型。
- Fable 5 的公开可用性伴随新的数据保留、拒答和 fallback 工程要求。

## 关键能力判断

### 1. 长周期 agentic coding 是核心看点

Fable 5 的价值集中在长任务：跨文件、跨工具、跨阶段、有计划、有验证的工程工作。公开 demo 中，LAAS WebGPU 开放世界和 Backrooms 浏览器游戏都体现了它能把复杂前端/3D/交互任务推进到可运行产物。

### 2. 知识工作和文档视觉理解是第二个重心

官方和平台资料都强调 Fable 5 面向复杂知识工作、文档、PDF、图表、表格和多阶段研究。它适合“读很多材料后做判断”的任务，而不是只生成一段短回答。

### 3. 安全分类器是产品能力，也是产品摩擦

Fable 5 的安全设计不是后台细节。API 会把部分请求作为成功 HTTP 200 但以 `stop_reason: refusal` 返回，并要求开发者处理 fallback。对企业和开发者来说，这会影响产品可靠性、用户体验和成本估算。

### 4. 成本决定它必须被精确路由

$10 / $50 的价格使它不适合大规模替代日常模型。它应该作为“高难任务升级路径”：前置用便宜模型筛选/整理，只有在复杂度或价值超过阈值时才升级到 Fable 5。

## 官方评测怎么读

### 可以参考的部分

- 官方 System Card 中的软件工程、长上下文、专业文档、金融/研究类评测，能说明 Fable 5 的目标能力区间。
- Anthropic 早期客户反馈能提示产品方向：CursorBench、GitHub long-horizon coding、金融/法律/研究场景。
- 第三方 Endor Labs 评测能补充负面视角：在安全修复 benchmark 中，Fable 5 并没有无条件领先，还出现超时和“cheating”判定。

### 不应过度解读的部分

- benchmark 不是真实案例，不能放进“真实案例精选”。
- 官方客户评价不是可复现产物证据，最多作为 B 类线索。
- Mythos 5 的高风险领域能力不能直接外推到 Fable 5，因为 Fable 5 有安全分类器和 fallback。
- 平台接入公告不是最终用户落地案例。

## 真实案例精选

> 本区只放 A 类案例。当前可确认的 A 类案例主要是公开开发者 demo/repo，还不足以证明企业生产落地。

### A1. LAAS：Fable 5 构建 WebGPU 4x4km 开放世界

- 使用者/作者：Braffolk
- 原始证据 URL：`https://github.com/Braffolk/fable5-world-demo`
- 产物 URL：`https://dc5fzrbo8ssfx.cloudfront.net/laas/`
- 场景：Three.js / WebGPU / 长周期前端工程
- 任务：从简短项目 brief 出发，构建浏览器里的程序化开放世界
- 输出结果：公开 GitHub repo + 可访问 demo；repo README 说明架构、验证工具、工程文件结构
- 模型发挥点：规划架构、实现世界系统、写验证工具、维护工作记忆和调试记录
- 证据等级：A
- 进入精选：是
- 风险备注：作者自述“约 99% 由模型构建”，仍需通过 commit 记录/运行截图进一步复核人类参与比例

### A2. Backrooms Escape：Fable 5 构建浏览器恐怖游戏

- 使用者/作者：StarKnightt
- 原始证据 URL：`https://www.reddit.com/r/ClaudeAI/comments/1u29a22/claude_fable_5_built_an_entire_backrooms_escape/`
- 产物 URL：`https://backroom-escape.vercel.app/`
- 代码 URL：`https://github.com/StarKnightt/Backroom-Escape`
- 场景：Next.js / Three.js / 浏览器游戏
- 任务：构建可玩的第一人称 Backrooms 生存恐怖游戏
- 输出结果：公开 Vercel demo + GitHub repo；README 包含玩法、程序化音频、实体 AI、移动端支持、smoke tests 等说明
- 模型发挥点：复杂交互系统、程序化资产、移动端/桌面输入、测试脚本、性能和体验细节
- 证据等级：A
- 进入精选：是
- 风险备注：模型使用证据来自作者/README/Reddit 自述，未见独立第三方复核

## 适合场景

- 跨 repo 大型重构、代码迁移、测试补齐。
- 需要长期维护状态的 coding agent 工作流。
- 复杂产品原型：多模块、多交互、需要调试和验证。
- 长文档分析：PDF、表格、图表、报告、技术方案。
- 高价值决策分析：金融、法律、研究、战略，但必须保留人工审查。
- 需要先规划、再执行、再自检的异步任务。

## 不适合场景

- 日常聊天、短摘要、普通改写。
- 大规模低成本内容生成。
- 强监管且不能接受 30 天数据保留的业务。
- 对低延迟有硬要求的实时产品。
- 容易触发网络安全、生物/化学、模型蒸馏等安全分类器的任务。
- 需要稳定不拒答的生产路径，但没有 fallback 工程能力的应用。

## 和前代 / 竞品对比

| 对象 | Fable 5 的优势 | Fable 5 的劣势/注意 |
|---|---|---|
| Claude 3.7 Sonnet | 更适合长周期、多阶段、高复杂度任务 | 成本高很多，工程接入更复杂 |
| Claude Opus 4.8 | 官方定位为更高能力层，长任务优势更明显 | Opus 4.8 可能更适合低风险、成本可控的复杂任务 |
| Claude Mythos 5 | 公开可用性更高，适合一般开发者/企业 | Mythos 5 在部分高风险专业域限制更少，但不面向普通可用 |
| GPT-5.x / Gemini 3.x 等竞品 | 在 Claude 生态、长文档、agentic coding 上有强叙事 | 需要用真实任务、成本、延迟、拒答率横测，不可只看发布页 |

## 风险限制

| 风险 | 影响 | 建议 |
|---|---|---|
| 数据保留 | 无法满足 ZDR 场景 | 默认标红，进入企业选型必须先审查 |
| 安全分类器 | 请求可能拒答或 fallback | 应用必须处理 `refusal`、fallback、退款/缓存逻辑 |
| 价格 | 长任务 token 成本高 | 仅对高价值任务升级调用 |
| 可用性/政策 | 出口管制曾影响接入 | 维护 `availability_status` 和平台差异 |
| 公开案例不足 | 企业生产案例还不够 | 案例库中明确标注，不用官方评价冒充案例 |
| benchmark 分歧 | 官方与第三方评测结论不完全一致 | 模型卡同时展示正反证据 |

## 最终使用建议

开发者：把 Fable 5 当作“困难任务升级模型”，不要当默认模型。先用较便宜模型完成信息整理和初稿，遇到跨文件重构、长周期调试、复杂原型时再升级。

企业：先解决数据保留、fallback、成本上限和审计问题，再让 Fable 5 进入生产流程。它适合 pilot 高价值知识工作，不适合未治理的全员默认启用。

内容/研究团队：适合做深度资料分析和复杂报告，但输出必须人工复核，尤其是高风险领域与引用链。

## 来源证据

### 官方来源

- Anthropic 官方发布：`https://www.anthropic.com/news/claude-fable-5-mythos-5`
- Claude API 文档：`https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5`
- System Card PDF：`https://www-cdn.anthropic.com/d00db56fa754a1b115b6dd7cb2e3c342ee809620.pdf`

### 平台来源

- GitHub Copilot changelog：`https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/`
- Microsoft Foundry：`https://azure.microsoft.com/en-us/blog/claude-fable-5-is-now-available-in-microsoft-foundry-powering-the-next-era-of-autonomous-agents/`
- TrueFoundry AI Gateway：`https://www.truefoundry.com/blog/claude-fable-5-is-now-live-on-truefoundry-ai-gateway`

### 案例来源

- LAAS repo：`https://github.com/Braffolk/fable5-world-demo`
- LAAS demo：`https://dc5fzrbo8ssfx.cloudfront.net/laas/`
- Backrooms Reddit：`https://www.reddit.com/r/ClaudeAI/comments/1u29a22/claude_fable_5_built_an_entire_backrooms_escape/`
- Backrooms repo：`https://github.com/StarKnightt/Backroom-Escape`
- Backrooms demo：`https://backroom-escape.vercel.app/`

### 旧 Wiki 来源

- 主旧卡：`https://ycn3zdw6f1p7.feishu.cn/wiki/HjnHwqz9DiBMP4kT2Y0cNEuzndg`
- 官网全文子文档：`https://ycn3zdw6f1p7.feishu.cn/wiki/NA0XwAqFbiLkOnkDfI8cGIXengc`
- 重复旧卡：`https://ycn3zdw6f1p7.feishu.cn/wiki/W1DswisDliVQNekH0bzcrEIEn1n`

# Claude Fable 5 案例库样板

> 页面类型：模型案例库样板  
> 页面路径建议：`/cases/models/claude-fable-5`  
> 关联模型页：`/models/claude-fable-5`  
> 证据原则：只有 A 类可进入模型卡精选；B/C/D 只做候选、背景或剔除说明。

## 分级规则

| 等级 | 进入精选 | 说明 |
|---|---|---|
| A | 可以 | 有具体使用者/作者、任务、产物、原始证据 URL，且 repo/demo/产品页可公开核验 |
| B | 不默认 | 有主体和平台/产品接入证据，但缺少具体终端产物或业务结果 |
| C | 不可以 | benchmark、教程、介绍文、平台说明、官方发布文、媒体文章 |
| D | 不可以 | 集合页、SEO 内容、无法核验、自述过弱、无产物 |

## 精选案例

### 案例 A1：LAAS WebGPU 开放世界

| 字段 | 内容 |
|---|---|
| 案例名称 | LAAS：4x4km 程序化 WebGPU 开放世界 |
| 使用者/作者 | Braffolk |
| 原始证据 URL | `https://github.com/Braffolk/fable5-world-demo` |
| 产物 URL | `https://dc5fzrbo8ssfx.cloudfront.net/laas/` |
| 场景分类 | Agentic coding；Three.js；WebGPU；复杂前端工程 |
| 任务描述 | 以一份人类 brief 为输入，构建浏览器中运行的程序化开放世界，包括世界系统、渲染、验证工具和调试记录 |
| 输出结果 | 公开 GitHub repo；公开 demo；README 说明项目架构、模型工作记忆、验证 harness、TS/WebGPU 文件结构 |
| 模型发挥点 | 长周期自主规划；跨模块实现；工程验证；状态维护；调试迭代 |
| 证据等级 | A |
| 是否进入精选 | 是 |
| 风险备注 | 模型贡献比例来自作者自述；应在正式发布前抽检 commit 历史、运行截图和 demo 可用性 |

推荐展示文案：

> 一个可运行的 WebGPU 世界 demo，比“生成一个页面”更能检验长周期工程能力：架构、渲染、验证、调试都需要模型持续维护上下文。

### 案例 A2：Backrooms Escape 浏览器游戏

| 字段 | 内容 |
|---|---|
| 案例名称 | Backrooms Escape：浏览器第一人称恐怖游戏 |
| 使用者/作者 | StarKnightt |
| 原始证据 URL | `https://www.reddit.com/r/ClaudeAI/comments/1u29a22/claude_fable_5_built_an_entire_backrooms_escape/` |
| 产物 URL | `https://backroom-escape.vercel.app/` |
| 代码 URL | `https://github.com/StarKnightt/Backroom-Escape` |
| 场景分类 | Agentic coding；游戏原型；Next.js；Three.js |
| 任务描述 | 构建一个可玩的 Backrooms survival horror 浏览器游戏，包含迷宫、交互、实体 AI、音频、移动端支持和测试脚本 |
| 输出结果 | 公开 demo；公开 repo；README 说明玩法、程序化 PBR 贴图、WebAudio、实体行为、移动端和 smoke tests |
| 模型发挥点 | 多系统组合；程序化资产；输入/移动端适配；体验细节；测试与打包 |
| 证据等级 | A |
| 是否进入精选 | 是 |
| 风险备注 | 模型使用证据来自作者/社区自述；正式发布前应保存 Reddit 证据快照并抽检 repo activity |

推荐展示文案：

> 一个完整浏览器游戏样例，能展示 Fable 5 在多模块交互原型上的价值：它不是只写一个 demo 页面，而是把玩法、音频、实体、移动端和测试脚本一起组织起来。

## 候选案例 / 平台接入

### 案例 B1：GitHub Copilot 接入 Claude Fable 5

| 字段 | 内容 |
|---|---|
| 案例名称 | GitHub Copilot 模型选择器接入 Fable 5 |
| 使用者/作者 | GitHub |
| 原始证据 URL | `https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/` |
| 产物 URL | `https://github.com/features/copilot` |
| 场景分类 | 开发者工具；模型平台接入；agentic coding |
| 任务描述 | 在 Copilot Pro+、Max、Business、Enterprise 等体验中开放 Fable 5 选择，并说明 data retention 和管理员开关 |
| 输出结果 | 官方 changelog；支持 VS Code、Visual Studio、Copilot CLI、cloud agent 等入口；后续有暂停访问说明 |
| 模型发挥点 | GitHub 内部称其在 autonomous coding workflows 中减少工具调用和 token 消耗 |
| 证据等级 | B |
| 是否进入精选 | 否 |
| 风险备注 | 这是平台接入和内部测试，不是具体用户产物；且 2026-06-12 有暂停访问说明 |

### 案例 B2：TrueFoundry AI Gateway 接入 Claude Fable 5

| 字段 | 内容 |
|---|---|
| 案例名称 | TrueFoundry AI Gateway 支持 Fable 5 |
| 使用者/作者 | TrueFoundry |
| 原始证据 URL | `https://www.truefoundry.com/blog/claude-fable-5-is-now-live-on-truefoundry-ai-gateway` |
| 产物 URL | `https://www.truefoundry.com/ai-gateway` |
| 场景分类 | LLM gateway；企业治理；成本控制；fallback |
| 任务描述 | 通过统一 OpenAI-compatible API 调用 Fable 5，并在网关层提供权限、日志、成本和 fallback 控制 |
| 输出结果 | 官方产品文章；示例接入路径；模型 ID 命名空间和日志配置说明 |
| 模型发挥点 | 适合需要治理和 fallback 的生产调用路径 |
| 证据等级 | B |
| 是否进入精选 | 否 |
| 风险备注 | 不是终端客户案例；文章中的性能/业务收益需独立验证 |

### 案例 B3：Microsoft Foundry 接入 Claude Fable 5

| 字段 | 内容 |
|---|---|
| 案例名称 | Microsoft Foundry 上架 Fable 5 |
| 使用者/作者 | Microsoft Foundry Team |
| 原始证据 URL | `https://azure.microsoft.com/en-us/blog/claude-fable-5-is-now-available-in-microsoft-foundry-powering-the-next-era-of-autonomous-agents/` |
| 产物 URL | `https://ai.azure.com/` |
| 场景分类 | 企业模型平台；agent platform；治理与安全 |
| 任务描述 | 将 Fable 5 带入 Microsoft Foundry、Foundry Agent Service 与 GitHub Copilot 相关平台入口 |
| 输出结果 | 官方 Azure Blog；价格表；企业 use cases 和治理能力说明 |
| 模型发挥点 | 让企业在 Microsoft 平台中评估、部署和治理 Fable 5 |
| 证据等级 | B |
| 是否进入精选 | 否 |
| 风险备注 | 属于平台可用性，不是具体客户生产结果；同页也提示全球访问禁用/政策状态变化 |

## 背景资料 / 不进入案例

### 资料 C1：Endor Labs Agent Security League 评测

| 字段 | 内容 |
|---|---|
| 名称 | Claude Fable 5: Mythos-grade hype, record cheating, and a few hall-of-fame entries |
| 作者/机构 | Luca Compagna / Endor Labs |
| 原始证据 URL | `https://www.endorlabs.com/learn/claude-fable-5-mythos-grade-hype` |
| 产物 URL | `https://www.endorlabs.com/learn/claude-fable-5-mythos-grade-hype` |
| 场景分类 | Security benchmark；vulnerability fixing |
| 任务描述 | 在 200 个真实世界漏洞修复任务上评测 Claude Fable 5 |
| 输出结果 | FuncPass 59.8%、SecPass 19.0%；报告记录超时和 cheating 判定 |
| 模型发挥点 | 可用于风险解读和 benchmark 对照 |
| 证据等级 | C |
| 是否进入精选 | 否 |
| 风险备注 | Benchmark/评测不是真实案例，不能作为精选案例；但应进入“官方评测怎么读/风险限制” |

### 资料 C2：Simon Willison 初始体验

| 字段 | 内容 |
|---|---|
| 名称 | Initial impressions of Claude Fable 5 |
| 作者/机构 | Simon Willison |
| 原始证据 URL | `https://simonwillison.net/2026/Jun/9/claude-fable-5/` |
| 产物 URL | `https://simonwillison.net/2026/Jun/9/claude-fable-5/` |
| 场景分类 | 开发者观察；模型解读 |
| 任务描述 | 解读 Fable 5 / Mythos 5 的上下文、价格、guardrails 和 fallback |
| 输出结果 | 开发者视角的初步判断 |
| 模型发挥点 | 有助于解释 integration risk |
| 证据等级 | C |
| 是否进入精选 | 否 |
| 风险备注 | 不是产物案例；不能放入模型卡精选 |

## 明确剔除 / 暂不收录

| 来源类型 | 原因 |
|---|---|
| “awesome Claude Fable 5”集合页 | 集合页本身不是原始案例；只能作为发现线索 |
| YouTube 总评/教程类视频 | 多数缺少可核验 repo/demo 或时间点；若后续有具体 repo，可拆成单条案例 |
| SEO 介绍文 | 没有具体主体、任务、产物、证据链 |
| 官方发布文 | 是背景资料，不是案例 |
| GitHub topics 页面 | 集合页，不是原始案例 |

## 样板结论

当前 Claude Fable 5 已有少量 A 类公开开发者 demo，可支撑模型卡的“真实案例精选”区块。但企业生产级 A 类案例不足，平台接入和官方客户评价只能作为 B 类线索或厂商页的“采用信号”，不能当作网站传播精选。

下一步案例工作：

1. 固化 A 类案例截图和 demo 可用性检查。
2. 从 Anthropic 官方早期反馈中逐条追踪是否有独立案例页或产品证据。
3. 对 YouTube / Reddit / GitHub 线索做二次核验，只收 repo/demo/product URL 完整的条目。
4. 将 Endor Labs 等 benchmark 放入评测表，不混进案例库精选。

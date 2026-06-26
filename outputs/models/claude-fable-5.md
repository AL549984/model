# Claude Fable 5：Mythos 级长周期 Agentic Work 的公开样板

> Phase 3A model card  
> publishability: `Publishable`  
> generated_at: 2026-06-25

## 30 秒结论

Claude Fable 5 是当前项目中证据最完整的 Model Atlas 2.0 样板：官方发布、API 信息、谱系位置、风险限制和 8 条 A 类公开案例都已经成型。它适合做 Phase 3A 的 anchor card。

## 基本信息

- 厂商：Anthropic / Claude
- 发布时间：2026-06-09
- 模型 ID：claude-fable-5
- 上下文：1M tokens
- 输出：128K tokens
- 模态：text/image input, text output
- 是否推理模型：是，adaptive thinking always on；不能关闭 thinking
- 价格：$10 / 1M input tokens, $50 / 1M output tokens
- 可用平台：Claude API, Claude Platform on AWS, Amazon Bedrock, Google Vertex AI, Microsoft Foundry；部分平台可用性需复核
- 官方链接：https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5

## 它在厂商模型谱系中的位置

Fable 5 位于 Claude Opus 4.x 之后，是 Anthropic 将 Mythos-class 能力做成广泛发布版本的关键节点。它与 Claude Mythos 5 能力同源，但 Fable 5 带有安全分类器、拒答、fallback、30 天数据保留和非 ZDR 限制。

## 关键能力判断

- 长周期 agentic coding：公开案例显示它能维持多模块工程上下文，而不只是生成单文件 demo。
- 复杂知识工作：官方早期反馈和 docs 将其定位到 demanding reasoning、research synthesis、document-heavy workflows。
- 工具和工程验证：适合需要规划、代码实现、调试、运行检查和文档产出的任务链。
- 多模态输入：支持图像/PDF/表格/图表理解，但输出仍是文本。

## 官方评测怎么读

官方 benchmark 能说明它在 coding、knowledge work、research 和 agentic tasks 上的定位，但模型卡不能只堆分数。Phase 3A 解读重点是：Fable 5 的边界推进在于更长任务链、更强工具协作和更稳定工程上下文，而不是单项分数。

## 真实案例精选

- A：LAAS WebGPU Open World，Braffolk，repo + live demo，展示长周期 WebGPU/Three.js 工程。
- A：World of ClaudeCraft，next-choken / levy-street，Reddit + repo + site，展示 browser MMORPG 多系统工程。
- A：Midwinter DOS reverse engineering，Reddit + video + project site，展示逆向工程和证据 ledger。
- A：ComfyUI KJNodes PR，GitHub PR，展示开源代码贡献与人类测试协作。

## 适合场景

- 长周期代码代理任务
- 复杂文档/代码库分析
- 高价值原型和研究工作流
- 需要上下文保持和工具协作的任务

## 不适合场景

- 低成本批量生成
- 严格 zero data retention 场景
- 不能接受拒答/fallback 的自动化链路
- 需要确定地域/平台可用性的生产部署但尚未复核

## 和前代 / 竞品对比

相对 Claude Opus 4.x，Fable 5 的核心变化是公开 Mythos-class 能力和更长周期 agentic work 定位；相对 GPT-5.5 xHigh / Gemini 3.x / DeepSeek V3.2，它的优势是当前已有更强公开案例库，但成本、保留和 safety/fallback 风险更明显。

## 风险和限制

- 30 天数据保留，非 ZDR。
- 高风险请求可能拒答或 fallback。
- 价格高，不适合低价值高频调用。
- 公开 A 类案例仍偏开发者 demo，企业生产级案例需要继续补证。

## 一句话使用建议

开发者和研究团队可以把 Fable 5 当作长周期 agentic work 的高端候选；企业生产前必须先验证数据保留、fallback、平台可用性和成本。

## 来源和证据

- Anthropic release: https://www.anthropic.com/news/claude-fable-5-mythos-5
- Claude API docs: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5
- Case library v2: ../claude-fable-5-case-library-v2.md
- Phase 1 model card: ../claude-fable-5-model-card-2.0.md

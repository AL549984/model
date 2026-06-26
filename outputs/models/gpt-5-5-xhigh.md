# GPT-5.5 xHigh：OpenAI 最高推理强度下的专业工作模型，而不是独立新模型

> Phase 3A model card  
> publishability: `Limited`  
> generated_at: 2026-06-25

## 30 秒结论

GPT-5.5 xHigh 值得进入 Phase 3A，因为它是 OpenAI 当前专业工作和 coding/reasoning 的高端对照点。但它应写成 GPT-5.5 的 xHigh 推理强度配置，而不是伪造一个独立模型。

## 基本信息

- 厂商：OpenAI
- 发布时间：2026-04 左右发布 GPT-5.5；xHigh 是 reasoning.effort 设置，不是单独发布模型
- 模型 ID：gpt-5.5 + reasoning.effort=xhigh
- 上下文：1M tokens
- 输出：128K tokens
- 模态：text/image input, text output
- 是否推理模型：是；GPT-5.5 支持 none/low/medium/high/xhigh reasoning.effort
- 价格：GPT-5.5 base API price: $5 / 1M input tokens, $30 / 1M output tokens；xHigh 会增加延迟和推理成本，应通过 eval 证明收益
- 可用平台：OpenAI API, Codex, ChatGPT；具体产品可用性和 xHigh 映射需按官方 docs/产品面复核
- 官方链接：https://developers.openai.com/api/docs/models/gpt-5.5

## 它在厂商模型谱系中的位置

GPT-5.5 位于 GPT-5.4 之后，是 OpenAI 面向复杂专业工作、coding、research、data analysis 的当前 frontier family。xHigh 是 reasoning effort 轴，Phase 1.5 规范中应作为 variant_id 或配置记录。

## 关键能力判断

- 复杂专业工作：官方介绍强调 coding、research、data analysis、document-heavy tasks。
- 长上下文和大输出：官方模型页列出 1M context 和 128K max output。
- 更强推理配置：xHigh 适合在 eval 显示收益时用于更难任务。
- 工具/agent 工作流：官方 reasoning docs 将 GPT-5.5 定位到 multi-step agentic workflows 和 Codex CLI。

## 官方评测怎么读

官方发布文给出 GDPval、OSWorld-Verified、Tau2-bench Telecom、Terminal-Bench 等分数；模型卡应把这些读成 professional work 和 computer-use/agentic workflow 的信号，而不是直接等同真实用户案例。

## 真实案例精选

- 当前没有结构化 A 类案例库。
- 官方发布文包含客户评价和内部案例，如 K-1 税表流程、comms 自动化、研究数据分析，但这些还没有拆成 evidence intake rows。
- 因此本卡只能 Limited 发布，并在页面顶部提示公开可核验案例不足。

## 适合场景

- 复杂 coding/research/data workflows
- 需要高推理强度的 agentic task
- 长上下文专业材料处理
- 作为 OpenAI vs Claude/Gemini/DeepSeek 的对比锚点

## 不适合场景

- 低延迟/低成本任务
- 没有 eval 证明 xHigh 收益的场景
- 把 xHigh 当独立模型 ID 的数据结构
- 需要 A 类公开案例支撑但尚未补证的传播页

## 和前代 / 竞品对比

相对 GPT-5.4，GPT-5.5 官方称更强、更持久、更适合复杂专业工作；相对 Claude Fable 5，OpenAI 有更强官方企业叙事，但当前本项目还缺 A 类案例库；相对 Gemini 3 Pro Preview，GPT-5.5 仍是活跃 API 模型，而 Gemini 3 Pro Preview 已停用。

## 风险和限制

- xHigh 不是单独模型，数据表要避免误建 model_id。
- 官方客户评价不是 A 类案例。
- xHigh 增加延迟/成本，不能默认推荐。
- 公开案例库未补，Limited 发布。

## 一句话使用建议

把 GPT-5.5 xHigh 用作 OpenAI 高端专业工作对照模型；模型卡正文可以先 Limited 发布，但进入网站重点位前必须补 evidence rows 和案例快照。

## 来源和证据

- OpenAI model docs: https://developers.openai.com/api/docs/models/gpt-5.5
- OpenAI latest model guide: https://developers.openai.com/api/docs/guides/latest-model
- OpenAI GPT-5.5 release: https://openai.com/index/introducing-gpt-5-5/
- Reasoning models docs: https://developers.openai.com/api/docs/guides/reasoning

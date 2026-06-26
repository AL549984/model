# Gemini 3 Pro Preview：已经停用的 Gemini 3 预览锚点，不应作为新发布模型页

> Phase 3A model card  
> publishability: `Hold`  
> generated_at: 2026-06-25

## 30 秒结论

这张卡的价值是纠偏：Phase 2.5 把 Gemini 3 Pro Preview 列为 P0，但官方文档显示它已经 shut down，并要求迁移到 Gemini 3.1 Pro Preview。因此 Phase 3A 不应把它作为可发布模型页，只能 HOLD 或作为 Archive / migration note。

## 基本信息

- 厂商：Google / Gemini
- 发布时间：Preview；Google 官方迁移公告显示 2026-03-09 停用
- 模型 ID：gemini-3-pro-preview
- 上下文：已停用；历史规格不再作为生产建议
- 输出：已停用；历史规格不再作为生产建议
- 模态：multimodal preview；当前应迁移到 Gemini 3.1 Pro Preview
- 是否推理模型：是，Gemini 3 系列属于 thinking/reasoning 方向；但此 preview 已退役
- 价格：不适用；已停用
- 可用平台：Gemini API / AI Studio 历史 preview；已于 2026-03-09 迁移/停用
- 官方链接：https://ai.google.dev/gemini-api/docs/models/gemini-3-pro-preview

## 它在厂商模型谱系中的位置

Gemini 3 Pro Preview 是 Gemini 3 系列的历史预览节点，后续由 Gemini 3.1 Pro Preview 取代。正式 Phase 3 应把 Gemini 3.1 Pro Preview 作为 Google P0，而不是继续写已停用 preview。

## 关键能力判断

- 历史定位：state-of-the-art reasoning model with advanced multimodal understanding。
- 迁移价值：它能说明 Google preview 生命周期和版本迁移策略。
- 对比价值：可作为 Gemini 3.1 Pro Preview 的前代，不适合作为当前代表模型。

## 官方评测怎么读

历史 benchmark 不应作为当前模型推荐依据。官方 lifecycle 和 shutdown 信息比旧评测更重要。

## 真实案例精选

- No verified public A cases should be collected for active website model page.
- 任何历史案例都应转到 Archive 或 migration notes，除非明确需要解释 Gemini 3 -> 3.1 的迁移。

## 适合场景

- Archive
- Gemini 生命周期说明
- 解释为什么 P0 应改为 Gemini 3.1 Pro Preview

## 不适合场景

- 当前生产部署
- 网站重点模型页
- 新案例库建设
- 与活跃模型同台推荐

## 和前代 / 竞品对比

Gemini 3.1 Pro Preview 是它的后继。相对 GPT-5.5 / Claude Fable 5 / DeepSeek V3.2，这个模型现在不应进入活跃 P0 卡。

## 风险和限制

- 如果继续写成活跃模型，会误导读者。
- 所有使用建议都应转向 Gemini 3.1 Pro Preview。
- 旧 Wiki/Phase 2.5 候选需要修正。

## 一句话使用建议

不要发布为活跃模型卡；将其标 HOLD，并在 Phase 3A QA 中建议替换为 Gemini 3.1 Pro Preview。

## 来源和证据

- Gemini 3 Pro Preview model page: https://ai.google.dev/gemini-api/docs/models/gemini-3-pro-preview
- Migration discussion: https://discuss.ai.google.dev/t/migrate-from-gemini-3-pro-preview-to-gemini-3-1-pro-preview-before-march-9-2026/127062
- Gemini 3.1 Pro Preview model page: https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview
- Gemini API models list: https://ai.google.dev/gemini-api/docs/models

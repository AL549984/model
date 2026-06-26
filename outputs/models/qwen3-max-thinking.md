# Qwen3 Max Thinking：Qwen3 旗舰 reasoning 变体，先 Limited 再补证

> Phase 3A model card  
> publishability: `Limited`  
> generated_at: 2026-06-25

## 30 秒结论

Qwen3 Max Thinking 是 Qwen / Alibaba 在 Phase 3A 里最适合代表 thinking/reasoning 路线的候选。但官方资料与 Model Studio API ID、价格、context 还需要快照，所以只能 Limited。

## 基本信息

- 厂商：Qwen / Alibaba
- 发布时间：2026-01 左右公开资料出现；准确发布日期需以 Qwen / Alibaba 官方页快照为准
- 模型 ID：qwen3-max-thinking；Alibaba Cloud Model Studio API ID 待核验
- 上下文：官方未披露 / 待核验；Qwen3 系列和 Model Studio 支持 thinking budget 与长上下文能力，但本模型具体 context 需源确认
- 输出：官方未披露 / 待核验
- 模态：text reasoning；是否支持多模态需以具体 Model Studio 条目为准
- 是否推理模型：是；Qwen3 Max Thinking 是 flagship reasoning model，Qwen docs 也说明 Qwen3 支持 thinking budget / thinking modes
- 价格：待 Model Studio 价格页核验
- 可用平台：Qwen / Alibaba Cloud Model Studio；其他第三方平台不作为 canonical source
- 官方链接：https://qwen.ai/blog?id=qwen3-max-thinking

## 它在厂商模型谱系中的位置

它位于 Qwen3 Max 之上或旁支，是 Max 系列的 thinking/test-time scaling 变体。按照 Phase 1.5 命名规范，slug 固定为 qwen3-max-thinking，不能和 qwen3-max 合并。

## 关键能力判断

- 旗舰 reasoning：Qwen 官方博客称其为 latest flagship reasoning model。
- adaptive tool use / test-time scaling：官方和 Alibaba Cloud 资料强调高级推理、工具使用和 test-time compute。
- thinking budget 生态：Qwen docs 显示 Qwen3 支持 thinking budget，尤其 Model Studio API 有相关能力。
- 对比价值：适合作为 Claude/OpenAI/Gemini/DeepSeek 之外的中国厂商 frontier thinking 对照。

## 官方评测怎么读

官方博客和社区文章会强调强 benchmark，但 Phase 3A 不能把 benchmark 当真实案例。模型卡应解释它在 reasoning/tool-use 方向的意义，同时明确缺少公开 A 类案例库。

## 真实案例精选

- No verified public A cases found in current project outputs.
- Qwen 官方博客、Alibaba Cloud Community、YouTube 初测和 Reddit 讨论都属于 C/B 线索，不进精选。
- Phase 3B 需要追到具体 repo/demo/product artifact 后才能升级案例状态。

## 适合场景

- 复杂推理任务
- tool-use / agentic workflow 测试
- Qwen 生态模型对比
- 中英文 reasoning 能力评估

## 不适合场景

- 需要明确 API ID/价格/context 的生产部署但尚未核验
- 需要 A 类公开案例支撑的传播精选
- 把 Qwen3 Max 和 Max Thinking 混成同一模型
- 把 benchmark/介绍文当案例

## 和前代 / 竞品对比

相对 Qwen3 Max，它强调 thinking/test-time scaling；相对 DeepSeek V3.2，它更像 closed flagship reasoning 变体；相对 GPT-5.5 xHigh，它同样需要区分 base model 与 thinking/effort 轴。

## 风险和限制

- 准确发布日期、API ID、context、价格仍需官方快照。
- 当前 case_status 是 platform_only。
- 社区 benchmark 和介绍文不能当 A 类案例。
- 第三方平台命名不可作为 canonical source。

## 一句话使用建议

适合作为 Qwen 线第一张 Limited 模型卡；先冻结 slug 和谱系，Phase 3B 再补案例证据。

## 来源和证据

- Qwen official blog: https://qwen.ai/blog?id=qwen3-max-thinking
- Qwen3 Max blog: https://qwen.ai/blog?id=qwen3-max
- Qwen docs quickstart: https://qwen.readthedocs.io/en/latest/getting_started/quickstart.html
- Alibaba Cloud Model Studio model list: https://www.alibabacloud.com/help/en/model-studio/models

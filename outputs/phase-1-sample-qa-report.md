# Phase 1 样板自检报告

> 检查对象：Anthropic / Claude Fable 5 Model Atlas 2.0 样板  
> 检查文件：  
> - `anthropic-vendor-page.md`  
> - `claude-fable-5-model-card-2.0.md`  
> - `claude-fable-5-case-library.md`  
> - `website-prototype-ia.md`  
> 检查结论：PASS with caveats

## 1. 交付物检查

| 要求 | 文件 | 状态 | 说明 |
|---|---|---|---|
| Anthropic 厂商页 2.0 | `anthropic-vendor-page.md` | PASS | 包含厂商定位、模型家族、时间线、关键拐点、模型列表、代表模型、案例精选、使用建议、风险 |
| Claude Fable 5 新版模型卡 | `claude-fable-5-model-card-2.0.md` | PASS | 包含 30 秒结论、基本信息、谱系、能力判断、评测解读、案例、场景、对比、风险、建议、来源 |
| Claude Fable 5 案例库 | `claude-fable-5-case-library.md` | PASS | 每条均有证据 URL / 产物 URL / 等级 / 是否精选 / 风险备注 |
| 网站样板 IA | `website-prototype-ia.md` | PASS | 包含首页、厂商页、模型详情页、案例库页，并给出 Claude Fable 5 路径 |
| 自检报告 | `phase-1-sample-qa-report.md` | PASS | 本文件 |

## 2. 蓝图标准检查

| 蓝图标准 | 检查结果 | 说明 |
|---|---|---|
| 不全量扩展 | PASS | 只处理 Anthropic / Claude Fable 5 |
| 不重写 107 个模型卡 | PASS | 未批量处理其他模型 |
| 不删除旧文档 | PASS | 所有旧 Wiki 只作为回链和来源 |
| Archive / Raw Cards 关系明确 | PASS | 厂商页与模型卡均保留旧 Wiki 回链 |
| 新版模型卡结构成立 | PASS | 内容不再只是旧卡摘要，而是加入谱系、判断、案例、风险 |
| 厂商页结构成立 | PASS | Claude 父页从空目录升级为模型家族入口 |
| 案例库 A/B/C/D 成立 | PASS | A 类与 B/C 类明确分区 |
| 网站 IA 成立 | PASS | 四类页面都有路径与模块 |

## 3. 弱证据检查

### 3.1 进入精选的 A 类案例

| 案例 | 证据 URL | 产物 URL | 是否可公开核验 | 结论 |
|---|---|---|---|---|
| LAAS WebGPU 开放世界 | `https://github.com/Braffolk/fable5-world-demo` | `https://dc5fzrbo8ssfx.cloudfront.net/laas/` | 是 | A 类可精选 |
| Backrooms Escape | `https://www.reddit.com/r/ClaudeAI/comments/1u29a22/claude_fable_5_built_an_entire_backrooms_escape/` | `https://backroom-escape.vercel.app/` + repo | 是 | A 类可精选 |

风险：

- 两个 A 类案例都主要依赖作者自述模型参与程度。
- 它们是公开开发者/creator demo，不是企业生产落地。
- 正式发布前应保存网页快照、检查 repo commit/activity、运行 demo 截图。

### 3.2 未进入精选的 B/C 类证据

| 来源 | 等级 | 为什么不进精选 |
|---|---|---|
| GitHub Copilot changelog | B | 平台接入 + 内部测试，不是具体用户产物 |
| TrueFoundry AI Gateway | B | 产品接入说明，不是客户结果 |
| Microsoft Foundry | B | 平台可用性，不是具体客户案例 |
| Endor Labs | C | benchmark/评测，不是真实案例 |
| Simon Willison | C | 开发者解读，不是产物案例 |

结论：没有把 benchmark、教程、集合页、官方发布文包装成真实案例。

## 4. 是否仍像旧模型卡

| 旧模型卡问题 | 样板处理 | 状态 |
|---|---|---|
| 只写模型是什么 | 增加谱系位置、关键能力判断、适合/不适合场景 | 改进 |
| 来源链接不显式 | 单独来源证据区，按官方/平台/案例/旧 Wiki 分组 | 改进 |
| 没有真实案例 | 增加 A/B/C 分级案例库和模型卡精选 | 改进 |
| 厂商页为空 | Anthropic 页加入模型家族、时间线、拐点和风险 | 改进 |
| 风险写得太晚 | 数据保留、fallback、成本、政策风险前置 | 改进 |
| 不能横向比较 | 加入 Claude 3.7、Opus 4.8、Mythos 5、竞品对比框架 | 改进 |

结论：样板不再像旧模型卡的资料摘要，已经具备 Model Atlas 2.0 的产品结构。

## 5. 来源事实检查

| 事实 | 来源 | 状态 |
|---|---|---|
| 发布时间 2026-06-09 | Anthropic 发布页 / API 文档 / 旧卡 | PASS |
| API ID `claude-fable-5` | Claude API 文档 | PASS |
| 1M context / 128K output | Claude API 文档 / 旧卡 | PASS |
| $10 input / $50 output | Claude API 文档 / 发布页 / 旧卡 | PASS |
| 30 天数据保留 / 非 ZDR | Claude API 文档 / GitHub changelog | PASS |
| Fable 5 与 Mythos 5 同源但 safeguards 不同 | Anthropic 发布页 / API 文档 | PASS |
| GitHub Copilot 暂停说明 | GitHub changelog | PASS |
| 两个 Claude Fable 5 旧卡 | Wiki 读取 | PASS |

## 6. 样板是否 PASS

结论：PASS with caveats。

通过原因：

- 5 个指定产物均已创建。
- 没有扩展到全部厂商或 107 个模型。
- 没有删除或改写旧 Wiki。
- 案例库严格分级，A 类案例有 repo/demo 或原帖。
- 模型卡、厂商页、网站 IA 都能直接进入飞书 Wiki 或内容仓库。

caveats：

- A 类案例目前偏开发者 demo，企业生产案例不足。
- Claude Fable 5 存在政策/可用性波动，应在页面顶部维护状态。
- 旧 Wiki 重复 Claude 分支尚未正式合并，只在样板中标注。
- Bitable 107 行与 Wiki 148 页差异仍需后续映射表解决。

## 7. 下一步要修的问题

### 进入全量扩展前必须完成

1. 导出 Bitable 全字段和 107 行记录。
2. 建立 `legacy_pages` 映射表，解释 148 Wiki 子卡与 107 模型记录的差异。
3. 对两个 Claude Fable 5 旧卡做逐段 diff，确定主卡、重复卡、合并策略。
4. 为 A 类案例保存证据快照：repo、demo、Reddit 原帖、运行截图。
5. 为企业/平台 B 类证据追踪独立案例页，不能停留在平台公告。
6. 将 Endor Labs 等 benchmark 写入评测表，不混入案例表精选。
7. 建立模型可用性状态字段，记录 GitHub/Microsoft/Anthropic access 变化。

### 可以进入下一轮样板的候选

- OpenAI / GPT-5.x：用于验证闭源旗舰模型对比页。
- Google / Gemini 3.x：用于验证多模态长上下文厂商页。
- DeepSeek：用于验证开源/开放权重与 reasoning-first 模型卡。
- Qwen：用于验证 Bitable 厂商内序号和多版本模型的映射。

### 暂不做

- 不批量重写 107 条模型记录。
- 不删除或合并旧 Wiki 页面。
- 不把所有 Reddit/YouTube 线索直接收进案例库。
- 不把官方发布文、benchmark、集合页当真实案例。

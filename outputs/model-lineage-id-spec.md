# Model Lineage ID Spec

> Phase 1.5 deliverable  
> Purpose: 冻结模型谱系 ID、模型卡 URL、旧 Wiki 标题映射和案例库关联方式。  
> Scope: 适用于 Model Atlas 2.0 全量扩展。

## 1. ID 层级

| ID | 用途 | 示例 |
|---|---|---|
| vendor_id | 厂商稳定 ID | anthropic |
| family_id | 模型家族 ID | claude-5-mythos |
| model_id | 模型页稳定 ID | claude-fable-5 |
| variant_id | 同模型变体 ID | gpt-5-high |
| provider_model_id | API 或平台原始模型 ID | claude-fable-5 |
| aa_model_id | Artificial Analysis ID | artificial-analysis:claude-fable-5 |
| legacy_wiki_id | 旧 Wiki 页面 token 或标题 slug | HjnHwqz9DiBMP4kT2Y0cNEuzndg |

## 2. Slug 生成规则

1. 全部小写。
2. 空格、斜杠、下划线、点号统一转为 `-`。
3. 去掉注册商标、括号、逗号等展示符号。
4. 数字版本保留为数字段：`4.8` 转 `4-8`。
5. 厂商名不默认放进 model_id，除非模型名本身冲突。
6. 同名冲突时追加厂商前缀：例如 `openai-o3`、`deepseek-o3`。
7. 模型卡 URL 固定为 `/models/{model_id}`。
8. 厂商页 URL 固定为 `/vendors/{vendor_id}`。
9. 模型案例库 URL 固定为 `/cases/models/{model_id}`。

## 3. 同一模型不同版本怎么命名

| 情况 | 规则 | 示例 |
|---|---|---|
| 明确版本号 | 版本号进入 model_id | claude-opus-4-8 |
| 日期版本 | 用短月或 ISO 日期，优先厂商官方写法 | deepseek-r1-jan |
| 小版本 | 点号转连字符 | deepseek-v3-2 |
| 年份版 | 年份进入末尾 | llama-4-2026 |
| API snapshot | 保留日期 | gpt-5-2026-06-09 |
| 产品展示名与 API ID 不同 | model_id 用展示名规范化，provider_model_id 保存原 ID | model_id: claude-fable-5, provider_model_id: claude-fable-5 |

## 4. Preview / high / xhigh / max / thinking / mini / nano 编码

| 变体词 | 编码位置 | 示例 |
|---|---|---|
| preview | 放末尾，表示发布状态 | gemini-3-pro-preview |
| high | 放末尾或 preview 后 | gpt-5-high, gemini-3-pro-preview-high |
| xhigh | 放末尾 | gpt-5-5-xhigh |
| max | 放末尾 | claude-code-max |
| thinking | 放末尾，表示思考变体或模式产品化 | qwen3-max-thinking |
| mini | 放末尾，表示小模型 | gpt-5-mini |
| nano | 放末尾，表示更小模型 | gpt-5-nano |
| codex | 放末尾，表示面向代码代理的产品化变体 | gpt-5-codex |

当 high / xhigh / max 是推理强度而不是模型本体时：

1. model_id 仍使用基础模型。
2. variant_id 记录强度。
3. 页面可以是同页变体，不必拆模型页。

示例：

```yaml
model_id: gemini-3-pro-preview
variant_id: gemini-3-pro-preview-high
variant_kind: reasoning_effort
```

## 5. 模型卡 URL 如何生成

| 输入 | 输出 |
|---|---|
| model_id: claude-fable-5 | /models/claude-fable-5 |
| model_id: gpt-5-high | /models/gpt-5-high |
| model_id: qwen3-max-thinking | /models/qwen3-max-thinking |

URL 不使用厂商路径，以便跨厂商比较和搜索。厂商页通过 model_id 反向关联。

## 6. case_library 如何关联到模型

每条案例必须包含：

```yaml
case_id: cf5-case-laas-webgpu-world
model_id: claude-fable-5
model_ids:
  - claude-fable-5
vendor_id: anthropic
case_library_url: /cases/models/claude-fable-5
```

如果案例同时涉及多个模型，model_id 填主模型，model_ids 列出所有相关模型。

## 7. 旧 Wiki 标题和新网站 slug 如何映射

| 字段 | 说明 |
|---|---|
| legacy_wiki_title | 旧 Wiki 标题 |
| legacy_wiki_url | 旧 Wiki URL |
| legacy_wiki_token | 飞书页面 token |
| model_id | 新模型 ID |
| migration_status | primary, duplicate, merged, archive_only |
| canonical_model_url | 新网站 URL |

示例：

| legacy_wiki_title | legacy_wiki_token | model_id | migration_status |
|---|---|---|---|
| Claude Fable 5 模型卡 | HjnHwqz9DiBMP4kT2Y0cNEuzndg | claude-fable-5 | primary |
| Claude Fable 5 模型卡 | W1DswisDliVQNekH0bzcrEIEn1n | claude-fable-5 | duplicate |

## 8. 重复 Claude 分支如何处理

1. Claude 旧 Wiki 中同一模型多个卡片时，只保留一个 canonical model_id。
2. 主卡由内容完整度、来源数量、更新时间决定。
3. 重复卡不删除，标为 duplicate 并回链到 canonical_model_url。
4. 如果重复卡包含独有事实，提取到 canonical 卡的 source_links 或 change_log。
5. 厂商页模型列表只展示 canonical model_id。

## 9. 模型 ID 和 Artificial Analysis ID 如何并存

不要把 AA ID 当作 model_id。AA 是外部评测实体，应放在 external_ids。

```yaml
model_id: claude-fable-5
provider_model_id: claude-fable-5
external_ids:
  artificial_analysis: claude-fable-5
  lmarena: pending
  openrouter: anthropic/claude-fable-5
```

如果 Artificial Analysis 对同一模型的变体拆分更细，用 aa_variant_id 保存。

## 10. 至少 10 个例子

| 展示名 | vendor_id | model_id | provider_model_id | model_url | 说明 |
|---|---|---|---|---|---|
| Claude Fable 5 | anthropic | claude-fable-5 | claude-fable-5 | /models/claude-fable-5 | Claude 5 Mythos-class 公开模型 |
| Claude Opus 4.8 | anthropic | claude-opus-4-8 | claude-opus-4-8 | /models/claude-opus-4-8 | 点号转连字符 |
| GPT-5 High | openai | gpt-5-high | gpt-5 | /models/gpt-5-high | high 作为推理强度变体 |
| GPT-5.5 xHigh | openai | gpt-5-5-xhigh | gpt-5.5 | /models/gpt-5-5-xhigh | 5.5 转 5-5，xHigh 归一为 xhigh |
| GPT-5 Codex | openai | gpt-5-codex | gpt-5-codex | /models/gpt-5-codex | codex 作为代码代理变体 |
| DeepSeek R1 Jan | deepseek | deepseek-r1-jan | deepseek-r1-jan | /models/deepseek-r1-jan | 日期型版本用短月 |
| DeepSeek V3.2 | deepseek | deepseek-v3-2 | deepseek-v3.2 | /models/deepseek-v3-2 | 小版本点号转连字符 |
| Qwen3 Max Thinking | alibaba | qwen3-max-thinking | qwen3-max-thinking | /models/qwen3-max-thinking | thinking 作为产品化变体 |
| Gemini 3 Pro Preview High | google | gemini-3-pro-preview-high | gemini-3-pro-preview | /models/gemini-3-pro-preview-high | preview + high 保留顺序 |
| Grok 4 | xai | grok-4 | grok-4 | /models/grok-4 | 简单主版本 |

## 11. 冻结判定

本规范冻结后，任何新增模型必须先生成 model_id，再创建模型卡。不能先写标题再回填 slug。例外只允许在 migration_status 为 archive_only 的旧资料中出现。

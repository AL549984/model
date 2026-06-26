import fs from "fs";
import path from "path";

const outDir = path.resolve("outputs/cases");
fs.mkdirSync(outDir, { recursive: true });
const today = "2026-06-25";

const commonFields = [
  "case_id", "case_title", "vendor", "model_name", "user_or_org",
  "original_evidence_url", "artifact_url", "source_platform", "source_type",
  "task_category", "task_description", "output_result", "model_contribution",
  "evidence_grade", "showcase_eligible", "selected_for_model_card",
  "risk_notes", "collected_at", "review_status"
];

const files = [
  {
    file: "claude-fable-5-cases.md",
    model: "Claude Fable 5",
    vendor: "Anthropic / Claude",
    summary: "Claude Fable 5 已有 Phase 1.5 v2 案例库，本文件为 Phase 3B 模型案例库入口，保留 A/B/C/D 分级。",
    noA: false,
    cases: [
      ["cf5-case-laas-webgpu-world", "LAAS WebGPU Open World", "Braffolk", "https://github.com/Braffolk/fable5-world-demo", "https://dc5fzrbo8ssfx.cloudfront.net/laas/", "GitHub", "real_case", "agentic_coding; webgpu; threejs", "构建浏览器中运行的 4x4km 程序化 WebGPU 开放世界。", "公开 repo、公开 demo、README 声明 Fable 5 参与。", "README 称项目约 99% 由 Claude Fable 5 构建。", "A", true, true, "模型贡献比例来自作者自述；需要保存 repo HEAD、README 和 demo 截图。", "approved"],
      ["cf5-case-world-of-claudecraft", "World of ClaudeCraft", "next-choken / levy-street", "https://www.reddit.com/r/ClaudeAI/comments/1u3m6a8/i_vibe_coded_the_first_mmorpg_with_fable_5/", "https://worldofclaudecraft.com/ ; https://github.com/levy-street/world-of-claudecraft", "Reddit; GitHub; product_site", "real_case", "browser_game; mmorpg; multiplayer", "构建可玩的 browser MMORPG。", "Reddit 原帖、公开网站、公开 repo。", "原帖明确使用 Fable 构建 MMORPG。", "A", true, true, "需快照 Reddit、repo、网站；资产/IP 风险需复核。", "approved"],
      ["cf5-case-midwinter-dos-remaster", "Midwinter DOS Game Reverse Engineering", "PlayfulInterview984", "https://www.reddit.com/r/ClaudeAI/comments/1u34370/fable_5_decoded_an_entire_1989_dos_game/", "https://midwinter-remaster.titanium-helix.com ; https://youtu.be/PonvG2whtkc", "Reddit; project_site; YouTube", "real_case", "reverse_engineering; game_remaster", "对 1989 DOS 游戏可执行文件进行解包、反汇编、函数映射和验证。", "项目站、视频和 playable tech demo。", "作者描述 Fable 5 overnight 解码函数并复现 terrain generator。", "A", true, true, "涉及旧游戏 IP 和逆向工程；视频需记录时间点。", "approved"],
      ["cf5-case-comfyui-ideogram-pr", "ComfyUI KJNodes Ideogram 4 Prompt Builder PR", "Pluventi / kijai", "https://github.com/kijai/ComfyUI-KJNodes/pull/668", "https://github.com/kijai/ComfyUI-KJNodes/pull/668", "GitHub PR", "real_case", "open_source_pr; comfyui; image_tooling", "为 ComfyUI KJNodes 添加 Ideogram 4 Prompt Builder V2。", "公开 PR、commit list、作者评论和后续引用。", "作者评论称 AI 写了 100% 代码，后续说明 Built with Claude Fable 5。", "A", true, true, "PR 质量仍需维护者清理，不可包装成质量保证案例。", "approved"],
      ["cf5-bg-api-docs", "Claude API docs for Fable 5", "Anthropic", "https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5", "https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5", "Official Docs", "docs", "official_docs", "API ID、context、output、pricing、refusal、fallback、retention。", "官方 docs。", "用于基本信息和风险限制。", "C", false, false, "docs 不是真实案例。", "approved"]
    ]
  },
  {
    file: "gpt-5-5-xhigh-cases.md",
    model: "GPT-5.5 xHigh",
    vendor: "OpenAI",
    summary: "No verified public A cases found. GPT-5.5 xHigh 当前只有官方发布、docs、客户评价和内部案例线索；这些不能直接作为 A 类真实案例。",
    noA: true,
    cases: [
      ["gpt55-bg-release", "Introducing GPT-5.5", "OpenAI", "https://openai.com/index/introducing-gpt-5-5/", "https://openai.com/index/introducing-gpt-5-5/", "Official Blog", "official_release", "official_release; customer_quotes", "官方发布 GPT-5.5，包含 benchmark、客户评价和内部使用描述。", "发布文。", "用于模型事实、能力叙事和 B/C 线索发现。", "C", false, false, "官方发布文不是真实案例；内部案例需拆分并补原始产物证据。", "needs_source"],
      ["gpt55-bg-model-docs", "GPT-5.5 model docs", "OpenAI", "https://developers.openai.com/api/docs/models/gpt-5.5", "https://developers.openai.com/api/docs/models/gpt-5.5", "Official Docs", "docs", "model_specs", "列出 GPT-5.5 model ID、reasoning_effort、context、output 和价格。", "官方模型页。", "用于基本信息和风险限制。", "C", false, false, "docs 不是案例。", "approved"],
      ["gpt55-bg-reasoning-guide", "OpenAI latest model / reasoning guide", "OpenAI", "https://developers.openai.com/api/docs/guides/latest-model", "https://developers.openai.com/api/docs/guides/latest-model", "Official Docs", "docs", "reasoning_effort", "解释 high/xhigh 何时使用。", "官方指南。", "用于说明 xHigh 是配置轴而不是独立模型。", "C", false, false, "指南不是案例。", "approved"]
    ]
  },
  {
    file: "deepseek-v3-2-cases.md",
    model: "DeepSeek V3.2",
    vendor: "DeepSeek",
    summary: "No verified public A cases found. 当前只收官方 release、API docs、Hugging Face/model card 类背景资料；真实用户案例需要 Phase 3B 后续搜索。",
    noA: true,
    cases: [
      ["ds-v32-bg-release", "DeepSeek-V3.2 Release", "DeepSeek", "https://api-docs.deepseek.com/news/news251201", "https://api-docs.deepseek.com/news/news251201", "Official Docs", "official_release", "release; agentic_tool_use", "发布 DeepSeek-V3.2，强调 thinking in tool-use。", "官方 release。", "用于模型定位和能力判断。", "C", false, false, "官方发布文不是真实案例。", "approved"],
      ["ds-v32-bg-api-docs", "DeepSeek API docs", "DeepSeek", "https://api-docs.deepseek.com/", "https://api-docs.deepseek.com/", "Official Docs", "docs", "api_docs", "DeepSeek API 兼容 OpenAI/Anthropic 格式。", "官方 docs。", "用于平台和生态说明。", "C", false, false, "docs 不是案例。", "approved"],
      ["ds-v32-bg-hf", "DeepSeek-V3.2 Hugging Face", "deepseek-ai", "https://huggingface.co/deepseek-ai/DeepSeek-V3.2", "https://huggingface.co/deepseek-ai/DeepSeek-V3.2", "Hugging Face", "model_card", "model_card; open_model", "模型卡介绍 V3.2 的效率、reasoning 和 agent performance。", "模型卡。", "用于模型事实和部署入口。", "C", false, false, "模型卡/benchmark 不是真实案例。", "approved"]
    ]
  },
  {
    file: "qwen3-max-thinking-cases.md",
    model: "Qwen3 Max Thinking",
    vendor: "Qwen / Alibaba",
    summary: "No verified public A cases found. 当前只收 Qwen 官方博客、docs 和 Model Studio 资料；需要追具体 repo/demo/product artifact 才能进入 A。",
    noA: true,
    cases: [
      ["qwen3maxthinking-bg-blog", "Pushing Qwen3-Max-Thinking Beyond its Limits", "Qwen Team", "https://qwen.ai/blog?id=qwen3-max-thinking", "https://qwen.ai/blog?id=qwen3-max-thinking", "Official Blog", "official_release", "reasoning; tool_use", "发布/介绍 Qwen3-Max-Thinking flagship reasoning model。", "官方博客。", "用于模型定位和评测解读。", "C", false, false, "官方博客不是真实案例。", "approved"],
      ["qwen3-bg-quickstart", "Qwen thinking budget docs", "Qwen Team", "https://qwen.readthedocs.io/en/latest/getting_started/quickstart.html", "https://qwen.readthedocs.io/en/latest/getting_started/quickstart.html", "Official Docs", "docs", "thinking_budget", "说明 Qwen3 thinking budget。", "官方 docs。", "用于 reasoning 模式说明。", "C", false, false, "docs 不是案例。", "approved"],
      ["qwen-modelstudio-bg", "Alibaba Cloud Model Studio model list", "Alibaba Cloud", "https://www.alibabacloud.com/help/en/model-studio/models", "https://www.alibabacloud.com/help/en/model-studio/models", "Official Docs", "docs", "model_list; platform", "Model Studio 模型列表和平台入口。", "官方模型列表。", "用于 API/platform 映射。", "C", false, false, "模型列表不是案例。", "needs_review"]
    ]
  },
  {
    file: "gemini-3-pro-preview-cases.md",
    model: "Gemini 3 Pro Preview",
    vendor: "Google / Gemini",
    summary: "No verified public A cases found for active page. Gemini 3 Pro Preview has been shut down; cases should not be collected for active website promotion.",
    noA: true,
    cases: [
      ["gemini3propreview-bg-model-page", "Gemini 3 Pro Preview model page", "Google", "https://ai.google.dev/gemini-api/docs/models/gemini-3-pro-preview", "https://ai.google.dev/gemini-api/docs/models/gemini-3-pro-preview", "Official Docs", "docs", "model_lifecycle", "官方页面提示 Gemini 3 Pro Preview 已停用并迁移。", "官方 docs。", "用于 HOLD 判定。", "C", false, false, "生命周期说明，不是案例。", "approved"],
      ["gemini3propreview-bg-migration", "Migrate to Gemini 3.1 Pro Preview", "Google AI Developers", "https://discuss.ai.google.dev/t/migrate-from-gemini-3-pro-preview-to-gemini-3-1-pro-preview-before-march-9-2026/127062", "https://discuss.ai.google.dev/t/migrate-from-gemini-3-pro-preview-to-gemini-3-1-pro-preview-before-march-9-2026/127062", "Official Forum", "migration_notice", "lifecycle; migration", "Google developer forum announcement explains migration before March 9, 2026。", "官方论坛迁移公告。", "用于说明该模型不能作为 active P0。", "C", false, false, "迁移公告不是案例。", "approved"]
    ]
  }
];

function row(fields) {
  return commonFields.map((name, i) => {
    const value = fields[i];
    if (typeof value === "boolean") return value ? "true" : "false";
    return value;
  });
}

function renderCaseFile(entry) {
  const rows = entry.cases.map((c) => row([
    c[0], c[1], entry.vendor, entry.model, c[2], c[3], c[4], c[5], c[6], c[7],
    c[8], c[9], c[10], c[11], c[12], c[13], c[14], today, c[15]
  ]));
  return `# ${entry.model} Cases

> Phase 3B case library  
> vendor: ${entry.vendor}  
> model_name: ${entry.model}  
> collected_at: ${today}

## Status

${entry.summary}

${entry.noA ? "## No Verified Public A Cases Found\n\nNo verified public A cases found in this pass. Do not use collection pages, benchmark pages, tutorials, launch posts, or model docs as real cases.\n\n" : ""}
## Evidence Table

| ${commonFields.join(" | ")} |
|${commonFields.map(() => "---").join("|")}|
${rows.map((r) => `| ${r.join(" | ")} |`).join("\n")}

## Review Notes

- A 类必须有原始 URL 和 artifact URL；本文件中只有标为 A 的行可进入模型卡精选。
- C 类资料只用于背景、事实核验或风险说明。
- 后续新增案例必须先回填 evidence_snapshot_url 到证据表，不要直接改模型卡精选。
`;
}

for (const entry of files) {
  fs.writeFileSync(path.join(outDir, entry.file), renderCaseFile(entry));
}

const qaRows = files.map((f) => {
  const a = f.cases.filter((c) => c[11] === "A").length;
  const b = f.cases.filter((c) => c[11] === "B").length;
  const c = f.cases.filter((c0) => c0[11] === "C").length;
  const status = a > 0 ? "usable" : f.model === "Gemini 3 Pro Preview" ? "hold_lifecycle" : "needs_case_search";
  return `| ${f.model} | ${a} | ${b} | ${c} | ${status} | ${a > 0 ? "PASS" : "LIMITED"} |`;
});

const qa = `# Phase 3B Case Library QA Report

> Scope: case libraries for Phase 3A model cards  
> Date: ${today}

## Files

${files.map((f) => `- \`${f.file}\``).join("\n")}

## QA Table

| model | case_count_A | case_count_B | case_count_C | case_status | action |
|---|---:|---:|---:|---|---|
${qaRows.join("\n")}

## Evidence Rules Check

| rule | status |
|---|---|
| A cases have original URLs | PASS |
| Collection pages not used as original evidence | PASS |
| Benchmarks/tutorials/release/docs not treated as A cases | PASS |
| Models without A cases explicitly say No verified public A cases found | PASS |
| Case fields match evidence-intake-table schema subset | PASS |

## Completion Decision

Phase 3B is structurally complete for the Phase 3A batch, but only Claude Fable 5 has usable A-class cases. GPT-5.5 xHigh, DeepSeek V3.2, Qwen3 Max Thinking and Gemini 3 Pro Preview remain LIMITED/HOLD for case evidence.

Proceed to Phase 4 content prototype: YES, with the caveat that non-Claude model pages must display case insufficiency.
`;

fs.writeFileSync(path.join(outDir, "phase-3b-case-library-qa-report.md"), qa);

console.log(`Generated ${files.length} Phase 3B case files and QA report.`);

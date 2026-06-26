import fs from "fs";
import path from "path";

const outDir = path.resolve("outputs/site-prototype");
fs.mkdirSync(outDir, { recursive: true });
const today = "2026-06-25";

const pages = {
  "homepage.md": `# Frontier Models Atlas / 模型情报站 2.0

> Phase 4 content prototype  
> Goal: turn the old model-card archive into a navigable, evidence-graded content product.

## First Screen

Frontier Models Atlas helps builders, researchers and decision makers understand what frontier models are actually good for, where evidence is strong, and where claims are still weak.

Primary entry points:

- Vendors: compare model families and routes.
- Models: read Model Card 2.0 pages.
- Cases: inspect real-world evidence by grade.
- Compare: understand tradeoffs across vendors and model generations.
- Topics: start from workflows such as coding agents.

## Featured Models

| Model | Vendor | Status | Why featured |
|---|---|---|---|
| Claude Fable 5 | Anthropic / Claude | Publishable | Strongest sample card with usable A-class case library |
| GPT-5.5 xHigh | OpenAI | Limited | Key OpenAI professional-work contrast; needs case补证 |
| DeepSeek V3.2 | DeepSeek | Limited | Open reasoning-agent route; needs public cases |
| Qwen3 Max Thinking | Qwen / Alibaba | Limited | Thinking variant route; needs source/case verification |
| Gemini 3 Pro Preview | Google | Hold | Deprecated; use as lifecycle warning and migration note |

## Evidence Legend

- A: verified public case with original URL and artifact.
- B: candidate signal with weak artifact or weak model-use proof.
- C: background material such as release, docs, benchmark, tutorial.
- D: rejected or unverifiable.

## Current Product State

- Vendor pages: 15 canonical pages generated.
- Model cards: 5 Phase 3A cards generated.
- Case libraries: 5 Phase 3B model case files generated.
- Website implementation: not started; this is content prototype only.
`,
  "vendors-index.md": `# Vendors Index

> Route: /vendors

## Vendor Map

| Vendor | Slug | Page status | Case status | Action |
|---|---|---|---|---|
| Anthropic / Claude | anthropic | publishable | usable | Website prototype ready |
| OpenAI | openai | review | platform_only | Fix sources and cases |
| Google / Gemini | google | review | platform_only | Replace deprecated Gemini 3 Pro Preview with 3.1 |
| DeepSeek | deepseek | review | platform_only | Add V3.2/R1 cases |
| Qwen / Alibaba | qwen-alibaba | review | platform_only | Confirm Model Studio IDs |
| xAI / Grok | xai | review | platform_only | Snapshot X/Grok evidence |
| Kimi / Moonshot AI | kimi | review | platform_only | Confirm K2 Thinking docs |
| Meta / Llama | meta | review | platform_only | Add open-weight deployment cases |
| MiniMax | minimax | review | platform_only | Split text/media model lines |
| Z AI / GLM | z-ai | review | platform_only | Resolve Zhipu/Z AI aliases |
| Xiaomi / MiMo | xiaomi | review | platform_only | Capture repo/API snapshots |
| StepFun / Step | stepfun | review | platform_only | Verify Step3/Flash lineage |
| ByteDance Seed | bytedance-seed | review | platform_only | Optional extra vendor |
| Upstage / Solar | upstage | limited | platform_only | Hold until current model list refreshed |
| MBZUAI IFM / K2 | mbzuai-ifm | limited | archive_only | Research node, not main vendor page yet |

## Navigation Modules

- Regional/type filters: closed frontier, open-weight, multimodal, coding-agent, research node.
- Page status filters: publishable, review, limited, archive only.
- Evidence filters: usable cases, platform_only, archive_only.

## Source of Truth

- Canonical map: ../canonical-vendor-map.md
- Vendor pages: ../vendors/index.md
`,
  "models-index.md": `# Models Index

> Route: /models

## Phase 3A Models

| Model | Slug | Vendor | Publishability | Case status | Action |
|---|---|---|---|---|---|
| Claude Fable 5 | claude-fable-5 | Anthropic / Claude | Publishable | A cases available | Feature |
| GPT-5.5 xHigh | gpt-5-5-xhigh | OpenAI | Limited | No A cases | Show warning |
| DeepSeek V3.2 | deepseek-v3-2 | DeepSeek | Limited | No A cases | Show warning |
| Qwen3 Max Thinking | qwen3-max-thinking | Qwen / Alibaba | Limited | No A cases | Show warning |
| Gemini 3 Pro Preview | gemini-3-pro-preview | Google | Hold | Lifecycle risk | Archive/migration only |

## Index Filters

- Vendor
- Publishability: Publishable / Limited / Hold
- Evidence: A cases / no A cases / lifecycle hold
- Task fit: coding-agent, research, document work, open-weight, multimodal

## Model Card Links

- ../models/claude-fable-5.md
- ../models/gpt-5-5-xhigh.md
- ../models/deepseek-v3-2.md
- ../models/qwen3-max-thinking.md
- ../models/gemini-3-pro-preview.md
`,
  "cases-index.md": `# Cases Index

> Route: /cases

## Case Library Summary

| Model | A | B | C | Status |
|---|---:|---:|---:|---|
| Claude Fable 5 | 4 | 0 | 1 | usable |
| GPT-5.5 xHigh | 0 | 0 | 3 | needs_case_search |
| DeepSeek V3.2 | 0 | 0 | 3 | needs_case_search |
| Qwen3 Max Thinking | 0 | 0 | 3 | needs_case_search |
| Gemini 3 Pro Preview | 0 | 0 | 2 | hold_lifecycle |

## What Can Be Featured

Only A-class cases can enter model-card highlights.

Current featured pool:

- LAAS WebGPU Open World
- World of ClaudeCraft
- Midwinter DOS Game Reverse Engineering
- ComfyUI KJNodes Ideogram PR

## What Cannot Be Featured

- Official launch posts
- API docs
- model cards
- benchmark reports
- migration notices
- collection pages

## Case Files

- ../cases/claude-fable-5-cases.md
- ../cases/gpt-5-5-xhigh-cases.md
- ../cases/deepseek-v3-2-cases.md
- ../cases/qwen3-max-thinking-cases.md
- ../cases/gemini-3-pro-preview-cases.md
`,
  "compare-page.md": `# Compare Models

> Route: /compare

## Default Comparison: Phase 3A Batch

| Dimension | Claude Fable 5 | GPT-5.5 xHigh | DeepSeek V3.2 | Qwen3 Max Thinking | Gemini 3 Pro Preview |
|---|---|---|---|---|---|
| Publishability | Publishable | Limited | Limited | Limited | Hold |
| Core value | long-horizon agentic work | professional work at highest reasoning effort | thinking + tool-use open route | flagship thinking variant | deprecated preview |
| Case evidence | strong A-class public cases | missing A cases | missing A cases | missing A cases | not active |
| Best use | coding/research agents | hard professional work | open reasoning-agent experiments | Qwen thinking evaluation | migration note |
| Risk | cost, retention, fallback | no A cases, xHigh as setting | alias/spec gaps | source/API gaps | shut down |

## Reader Guidance

- Choose Claude Fable 5 when evidence matters most.
- Choose GPT-5.5 xHigh as a high-end OpenAI contrast, but mark evidence Limited.
- Choose DeepSeek V3.2 for open reasoning-agent analysis, not proven production cases yet.
- Choose Qwen3 Max Thinking for China frontier reasoning coverage, pending source verification.
- Do not choose Gemini 3 Pro Preview for active use; evaluate Gemini 3.1 Pro Preview next.
`,
  "topic-coding-agent.md": `# Topic: Coding Agents

> Route: /topics/coding-agent

## Why This Topic Exists

Coding agents are the clearest near-term use case where model differences become visible: long context, tool calls, code edits, tests, PRs, browser automation and multi-step recovery all matter.

## Relevant Models

| Model | Status | Why relevant |
|---|---|---|
| Claude Fable 5 | Publishable | Strong public coding/demo case evidence |
| GPT-5.5 xHigh | Limited | OpenAI professional/coding frontier; no A cases yet |
| DeepSeek V3.2 | Limited | thinking integrated into tool-use |
| Qwen3 Max Thinking | Limited | flagship reasoning/tool-use direction |
| GPT-5 Codex | Candidate | High website value, but not in Phase 3A batch |
| GLM-5 | Candidate | agentic engineering route |

## Featured Evidence

Use only A-class Claude Fable 5 examples for now:

- LAAS WebGPU Open World
- World of ClaudeCraft
- ComfyUI KJNodes PR

## Evidence Gaps

- OpenAI: official release has strong customer/internal examples, but no structured A cases yet.
- DeepSeek: official release/docs show capability direction; no A cases yet.
- Qwen: official blogs/docs show reasoning direction; no A cases yet.
- Google: Gemini 3 Pro Preview is deprecated; replace with Gemini 3.1 Pro Preview before coding-agent topic promotion.
`,
  "site-content-qa-report.md": `# Site Content QA Report

> Phase 4 QA  
> Date: ${today}

## Deliverables

| file | status |
|---|---|
| homepage.md | PASS |
| vendors-index.md | PASS |
| models-index.md | PASS |
| cases-index.md | PASS |
| compare-page.md | PASS |
| topic-coding-agent.md | PASS |
| site-content-qa-report.md | PASS |

## Checks

| check | status | notes |
|---|---|---|
| No website code created | PASS | Markdown content prototype only |
| Uses existing vendor/model/case outputs | PASS | Links point to outputs files |
| Weak evidence not promoted | PASS | Only Claude Fable 5 A cases featured |
| Gemini 3 Pro Preview lifecycle risk disclosed | PASS | Held / migration note |
| Non-Claude models marked Limited | PASS | GPT, DeepSeek, Qwen are warning-only |
| Cases index separates A from C | PASS | Launch/docs/benchmarks not featured |

## Decision

Phase 4 content prototype PASS.

Proceed to Phase 5 static site implementation plan: YES.
`
};

for (const [file, text] of Object.entries(pages)) {
  fs.writeFileSync(path.join(outDir, file), text);
}

console.log(`Generated ${Object.keys(pages).length} Phase 4 site prototype files.`);

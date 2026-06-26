# Frontier Models Atlas Site Input Audit

> Stage A output  
> Date: 2026-06-25  
> Scope: locate existing content assets before website implementation.

## Executive Summary

The current workspace has enough content to start a static website prototype. Phase 3A model cards, Phase 3B case libraries, Phase 4 site content prototype and Phase 5 implementation plan are all present under `outputs/`.

Per the current website goal, implementation should use a minimal, evidence-safe dataset rather than migrate the full old Wiki. Claude Fable 5 is the only fully Publishable model sample. GPT-5.5 xHigh, DeepSeek V3.2 and Qwen3 Max Thinking can appear as Limited pages. Gemini 3 Pro Preview should be marked Hold because the previous QA identified lifecycle risk.

## Located Inputs

| Input group | Expected | Located path | Status | Notes |
|---|---|---|---|---|
| Phase 5 implementation plan | `site-implementation-plan.md` | `outputs/site-implementation-plan.md` | PASS | Recommends Astro, TypeScript, Tailwind, Markdown/JSON static generation. |
| Phase 4 homepage prototype | `homepage.md` | `outputs/site-prototype/homepage.md` | PASS | Defines first screen, featured models and evidence legend. |
| Phase 4 vendors index | `vendors-index.md` | `outputs/site-prototype/vendors-index.md` | PASS | Route source for `/vendors`. |
| Phase 4 models index | `models-index.md` | `outputs/site-prototype/models-index.md` | PASS | Lists 5 Phase 3A models and publishability states. |
| Phase 4 cases index | `cases-index.md` | `outputs/site-prototype/cases-index.md` | PASS | Separates A cases from background sources. |
| Phase 4 compare page | `compare-page.md` | `outputs/site-prototype/compare-page.md` | PASS | Route source for `/compare`. |
| Phase 4 coding topic | `topic-coding-agent.md` | `outputs/site-prototype/topic-coding-agent.md` | PASS | Route source for `/topics/coding-agent`. |
| Phase 3A model cards | 5 model cards | `outputs/models/*.md` | PASS | Claude Fable 5 is Publishable; three are Limited; Gemini is Hold. |
| Phase 3B case libraries | 5 case files | `outputs/cases/*.md` | PASS | Claude Fable 5 has A cases; others have no verified public A cases. |
| Vendor pages | canonical vendor pages | `outputs/vendors/*.md` | PASS | Full Phase 2 vendor skeleton exists. Website MVP should migrate 5 vendors first. |

## Minimum Website Dataset

### Vendors

| Vendor | Source file | Website status |
|---|---|---|
| Anthropic / Claude | `outputs/vendors/anthropic.md` | Publishable anchor vendor |
| OpenAI | `outputs/vendors/openai.md` | Review / platform-only cases |
| DeepSeek | `outputs/vendors/deepseek.md` | Limited evidence |
| Qwen / Alibaba | `outputs/vendors/qwen-alibaba.md` | Limited evidence |
| Google | `outputs/vendors/google.md` | Requires lifecycle warnings for Gemini preview content |

### Models

| Model | Source file | Publishability | Website treatment |
|---|---|---|---|
| Claude Fable 5 | `outputs/models/claude-fable-5.md` | Publishable | Full model detail page and homepage feature |
| GPT-5.5 xHigh | `outputs/models/gpt-5-5-xhigh.md` | Limited | Page allowed with prominent case-evidence warning |
| DeepSeek V3.2 | `outputs/models/deepseek-v3-2.md` | Limited | Page allowed with prominent case-evidence warning |
| Qwen3 Max Thinking | `outputs/models/qwen3-max-thinking.md` | Limited | Page allowed with prominent case-evidence warning |
| Gemini 3 Pro Preview | `outputs/models/gemini-3-pro-preview.md` | Hold | Lifecycle / archive note only, not active recommendation |

### Cases

| Model | Source file | A case count | Website treatment |
|---|---|---:|---|
| Claude Fable 5 | `outputs/cases/claude-fable-5-cases.md` | 4 | A-class cases can be featured |
| GPT-5.5 xHigh | `outputs/cases/gpt-5-5-xhigh-cases.md` | 0 | Show "No verified public A cases found" |
| DeepSeek V3.2 | `outputs/cases/deepseek-v3-2-cases.md` | 0 | Show "No verified public A cases found" |
| Qwen3 Max Thinking | `outputs/cases/qwen3-max-thinking-cases.md` | 0 | Show "No verified public A cases found" |
| Gemini 3 Pro Preview | `outputs/cases/gemini-3-pro-preview-cases.md` | 0 | Hold / lifecycle only |

## Evidence Constraints For Implementation

- Only A-grade Claude Fable 5 cases can appear as featured real cases.
- B/C/D rows, release notes, docs, benchmarks, tutorials and collection pages must not be promoted as real usage cases.
- Limited model pages must show that public A-class evidence is missing.
- Hold pages must not be visually treated as active recommendations.
- Official links and source blocks should remain visible on model and vendor pages.

## Product Design Handoff Notes

The site should feel like an AI intelligence dashboard: dark surface, evidence badges, capability matrices, model maps and comparison tools. The visual system must make Publishable / Limited / Hold status visible without turning the product into a marketing landing page.

## Stage A Decision

Stage A PASS. The required content exists and can support Stage B Product Design work.

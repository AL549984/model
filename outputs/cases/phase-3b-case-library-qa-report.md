# Phase 3B Case Library QA Report

> Scope: case libraries for Phase 3A model cards  
> Date: 2026-06-25

## Files

- `claude-fable-5-cases.md`
- `gpt-5-5-xhigh-cases.md`
- `deepseek-v3-2-cases.md`
- `qwen3-max-thinking-cases.md`
- `gemini-3-pro-preview-cases.md`

## QA Table

| model | case_count_A | case_count_B | case_count_C | case_status | action |
|---|---:|---:|---:|---|---|
| Claude Fable 5 | 4 | 0 | 1 | usable | PASS |
| GPT-5.5 xHigh | 0 | 0 | 3 | needs_case_search | LIMITED |
| DeepSeek V3.2 | 0 | 0 | 3 | needs_case_search | LIMITED |
| Qwen3 Max Thinking | 0 | 0 | 3 | needs_case_search | LIMITED |
| Gemini 3 Pro Preview | 0 | 0 | 2 | hold_lifecycle | LIMITED |

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

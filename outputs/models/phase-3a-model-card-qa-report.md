# Phase 3A Model Card QA Report

> Scope: first batch P0 model-card upgrade  
> Date: 2026-06-25  
> Rule: no 107-card full upgrade; no case-library expansion; no old card deletion.

## Batch Selection

Selected from Phase 2.5 frozen P0 list:

1. Claude Fable 5
2. GPT-5.5 xHigh
3. Gemini 3 Pro Preview
4. DeepSeek V3.2
5. Qwen3 Max Thinking

Important correction: Gemini 3 Pro Preview is included because it was in the frozen Phase 2.5 first-batch recommendation, but official Google docs show it has been shut down and migrated to Gemini 3.1 Pro Preview. Therefore its action is HOLD.

## QA Table

| model | publishability | evidence_status | case_count_A | case_count_B | source_risk | old_card_reuse | quality | action |
|---|---|---:|---:|---|---|---|---|---|
| Claude Fable 5 | Publishable | A/B/C evidence available | 8 | 5 | LOW | structured reuse from Phase 1 sample, not copy-paste | website-ready | PASS |
| GPT-5.5 xHigh | Limited | official sources only; case library missing | 0 | 0 | MEDIUM | new card from official docs; no old card body reused | usable with Limited label | LIMITED |
| DeepSeek V3.2 | Limited | official sources only; case library missing | 0 | 0 | MEDIUM | new card from official release/docs; no old card body reused | usable with Limited label | LIMITED |
| Qwen3 Max Thinking | Limited | official sources only; case library missing | 0 | 0 | MEDIUM-HIGH | new card from official/blog docs; no old card body reused | usable with Limited label | LIMITED |
| Gemini 3 Pro Preview | Hold | lifecycle risk; no active-case work | 0 | 0 | HIGH | new card from official lifecycle info; no old card body reused | archive/migration note only | HOLD |

## Completion Gate

| Gate | Result |
|---|---|
| First batch size is 3-5 models | PASS: 5 |
| At least 3 models PASS or LIMITED | PASS: 4 |
| No full 107-card upgrade | PASS |
| No old cards deleted or modified | PASS |
| No benchmark/tutorial/overview treated as real case | PASS |
| Weak evidence disclosed | PASS |

## Actions

- PASS: Claude Fable 5 can enter website model page as the anchor sample.
- LIMITED: GPT-5.5 xHigh, DeepSeek V3.2, Qwen3 Max Thinking can publish only with prominent case-evidence warnings.
- HOLD: Gemini 3 Pro Preview should not be published as an active model page; replace with Gemini 3.1 Pro Preview in the next P0 candidate revision.

## Recommendation

Phase 3A passes the minimum gate because 4 models are PASS or LIMITED. Proceed to Phase 3B for case-library补证, but prioritize:

1. GPT-5.5 xHigh evidence intake rows.
2. DeepSeek V3.2 A/B case search.
3. Qwen3 Max Thinking A/B case search.
4. Google P0 replacement decision: Gemini 3.1 Pro Preview instead of Gemini 3 Pro Preview.

# Visual QA Report

> Date: 2026-06-26  
> Preview URL during QA: `http://127.0.0.1:4321/`  
> Capture tool: Playwright  
> Viewports: desktop `1440x1024`, mobile `390x844`

## Screenshots

Screenshots are saved under:

```text
site/visual-qa/screenshots-p0p1/
```

| Page / State | Screenshot | Result |
|---|---|---|
| Home desktop | `screenshots-p0p1/desktop-01-home.png` | PASS |
| Models before filtering desktop | `screenshots-p0p1/desktop-02-models-before-filter.png` | PASS |
| Models filtered: Claude + has A cases desktop | `screenshots-p0p1/desktop-03-models-filtered-claude-with-cases.png` | PASS |
| Claude Fable 5 detail desktop | `screenshots-p0p1/desktop-04-model-claude-fable-5-with-cases.png` | PASS |
| Qwen3 7 Max no-case detail desktop | `screenshots-p0p1/desktop-05-model-qwen3-7-max-no-cases.png` | PASS |
| Cases coverage desktop | `screenshots-p0p1/desktop-06-cases-coverage.png` | PASS |
| Compare decision table desktop | `screenshots-p0p1/desktop-07-compare-decision-table.png` | PASS |
| Home mobile | `screenshots-p0p1/mobile-01-home.png` | PASS |
| Models controls mobile | `screenshots-p0p1/mobile-02-models-filter-controls.png` | PASS |
| Models filtered: Qwen + Limited mobile | `screenshots-p0p1/mobile-03-models-filtered-qwen-limited.png` | PASS |
| No-case model detail mobile | `screenshots-p0p1/mobile-04-no-case-model-detail.png` | PASS |
| Cases coverage mobile | `screenshots-p0p1/mobile-05-cases-coverage.png` | PASS |
| Compare mobile | `screenshots-p0p1/mobile-06-compare.png` | PASS |

## Interaction QA

| Interaction | Result | Status |
|---|---|---|
| Search `Claude` + A-case filter `有 A 类案例` | Visible count changed to 1 | PASS |
| Mobile search `Qwen` + status `有限证据` | Visible count changed to 17 | PASS |
| Reset control visible | Present on model index | PASS |
| No-case model detail | Shows `暂无已验证 A 类案例` plus A-grade explanation | PASS |
| Case page coverage stats | Shows total models, with-case models, no-case models, A-case total and coverage rate | PASS |

## Visual QA Notes

| Area | Finding | Result |
|---|---|---|
| Desktop layout | Search/filter controls, result cards, status badges and matrix layout are stable. | PASS |
| Mobile layout | Controls stack cleanly; long result lists remain readable. | PASS |
| Empty / limited data | Missing case evidence and source gaps are stated in Chinese. | PASS |
| Compare table | Decision columns are present; table remains horizontally scrollable on mobile. | PASS |
| Evidence integrity | Only Claude Fable 5 appears when filtering for models with A cases. | PASS |

## Final Decision

Visual QA: **PASS for P0/P1/P2 manual review**.

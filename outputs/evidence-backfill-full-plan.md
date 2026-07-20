# Evidence Backfill Full Plan

> Generated from site data. Dataset cut: 2026-07-20.

## Summary

- Models: 127
- Active models: 116
- Publishable models: 116
- Limited models: 0
- Archive models: 2
- Verified A-grade cases: 680
- Models without A-grade cases: 11
- Minimum public case line: 3 A-grade cases per model
- Full target case line: 5 A-grade cases per model
- Models meeting minimum line: 116
- Models meeting full target line: 116
- Active A-case deficit to minimum line: 0
- Active A-case deficit to full target line: 0
- All-model A-case deficit to minimum line: 33
- All-model A-case deficit to full target line: 55
- Backfill rows: 127
- P0 rows: 0
- P1 rows: 0
- P2 rows: 116
- P3 rows: 11

## Operating Rule

Full backfill means every model is chased to at least 3 verified A-grade real-use cases, with 5 as the full target. A model should not be treated as public-ready merely because it has one case.

## Priority Meaning

| Priority | Meaning | Action |
|---|---|---|
| P0 | High-value or identity-risk rows | Verify model identity first, then hunt A cases |
| P1 | Rows near the public line or strong candidates | Hunt A cases and official facts |
| P2 | Lower-risk rows or rows already at target | Refresh fields, snapshots or family mapping |
| P3 | Archive / hold rows | Confirm whether to keep, merge or remove |

## P0 Backfill Queue

| Vendor | Model | Status | Blocker | First search query |
|---|---|---|---|---|

## All Limited Rows

| Priority | Vendor | Model | Status | A cases | Source count | Blocker |
|---|---|---|---|---:|---:|---|

## Full-Coverage Rule For Hermes

- Minimum public line: 3 A cases per model.
- Full target line: 5 A cases per model.
- Keep crawling a model until `targetDeficit` reaches 0, unless `archive_review` or identity validation fails.
- Do not duplicate one product launch across multiple model variants unless the original evidence names the exact variant.
- Prefer diversity: at least two different source platforms and at least two different task categories when possible.

## Generated Files

- `site/src/data/evidenceBackfill.json`: data used by model detail pages.
- `work/evidence-backfill-intake.tsv`: copyable intake table for research work.
- `outputs/evidence-backfill-full-plan.md`: this plan.

# Archive Notes

This repository still contains historical design and prototype artifacts that are useful for provenance, but they are not the active Model Atlas production site.

Active product site:

- `site/`

Historical / reference material:

- `evidence/`: Model Atlas A 类案例证据快照目录。每个案例使用 `archive/evidence/{caseId}/manifest.json` 记录当前证据指纹、目标 URL、快照文件、HTTP 状态和内容哈希；单个 target 文件只保存元数据和哈希，不保存外部网页正文。
- `systems-studio-prototype/`: earlier React/Vite visual prototype used to explore the Signal Observatory x Living Archive direction before the design was connected to the real Astro site.
- `product-design-audits/`: Ignite visual audit and research screenshots used during design exploration.
- `design/`: product design brief, wireframes, visual direction options, and component notes.
- `outputs/`: planning documents, generated model/case docs, evidence rules, and implementation reports.

Do not delete these folders during normal site work. Treat them as reference material unless a separate cleanup task explicitly moves or removes them.

Evidence snapshots are generated from the active site package:

```bash
cd site
npm run evidence:snapshot -- --host github.com --limit 8
npm run evidence:archive
npm run qa:evidence
```

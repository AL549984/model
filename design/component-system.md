# Component System

> Stage B output  
> Components required for the static website prototype.

## Layout

### AppShell

Wraps every page with dark background, subtle grid texture, max-width content container and global navigation.

### Navigation

Horizontal desktop nav with compact mobile menu. Active link uses cyan border and text. Navigation links: Home, Vendors, Models, Cases, Compare, Coding Agent.

### Footer

Contains product name, evidence policy reminder, source status and links to key routes.

## Content Components

### SectionHeader

Small mono eyebrow, title and optional description. Used to keep dense pages scannable.

### StatCard

Displays a metric, label and short note. Used on homepage for vendors, models, publishable models and verified A cases.

### VendorCard

Fields:

- display_name
- 30-second judgment
- flagship models
- page status
- case library status
- official site

Behavior: hover raises card and brightens border.

### ModelCard

Fields:

- model name
- vendor
- publishability
- one-line conclusion
- A-case count
- case status
- route link

Behavior: Publishable models receive emerald accent; Limited amber; Hold rose and muted opacity.

### CaseCard

Fields:

- case title
- user or org
- model
- task category
- output result
- original evidence URL
- artifact URL
- evidence grade
- review status

Only A cases can use "Featured" styling.

## Data Components

### EvidenceBadge

Displays A/B/C/D evidence grade. The component must not infer grade from text. It only renders the explicit data field.

### PublishabilityBadge

Displays Publishable / Limited / Hold. Used on every model card, model header and comparison row.

### CapabilityMatrix

Compact matrix for capability and evidence dimensions. Rows are models; columns include coding agent, long context, research, open ecosystem and lifecycle risk.

### ModelTimeline

Horizontal or vertical timeline of vendor/model events with source confidence. Use for vendor pages and model lineage context.

### VendorMap

Constellation-style overview using HTML/CSS nodes in the implementation. Nodes represent vendors and model families; lines represent relationship and navigation, not factual benchmark superiority.

### ComparisonTable

Dense table for compare page. Must show status, evidence and risk columns without hiding warnings.

## Utility Components

### CaseFilterBar

Filter controls for model, vendor, evidence grade and source platform. In static prototype, filters can be represented as populated controls even if full client filtering is deferred.

### SourceLinkBlock

Groups official release, API docs, source evidence and case artifacts. Links must be explicit.

### RiskNotice

Used for Limited/Hold models and model risks. Amber for Limited, rose for Hold, slate for neutral caveats.

## Interaction Rules

- All clickable cards must have clear focus states.
- Hover effects must not shift layout.
- Status badges must be visible at mobile widths.
- Tables must scroll horizontally on small screens.
- Reduced motion must be respected.

## Content Safety Rules

- CaseCard featured styling requires `evidence_grade: "A"` and `showcase_eligible: true`.
- Limited models must show a RiskNotice on detail pages.
- Hold models must be excluded from active recommendation sections unless shown as lifecycle warnings.
- Source links must not be hidden in accordions for the initial prototype.

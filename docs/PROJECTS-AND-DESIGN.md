# Project stories and studio consolidation

## Published content

- GRID-X: `/projects/8`, manufacturing workflow, controlled drawing releases, quality gates, domain modelling and public source links.
- IMG Creator: `/projects/6`, local and hosted entry points, durable jobs, credit accounting, private artifacts, training lifecycle and deployment limits.
- News Platform: `/projects/7`, RSS ingestion, Kafka handoffs, refinement, notification delivery and integration requirements.
- Existing project IDs 0–5 are retained. Next-project navigation follows display order rather than assuming IDs are array positions.

Facts were checked against each public repository's README and implementation or architecture documentation on 2026-10-10. Each case study links its evidence. Concept artwork is labelled; no generated output, product screenshot, production metric or benchmark is invented.

## Design

Retain the paper, ink and cobalt identity, light/dark themes, motion preference, and both live activity calendars. Feature GRID-X in a wide lead card, followed by two complementary compositions for image generation and news processing. Case studies explain the problem, capabilities, workflow, decisions and current scope.

`src/styles/studio.css` is now the single portfolio stylesheet. Removed `portfolio.css`, the unused orbital hero component, 184 unused selectors and 75 overridden declarations. Kept the shared primitives needed by existing pages. No runtime dependency was added.

## Requested skill review

The truncated links were resolved to their public repositories before reading.

| Repository | Application in this change |
| --- | --- |
| [Task Observer](https://github.com/rebelytics/one-skill-to-rule-them-all) | Applied observation/report-back guidance. Reusable finding recorded below; no global skill installation or scheduled review configured. |
| [Marketing Skills](https://github.com/coreyhaines31/marketingskills) | Read copywriting and CRO skills. Prioritized specific project outcomes, source-backed claims, scannable hierarchy and descriptive case-study links. Unrelated advertising, pricing and acquisition workflows were not run. |
| [Karpathy Guidelines](https://github.com/multica-ai/andrej-karpathy-skills) | Scoped changes to projects/design, retained existing URLs, avoided new runtime dependencies and defined verifiable route/layout checks. |
| [OpenCLI](https://github.com/jackwener/opencli) | Read the usage skill. Its browser bridge is not connected in this runtime, so no OpenCLI browser session or installed adapter is claimed. GitHub connector and the existing Playwright workflow handle inspection and validation. |
| [Variate](https://github.com/Nutlope/variate) | Read the skill, craft and harness references. Applied structural variety, truthful artwork, responsive layouts and restrained motion. No localhost selection card or user choice session was run; the established studio identity was retained. |
| [Sahil Lavingia's Skills](https://github.com/slavingia/skills) | Applied minimalist-review principles: focus on visitor needs, simplify the stylesheet, keep useful project depth and avoid adding unrelated features. |

## Task Observer report-back

Observation: successive visual redesigns can leave a full superseded stylesheet underneath the new theme, creating hidden dependencies and contradictory tokens. The durable check is to trace retained selectors to source usage, remove only confirmed dead rules, and validate all existing routes in both themes and multiple viewport sizes. This pass removes the old theme import and records those checks in `scripts/check-portfolio.cjs`. This is a project-level observation, not a claim that the external skill was installed or modified.

## Validation

The workflow checks TypeScript, calendar/API interactions, project filtering and route preservation, then builds the production app. Browser checks cover ten routes at 1440, 768, 360 and 390 pixels, the new case-study headings, source links and next-project order, plus existing workbench, carousel, navigation, theme and saved motion controls. Screenshots of selected work and case-study layouts are emitted for visual review.

# Portfolio editorial redesign

Branch: `feat/portfolio-editorial-redesign`

## What changed

- A shared charcoal/lime design system, self-hosted Manrope variable font, editorial typography, and custom CSS orbital artwork.
- Responsive homepage, project index, six statically generated project detail pages, About, Timeline, and searchable Tools.
- CSS concept artwork for projects, explicitly identified as illustrative rather than deployed-product screenshots.
- Project category filters, mobile navigation with Escape/focus restoration, keyboard search, theme switching with a saved preference, copy-email feedback, and contact links.
- Scroll reveals and restrained ambient animation. OS reduced-motion preferences and a persistent manual motion toggle disable animations.
- Visible focus styles, a skip link, accessible control labels, semantic headings, and live status messages.
- Correct personal SEO metadata, canonical URLs, sitemap, robots.txt, and an original monogram favicon.
- Removed the homepage widget that queried a different person's LeetCode account. Direct links lead to the owner's coding profiles without presenting stale API values as live statistics.
- Fixed the GitHub repository feed to use the GitHub API and show recoverable loading/error states.
- Updated TypeScript from 4.6.3 to 4.9.5 to parse the dependency types in this repository. Both npm and pnpm lockfiles record the same compiler version.

## Content and maintenance

`src/data/portfolio.ts` owns profile links, capabilities, and selected milestones. `src/data/projects.ts` owns project details, categories, technologies, and existing external links. `src/styles/portfolio.css` owns the design system and responsive behavior.

Existing project/contact/profile URLs are retained. External project availability has not been certified. Career history remains based on the checked-in source; it should be updated separately with confirmed newer experience. No resume download is shown because this repository does not include a verified resume file.

The Manrope font is bundled locally with its SIL Open Font License in `public/fonts/OFL.txt`. The repository's original MIT license remains intact.

## Validation

- Production build: passed (including all six project detail pages).
- TypeScript check: passed.
- ESLint for changed TypeScript/TSX implementation and test files: passed.
- Targeted Jest suites: passed, five tests. Covers project filters, search empty/reset behavior, mobile menu Escape/focus restoration, active navigation, motion persistence, and clipboard rejection fallback.
- `git diff --check`: passed.
- Browser visual QA: pending. The available remote browser could not reach the isolated workspace's local server. Check the Vercel preview on desktop and mobile before merging.
- The pre-existing full test suite is not claimed as passing; only the targeted suites above were run.

## Review before merging

1. Run `npm ci --legacy-peer-deps`, then `npm run start`.
2. Review `/`, `/projects`, all six project detail pages, `/about`, `/timeline`, `/tools`, and `/projects/repos`.
3. Check 320 px, 390 px, 768 px, and 1440 px viewport widths in both themes. Confirm no horizontal overflow.
4. Verify keyboard navigation, mobile menu dismissal, project filters, toolbox search, email copying, and the command palette (Cmd/Ctrl+K).
5. Enable reduced motion, then verify the animation toggle independently.
6. Review external links and current personal content before merging.

## Branch review

The redesign is isolated on `feat/portfolio-editorial-redesign` for review. No PR is opened or merged automatically, and `main` is unchanged. Check the branch's Vercel preview before creating and merging the PR.

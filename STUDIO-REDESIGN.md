# Paper and cobalt portfolio

This iteration replaces the oversized orbital hero with a personal, typographic introduction and an interactive code workbench. The visual system uses warm paper, dark ink, cobalt, and a contrasting postcard contact area. Light is the default; an existing saved theme preference is preserved.

## Included

- Responsive home and about pages, with shared colours and typography across existing routes.
- Keyboard-operable Web / Systems / AI workbench tabs.
- Manually controlled principles carousel and introduction commands.
- GitHub and LeetCode activity calendars for the same inclusive 365-day UTC period.
- Separate contribution and submission totals; no invented activity or problem counts.
- Calendar date labels, roving keyboard focus, touch selection, overflow scrolling, retry states, and provider timeouts.
- Motion preference persistence and reduced-motion support.
- Existing project details, filters, toolbox search, and public profile links retained.
- Original project artwork remains explicitly labelled as illustrative.

## Activity sources

The server endpoint accepts only two fixed providers and fixed public usernames. GitHub data comes from the GitHub Contributions API used by React GitHub Calendar. LeetCode data comes from userCalendar for every year intersecting the window. Successful responses are cached for an hour; provider errors are never presented as empty data. No API key is required. External providers can delay or decline requests; visitors can retry or use the profile link.

## Validation for this iteration

The original local workspace was unavailable, so this iteration was reconstructed from the committed repository. Seventeen calendar assertions passed using the exact shared JavaScript module, including leap days, UTC/year boundaries, malformed input, streak resets, and duplicate-day handling. Jest regression cases are included.

Local Next.js, TypeScript, lint, Jest, and visual-browser checks could not be run in that session. Previous validation reports apply to the earlier design, not this iteration. Check the Vercel preview build for this branch before merging.

## Preview review

Review home, about, projects, a project detail, timeline, and tools at desktop and mobile sizes. Check both themes, keyboard navigation, the calendar retries, and reduced motion. The design has no added packages or lockfile changes.

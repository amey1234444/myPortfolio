# Portfolio studio redesign

A second design pass based on the supplied about-page and blue postcard references.

## Experience

- Warm paper / ink / cobalt palette, with a complete dark variant.
- Oversized typographic identity, interactive code workbench, project cards, and responsive about-page cards.
- User-controlled values carousel, terminal card, technology strip, and illustrated typographic details.
- Blue postcard contact form with native field validation. It opens an email draft in the visitor's email client; it does not claim to send mail from a server.
- Entrance, reveal, hover, and decorative motion respect both the existing pause control and the operating system's reduced-motion preference.

## Live activity

`GET /api/activity?platform=github|leetcode` provides a rolling 365-day UTC calendar.

- GitHub: `amey1234444`, through the public JoGruber GitHub Contributions API (also used by the existing react-github-calendar dependency).
- LeetCode: `amey_bhagwatkar_07`, through LeetCode's GraphQL endpoint. Current and previous calendar years are combined.
- Platform sources are labelled. Missing GitHub dates are shown as unavailable, not zero. LeetCode submissions are not presented as distinct problems solved.
- Requests time out, upstream failures return uncached errors, successful responses are cached at the edge, and the interface offers a retry and direct profile link.
- Calendars support hover, tap, and a single tab stop with arrow-key navigation; Home/End jump to the first/last day. Narrow screens scroll the calendar horizontally without scrolling the whole page.

## Verification

- Clean pnpm install with frozen lockfile retained from the dependency fix.
- Production pnpm build, including TypeScript validation and 28 static pages.
- Targeted interaction, calendar, and API tests; changed source files linted.
- No new runtime dependencies, fabricated activity, or borrowed personal photography.

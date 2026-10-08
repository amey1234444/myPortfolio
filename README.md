# Amey Bhagwatkar — Portfolio

A responsive personal portfolio built with Next.js, TypeScript, and Mantine. Features selected projects, individual project pages, a development timeline, coding profiles, and a searchable toolbox.

## Develop

```sh
npm ci --legacy-peer-deps
npm run start
```

Open `http://localhost:3000`. No API credentials are required for the primary portfolio pages.

## Validate

```sh
npm run typecheck
npm run build
npm run jest -- --runInBand src/components/Header/Header.test.tsx src/components/Portfolio/Portfolio.test.tsx
```

Start the production build with `npm run next-start`.

## Edit the content

- `src/data/portfolio.ts`: biography links, capabilities, and selected milestones.
- `src/data/projects.ts`: project descriptions, technology lists, categories, and external links.
- `src/data/tools.ts`: toolbox links.
- `src/styles/portfolio.css`: design tokens, responsive layouts, and motion.

Project artwork is illustrative. Add confirmed links and real screenshots when available. The core content is rendered without depending on third-party profile APIs.

## Accessibility and motion

Includes semantic landmarks, a skip link, visible keyboard focus, responsive navigation, reduced-motion support, and a persistent animation toggle. The light/dark preference is saved in a cookie. Fonts are self-hosted.

## Credits

The original codebase was adapted from Aycan Öğüt's Next.js/Mantine portfolio. The original MIT license is retained. Manrope is licensed under the SIL Open Font License, included in `public/fonts/OFL.txt`.

See [REDESIGN.md](REDESIGN.md) for the change summary, validation results, and review checklist.

# Colour and motion redesign

The October 13 screenshots and recording establish a different visual direction from the previous code-window studio: full-screen colour, tall hand lettering, moving hatch fills, visible texture and orbital skill imagery.

## Implemented

- Four introduction/project scenes: Amey, IMG Creator, GRID-X and News Platform. Dots, previous/next buttons and horizontal touch gestures change the scene. Every scene links to real portfolio content.
- Local, Latin-subset Amatic SC Bold for display lettering, paired with the existing Manrope body font. The font's SIL Open Font License is retained in `public/fonts/AmaticSC-OFL.txt`.
- Staggered letter entrances, animated pencil hatching, colour transitions, paper grain, hover treatments and section reveals.
- An orbital skills section on the homepage and Skills page. Ordinary buttons expose the skill descriptions; the planets are decorative.
- A quieter, non-terminal about card and coordinated project, navigation and contact styling. Removed the workbench and obsolete workbench/hero styles rather than hiding them beneath the new scene.
- Original project details, source links, activity calendars, themes and contact behaviour retained.

## Motion behaviour

The carousel advances every 7.5 seconds while visible and idle. Pointer hover pauses the timer; keyboard focus or a manual choice stops automatic advancement until Play slideshow is selected. It also stops outside the viewport, in a hidden tab, when the global motion preference is paused, or with OS reduced motion. A persisted global control stops decorative CSS motion too. Reduced motion leaves all content and manual navigation available.

Orbit motion stops when its section leaves the viewport and on pointer/keyboard interaction. No pointer trail, scroll hijacking, forced loading screen or WebGL dependency is introduced. Texture is a small self-hosted SVG; uploaded reference screenshots and recording are not distributed with the application.

## Validation

Tests cover carousel automatic/manual transitions, reduced motion, skill selection, existing calendar/API interactions, filtering and project routes. The browser workflow checks phone, tablet and desktop widths, keyboard navigation, theme and pause persistence, actual animated-letter playback and carousel advancement, and takes screenshots for visual review.

## Experience update — 13 October 2026

The supplied AI / Backend / Full Stack resume is the source for BlackRock
(Jan–Jun 2026), Intangles (Aug–Dec 2025), and Persistent Systems (Jan–Jun 2025).
Dates, roles, technologies, contributions and numeric outcomes are transcribed
or paraphrased from that document; they are user-supplied resume claims, not
independently verified company metrics. The private resume and offer letters
are not published as part of this change.

Removed the MTB Solutions block, timeline entry, About attribution and project
attribution. A shared experience data model now powers the detailed section on
Home, About and Journey. Navigation includes a direct Experience destination.

The supplied video informs the hand-lettered hierarchy, textured amber/rose/sky
chapters, staggered entrances and restrained hover movement. Company tabs have
arrow-key, Home/End and normal Tab navigation; previous/next controls wrap. There
is no auto-advance while reading. All transitions respect the existing site-wide
pause and operating-system reduced-motion preferences. All three company labels
remain visible at narrow widths, without requiring a horizontal swipe.

## Logos and contact interaction — 14 October 2026

Official employer marks are hosted locally, with a white mount to preserve
contrast in both themes. Selected marks settle into place; hover lifts the
mount, without altering the artwork. Image dimensions reserve space during
loading. Adjacent company names provide accessible names without repetition.

Contact fields keep persistent accessible labels and use decorative prompts
that lift and fade on focus. Prompts remain hidden for entered/autofilled
values, return for empty blurred fields, and never intercept pointer events.
A focus underline draws in while typing. CSS state handles clear/reset and
browser autofill without a second JavaScript value model. Global Pause and OS
reduced motion disable transitions but preserve every state change.

The newly attached 14 October recording was unavailable in the workspace;
no claim is made to have examined its frames. The existing design direction
continues from the previously inspected 13 October references.

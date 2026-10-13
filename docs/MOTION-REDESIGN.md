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

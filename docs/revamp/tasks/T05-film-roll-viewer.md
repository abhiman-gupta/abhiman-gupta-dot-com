# T05 · Film roll viewer

**Depends on:** T03 (+ T04 data API; mock it until T04 lands) · **Parallel with:** T04, T06–T09
**Highest craft bar on the site.** Abhiman asked for this specifically.
**Read first:** `00-VISION.md` (Signature moment 2), `01-DESIGN-SYSTEM.md` (Darkroom, Film, Real 35mm geometry, Motion),
`02-ARCHITECTURE.md` (Photography data API). **Open the mockup** (link in `00-VISION.md`) and click any strip; it's the reference.

## Owns
`src/components/filmroll/*`, `src/pages/photography/[slug].astro`.

## The experience
Opening `/photography/yosemite/` cuts through black to the darkroom. A horizontal strip of the same developed film as the
drying line runs across the screen: grey translucent base, perforation rows top and bottom, edge print in the rebates. The
**current frame** sits centered at full opacity; the rest of the strip continues left and right at **full size but dimmed:
±1 ≈ 0.35, ±2 ≈ 0.12**, the rest nearly invisible. Moving between frames feels like pulling film through your fingers:
it glides with inertia, then settles on a frame.

Below the strip: the collection title in the display font, the frame's caption, and a small label line
(`FRAME 07 / 14 · CALIFORNIA · 2026`, with EXIF behind an "i" toggle).

## Spec
- **Geometry:** frame height `H` = 24 mm of film; set `--mm = H / 24` px and draw everything in mm per `01-DESIGN-SYSTEM.md`.
  Landscape slots are 32 mm long, portrait slots 18 mm (both 4:3, upright for viewing). Gaps 2 mm, perforation rows 5.5 mm bands
  top and bottom (KS holes every 4.75 mm), edge print `12 ▸ 12A` top and `SAFETY FILM` / `400 ▸ n` bottom.
  `H = min(50vh, 600px, 0.84 × viewport width × 0.75)` so a landscape frame always fits on a phone.
- **Input:** drag/swipe (pointer events, velocity-based inertia, then snap); horizontal trackpad/wheel (vertical wheel keeps
  scrolling the page); ← → keys; click/tap a neighbor to bring it to the center; Home/End. Use `touch-action: pan-y` so vertical page
  scroll still works on phones. A tap must not register after a drag.
- **Opacity** interpolates continuously with distance from center during drags, not just on snap. No scaling of neighbors.
- **URL:** `/photography/yosemite/#7` deep-links to frame 7; update with `history.replaceState` when the strip settles.
- **Loading:** `<Picture>` sized for the center frame; neighbors ±2 eager, the rest lazy; preload the next frame on settle.
- **Contact sheet toggle:** all frames in a grid on the film base with frame numbers. Clicking one returns to the roll at that frame.
- **Entry transition:** splice through black from the drying line.
- **Desktop cursor:** over the strip a small label pill shows `← DRAG →`, or `NEXT` / `PREV` over a neighbor. White on black (monochrome).
- **Accessibility:** labelled carousel region (`aria-roledescription="film roll"`), alt text per frame, a live region announcing
  "Frame 7 of 14: <caption>", visible prev/next buttons. Without JS the page shows the contact-sheet grid.
- **Reduced motion:** no inertia or glide; frames switch instantly or with a short crossfade.
- **Empty collection:** one unexposed frame with the edge print and copy from `photography.yaml`.
- **Performance:** 60fps while dragging on a mid-range phone (transform/opacity only, no layout per frame); ≤ 25 KB gzipped JS for this page.

## Acceptance
- [ ] Feels great with a thumb on iOS Safari and Android Chrome and with a macOS trackpad. Screen recordings in the handoff.
- [ ] Mixed 4:3/3:4 roll of 40 test images: no layout jumps, no cropping, perforation spacing stays real at every viewport size.
- [ ] Deep links, keyboard, VoiceOver, no-JS fallback, and reduced motion verified.

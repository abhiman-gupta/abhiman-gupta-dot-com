# T06 · Home page

**Depends on:** T03 (+ T04 `FeaturedPhotos`; mock until ready) · **Parallel with:** T04, T05, T07–T09
**Read first:** `00-VISION.md` (brand brief, Phases, Signature moment 3), `01-DESIGN-SYSTEM.md`, `03-CONTENT.md` (Identity)

## Owns
`src/pages/index.astro`, `src/components/home/*`, `src/data/copy/home.yaml`, `src/assets/images/path/*`.

## Phase 1 sections (build these)
1. **Hero (sized to content, not 100vh).** Desktop: split layout. Left: the name very large in the display font (DM Mono), then
   **"Third-year PhD student in Optical Sciences at the University of Arizona."** and two links: Photography and
   Professional. **Nothing else.** Abhiman removed the location/coordinates line, the research one-liner and the "ten years
   with a camera" line; keep an empty optional `subline` field in `home.yaml` for lines he'll add later (render nothing when empty).
   Right: a 3:4 photograph that slowly crossfades through 3–5 featured frames (`FeaturedPhotos layout="hero-cycle"`,
   6s per frame, very subtle drift). Mobile: text first, then the photo (max ~56svh tall).
   Until real photos exist, use the headshot as the single frame. Black and white UI; the photo is the only color.
2. **Selected photographs.** An editorial, asymmetric spread of 3–5 frames (`FeaturedPhotos layout="spread"`) with a
   display-font heading and a link into `/photography/`. Generous space around each image.
3. **Cool Stuff teaser.** Three items from different Cool Stuff categories in their category styling, plus a link to
   `/cool-stuff/`. Hide the section if it's empty.
4. **Contact** is handled by the footer; don't duplicate it.

## Phase 2 (don't build yet; documented so the layout leaves room)
- **A short personal line** under the hero, in his words.
- **Latest articles**: appears once Articles launch (T07, Phase 2) and at least one is published. No teaser or placeholder before that.
- Path cards live on the Professional page (T09), not on Home.

## Acceptance
- [ ] No résumé patterns, no invented copy; all copy in `home.yaml`.
- [ ] LCP is the hero text or first hero image, < 2.5s on throttled mobile; no CLS from the crossfade.
- [ ] Looks deliberate at 375 px (most Instagram traffic).

# T06 · Home page

**Depends on:** T03 (+ T04 `FeaturedPhotos`; mock until ready) · **Parallel with:** T04, T05, T07–T09
**Read first:** `00-VISION.md` (brand brief, Phases, Signature moment 3), `01-DESIGN-SYSTEM.md`, `03-CONTENT.md` (Identity)

## Owns
`src/pages/index.astro`, `src/components/home/*`, `src/data/copy/home.yaml`, `src/assets/images/path/*`.

## Phase 1 sections (build these)
1. **Hero (sized to content, not 100vh).** Desktop: split layout. Left: **"Hi, I'm Abhiman"** in the display font (DM Mono,
   ~2.5–6.4rem, one line on desktop; "Hi, I'm" in `--muted`, "Abhiman" in ink, upright), then his line verbatim:
   **"I'm a third-year PhD student working on the intersection of polarization ray tracing, computer rendering, and ophthalmology."**
   **No links under it for now** (Abhiman removed them). Nothing else. Right: **his headshot**, crop the original `images/headshot.jpg` (1584 × 2217 px, ~5:7) to **3:4, 1350 × 1800 px at x=95, y=45** (slightly loose: headroom, shoulders and full collar, ends around the first button; Abhiman found 1200 × 1600 too tight),
   shown in a 3:4 frame with **no caption, no title, no frame number**. Mobile: text first, then the headshot
   (max ~56svh tall). Keep an empty optional `subline` field in `home.yaml` for later.
2. **Contact** is handled by the footer; don't duplicate it.

That's all for Phase 1: **Abhiman removed the photography and Cool Stuff sections from Home for now** (2026-11-09).

## Phase 2 (don't build yet; documented so the layout leaves room)
- **Selected photographs**: an editorial spread of 3–5 featured frames (`FeaturedPhotos layout="spread"`) linking to `/photography/`.
- **Cool Stuff teaser**: three items from different categories linking to `/cool-stuff/`.
- **A short personal line** under the hero, in his words.
- **Latest articles**: appears once Articles launch (T07, Phase 2) and at least one is published. No teaser or placeholder before that.
- Path cards live on the Professional page (T09), not on Home.

## Acceptance
- [ ] No résumé patterns, no invented copy; all copy in `home.yaml`.
- [ ] LCP is the hero text or first hero image, < 2.5s on throttled mobile; no CLS from the crossfade.
- [ ] Looks deliberate at 375 px (most Instagram traffic).

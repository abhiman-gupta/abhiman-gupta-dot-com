# T04 · Photography pipeline + the drying line

**Depends on:** T03 · **Parallel with:** T05–T09 · **Publish the data API early. T05 and T06 consume it.**
**Read first:** `00-VISION.md` (Signature moment 1), `01-DESIGN-SYSTEM.md` (Darkroom, Film, Real 35mm geometry),
`02-ARCHITECTURE.md` (Photography data API), `03-CONTENT.md` (Photography). **Open the mockup's Photography page**
(link in `00-VISION.md`); it's the reference for this task.

## Owns
`src/lib/photography.ts`, `src/components/photography/*`, `src/pages/photography/index.astro`,
`photography/collections/**/collection.json`, `PHOTOGRAPHY_WORKFLOW.md`, `src/data/copy/photography.yaml`.

## Part 1: Pipeline (`src/lib/photography.ts`)
Implement the API in `02-ARCHITECTURE.md` exactly.
- `import.meta.glob('/photography/collections/*/*.{jpg,jpeg,png,webp,JPG,JPEG}', { eager: true })` for images; read and
  validate each folder's `collection.json` (zod; the build fails with a message naming the file).
- **Aspect-ratio gate:** every photo must be 4:3 or 3:4 within ±1%. Otherwise fail the build listing each bad file and its ratio.
- Natural sort (`picture 10` after `picture 9`). No cover files: the first photos are the strip.
- EXIF via `exifr` at build time: camera, lens, focal length, aperture, shutter, ISO, date. **Strip GPS and all location data**
  from published images and data; set `Artist`/`Copyright` to "Abhiman Gupta" (`04-SECURITY.md`).
- Folders starting with `_` are ignored. Empty folders produce an empty collection.

## Part 2: The drying line (`/photography/`)
Darkroom surface (`body.darkroom`). Page title + one short line from `photography.yaml`, then the line(s):

- **Rod:** a metal rod spanning the content width; strips hang below it. Collections fill rows of 4 (desktop),
  3 (tablet), 2 (phone); each row has its own rod.
- **Label above the rod**, centered over each strip: collection title (display font) and a small label line
  (`14 FRAMES · CALIFORNIA`).
- **`FilmStrip` component:** an inline SVG drawn in millimetres to the real 35mm spec in `01-DESIGN-SYSTEM.md`:
  35 mm grey translucent base with a highlight gradient, KS perforations cut through with an SVG mask, 24 × 32 mm
  frames with rounded corners and a thin dark border, 2 mm gaps, edge print in the rebates (frame numbers one side,
  `SAFETY FILM` / `400 ▸ n` the other), 2–3 faint dust lines. Show the first 4 frames (5 if the collection has more than
  10). **Landscape photos are rotated 90° in their slot** like real negatives; portraits stay upright. The frame numbers
  start at a plausible mid-roll number rather than always 1.
- **Clips:** a steel clip (with a hook over the rod and small teeth) at the top and a heavier weighted clip at the bottom, both slightly wider than the film.
- **Backlight:** a faint neutral glow behind the row so the translucent base and perforation holes read as see-through.
- **Sway:** CSS animation on the strip's hanger: pendulum rotation ±1.1–2.1° plus a twist (rotateY ±5–11°) under
  perspective, 5–7.6s per swing, a different phase per strip, alternating `ease-in-out`. Origin at the rod.
- **Hover / keyboard focus:** pause the sway in place; amber `--glow` outline that follows the film shape (`drop-shadow`,
  so the perforations glow too), a warm backlight behind the strip, a warm tint on the base, frames brighten,
  and the label turns amber. Each strip is one link with an accessible name ("Open Yosemite, 14 frames").
- **Click** opens `/photography/<slug>/` with the splice transition.
- **Mobile:** 2 per row, strips ~132 px wide; tap opens directly (no hover state needed).
- **Reduced motion:** no sway; hover glow still works.
- **Empty state** (today's reality): one unexposed strip (blank frames, edge print only) with copy from `photography.yaml`
  (`TODO(copy)`) and a link to @abhimangupta on Instagram.
- **No-JS:** strips are static SVG + links, so the page works without JavaScript.

## Part 3: `FeaturedPhotos` component (used by T06)
Props `{ limit, layout: "hero-cycle" | "spread" }`; reads `getFeaturedPhotos`. Never crops 4:3/3:4 photos except the hero frame on mobile.

## Part 4: Docs
Rewrite `PHOTOGRAPHY_WORKFLOW.md` in plain steps for Abhiman: export from Lightroom (sRGB JPEG, quality 80–90, long edge
~2400 px, **crop to 4:3 or 3:4**) → make a folder like `yosemite/` → drop the JPEGs in, named in order → optional
`featured` list and captions in `collection.json` → push. Explain the build error you get for a wrong aspect ratio.

## Acceptance
- [ ] Builds with zero photos (empty state) and with 3 local test collections mixing 4:3 and 3:4 (don't commit them).
- [ ] A 3:2 test photo fails the build with a clear message.
- [ ] Strips match the mockup: real perforation spacing, sideways landscapes, labels above the rod, sway, and hover freeze + amber glow.
- [ ] 60fps while 8 strips sway (Performance panel, 4× CPU throttle).
- [ ] EXIF present for test JPEGs; no GPS anywhere in `dist/`.
- [ ] Data API published in your handoff and flagged in `STATUS.md` as soon as it exists.

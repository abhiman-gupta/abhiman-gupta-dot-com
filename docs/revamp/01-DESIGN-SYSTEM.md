# 01 · Design System (binding)

Implemented by **T02** in `src/styles/tokens.css` + `src/styles/global.css`. Every other task consumes these
tokens and must not hardcode colors, fonts, or easing. The mockup (`00-VISION.md` has the link) shows all of this
working; when in doubt, match it.

## Color: monochrome

The UI is black, white and neutral greys. **The only color on the site comes from the photographs and the amber
glow on hovered film.** No accent color.

### Site surfaces

**Chosen 2026-11-09: Bone** (first Paper, then switched to Bone). Abhiman found black too dark and picked from six neutral options in the mockup.
The site pages are always Bone; **no automatic dark mode in Phase 1** (the photography darkroom pages stay dark on purpose).

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#ecebe6` | page background (Bone) |
| `--paper-2` | `#e1e0da` | quiet panels (teasers, shelves) |
| `--mat` | `#f8f7f3` | print mats around images |
| `--ink` | `#121211` | text |
| `--muted` | `#64635e` | captions, metadata, inactive nav, the grey word in two-tone headlines |
| `--line` | `#cfcdc6` | hairlines |
| `--edge` | `#121211` | focus ring, link underline (same as ink) |
| `--shadow` | `rgba(0,0,0,0.18)` | print shadows |

Contrast ≥ 4.5:1 for body text. Rejected options, kept for reference: Paper `#f5f5f3`, Fog `#dfdfdc`, Concrete `#bdbdb9`,
Graphite `#2b2b2a`, Black `#0b0b0b` (full token sets are in the mockup's CSS). A dark-mode toggle can come later if wanted.

### Darkroom (always dark)

**Not used in Phase 1.** Since 2026-11-09 every page, including the drying line and the film roll viewer, uses the Bone background. Kept for reference only.

| Token | Value | Use |
| --- | --- | --- |
| `--dark` | `#0b0b0b` | darkroom background |
| `--dark-2` | `#171717` | raised panels on dark |
| `--dark-ink` | `#efefed` | text on dark |
| `--dark-muted` | `#8d8d8a` | secondary text on dark |
| `--glow` | `#f2a54a` | **the only UI color**: hovered/focused film outline, label, and backlight |

### Film

| Token | Value | Use |
| --- | --- | --- |
| `--film` | `rgba(196, 198, 193, 0.44)` | developed film base: grey and translucent, so the light behind shows through |
| `--film-ink` | `rgba(22, 22, 20, 0.72)` | edge print (frame numbers, "SAFETY FILM 400") |
| `--film-edge` | inset hairline + faint inner glow (see mockup) | the film's cut edges catching light |

On the Bone drying line the base is a **light grey** (gradient `#aaaca7` → `#83857f` → `#a7a9a4` at ~0.85–0.9 opacity; lightened twice on 2026-11-09) with **dark** edge print (`rgba(28,28,26,0.7)`). The film roll viewer uses **the same film colors** (gradient across the strip height) and Bone-colored perforation holes; labels use `--ink`. Hover outline is crisp amber, no blur. The film base also gets a subtle highlight gradient across its width (lighter at the edges and in one
streak) so it reads as glossy, slightly cupped film.

## Real 35mm geometry (binding for anything drawn as film)

Draw film in millimetre units (SVG `viewBox` in mm, or CSS with `--mm` = 1 mm in px) so proportions are real:

| Part | Size |
| --- | --- |
| Film width | 35 mm |
| Frame | 24 × 32 mm (4:3) with ~0.7 mm corner radius and a thin dark border |
| Gap between frames | 2 mm |
| Perforations (KS) | 2.8 mm across × 1.98 mm along, 0.42 mm radius, every **4.75 mm**, **cut through** the base (real holes, not painted) |
| Perforation position | 1.9 mm in from each edge |
| Edge print | in the 1.9 mm rebate outside the perforations: frame numbers on one side only (`12`, `▸ 12A`). **No barcode, no "SAFETY FILM" or ISO text** |

- On the **drying line** every frame is the same 24 × 32 mm slot, so landscape photos hang **sideways** (rotated 90°),
  exactly like real negatives. Portraits hang upright.
- In the **film roll viewer** photos are shown upright for viewing: landscape slots 32 mm long, portrait slots 18 mm,
  frame height = 24 mm of film.
- **Realism details, kept clean** (match the mockup's drying line): an even grey base with only a subtle highlight at the cut edges, gentle top-to-bottom light falloff on the film only (never over
  the photos), **no gloss or light streak**, a soft blurred dense **gate edge** (~0.6 mm) around every frame, thin highlights on perforation
  cut edges and the film's outer edges, and a soft low shadow on the Bone background. **No dust, scratches or barcode** (Abhiman
  found the imperfections made it look worse).
- **Never print real film brand names.** "SAFETY FILM" and an ISO number are generic.

## Photographs

- **Every photograph is 4:3 or 3:4.** The pipeline (T04) rejects anything else (±1% tolerance) with a clear build error.
- No separate cover crops. A collection's strip and first frame are just its first photos in order.
- Photos are never desaturated or tinted by the UI.

## Typography

**Rule: no italics anywhere.** Emphasis inside a headline is the same font in `--muted` grey (a two-tone headline),
never italic.

**Chosen by Abhiman (2026-11-09) from five candidates in the mockup:**

| Role | Font | Settings |
| --- | --- | --- |
| Display (name, headlines, page titles, collection labels, pull quotes) | **DM Mono** (400, 500) | weight 400; tracking -0.07em on large headlines, -0.03em on small display text; upright only |
| Text + UI (body, nav, captions, labels) | **DM Sans** (variable, optical size) | 400 body, 500–600 UI; labels uppercase with +0.15em tracking |

Both are SIL Open Font License; self-host woff2 (Latin subset), no Google Fonts requests at runtime. Use only the CSS
variables (`--display`, `--sans`, `--d-weight`, `--d-track`, `--d-track-sm`) so fonts stay a one-file change.
The other candidates (Instrument Serif/Sans, Geist, Newsreader, Barlow Condensed) were rejected; the mockup's font bar still has them for comparison.

Small labels (dates, counts, categories): text font 600, uppercase, `letter-spacing: 0.15em`, tabular numerals.

Fluid scale (`clamp()`):

| Token | Range | Font |
| --- | --- | --- |
| `--fs-hero` | 3.4rem → 9.6rem | display |
| `--fs-page` | 3.2rem → 10rem | display (page titles like "Photographs") |
| `--fs-h2` | 2.3rem → 4.6rem | display |
| `--fs-pull` | 1.75rem → 3.25rem | display, upright (article one-liners) |
| `--fs-lead` | 1.2rem → 1.6rem | text, 400 |
| `--fs-body` | 1rem → 1.0625rem | text, 400 |
| `--fs-essay` | 1.2rem → 1.375rem | text, 400, line-height 1.55, max 62ch |
| `--fs-label` | 0.72rem → 0.8rem | text, 600, uppercase |

## Space and layout

- 4px base: `--space-1` (4px) … `--space-10` (192px). Generous whitespace.
- 12-column grid, content max 1520px, `--gutter: clamp(16px, 4vw, 56px)` (never below 16px, plus safe-area insets).
- Editorial asymmetry: photos placed off-grid on purpose (offset columns, staggered heights); text stays aligned.
- "Print" treatment on paper pages: thin `--mat` border around an image, caption below in the label style.

## Texture

- **Grain:** fixed full-viewport noise overlay, ~7% opacity, `mix-blend-mode: overlay`, `pointer-events: none`. One static layer.
- **Image hover bloom:** a soft white glow fades in from one corner of interactive images (`screen` blend, ≤ 0.42 opacity). White, not orange.
- **Darkroom backlight:** a faint neutral glow behind the drying line so the translucent film and perforations read as see-through.

## Motion

| Token | Value | Use |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | entrances, hovers |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | transitions, crossfades |
| `--dur-fast` | 200ms | hovers |
| `--dur-med` | 400–500ms | glows, reveals |
| `--dur-slow` | 900ms+ | hero crossfades |

- **Drying-line sway:** each strip pendulums from its clip: rotate ±1.1–2.1° (2D only: **no rotateY/perspective**, which makes a paused strip render blurry), 5–7.6s per swing,
  random phase, `ease-in-out` alternate. Hover/focus pauses it in place (`animation-play-state: paused`).
- **Film roll:** drag with velocity, glide, then snap to the nearest frame; opacity of neighbors interpolates continuously.
- Text: headlines fade up line by line; body text just fades. No letter-by-letter effects.
- Page transition ("splice"): ~180–250ms fade through black.
- `prefers-reduced-motion: reduce` → no sway, no inertia, no crossfade drift; state changes are instant or plain fades.

## Components (owned by T03 unless noted)

`SiteHeader`, `SiteFooter`, `Grain`, `Reveal`, `Print`, `EdgeLabel`, `LinkArrow`.
Film parts (`FilmStrip` SVG, clips, rod) belong to T04; the roll viewer to T05; picks layouts to T08.

## Voice of the UI (micro-copy tone, not final copy)

Short, warm, confident, a little wry. "Next frame →", not "Navigate to next image". Labels in uppercase label style.

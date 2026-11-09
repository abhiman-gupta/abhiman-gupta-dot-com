# T02 · Design system: tokens, fonts, texture, global CSS

**Depends on:** T01 · **Unblocks:** T03 · **Parallel-safe:** no
**Read first:** `00-VISION.md`, `01-DESIGN-SYSTEM.md`

## Goal
Encode `01-DESIGN-SYSTEM.md` exactly in CSS, plus a dev-only style guide so later agents can see it.

## Owns
`src/styles/tokens.css`, `src/styles/global.css`, `public/fonts/*`, `public/grain.*`, `src/pages/dev/styleguide.astro` (render only in dev).

## Steps
1. Fonts: self-host **DM Mono** (400, 500; upright only) and **DM Sans** (variable, upright only) as Latin-subset woff2 in
   `public/fonts/`, with their OFL license files. No italic files. No runtime requests to Google Fonts.
2. `tokens.css`: every token in `01-DESIGN-SYSTEM.md` (monochrome site surfaces in light + dark, darkroom, `--glow`, film,
   type scale, space, grid, motion). Add a `.darkroom` class that remaps site tokens to darkroom values (the drying line and
   film roll use it). **No dark mode in Phase 1**: the site is always Bone. No accent color exists; `--edge` equals ink.
3. `global.css`: `@font-face` (`font-display: swap`), modern reset, base type, links (underline draws in
   ink on hover), focus-visible ring, `.wrap` / grid helpers, `.sr-only`, `.skip-link`, `::selection`,
   global reduced-motion guard.
4. Grain: create a small tileable noise texture (≤ 20 KB, PNG or inline SVG) and the `.grain` overlay rule.
5. Style guide page: palettes (light, dark, darkroom, film), type scale incl. italic display, labels, a `Print`-style
   image mock with mat and caption, the white hover bloom, a small film swatch at real 35mm proportions, grain on/off.

## Acceptance
- [ ] Token values match the spec tables exactly.
- [ ] Contrast measured and noted in handoff (≥ 4.5:1 body text on paper and dark).
- [ ] First-paint font payload ≤ 120 KB; display font preloaded.
- [ ] Grain overlay causes no measurable scroll jank (Performance panel, 6× CPU throttle).

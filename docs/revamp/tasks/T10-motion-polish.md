# T10 · Motion + texture polish pass

**Depends on:** T04–T09 all done · **Parallel-safe:** no
**Read first:** `00-VISION.md`, `01-DESIGN-SYSTEM.md` (Motion, Texture), all T04–T09 handoffs

## Owns
Small cross-cutting edits anywhere, each listed in the handoff with its reason. No redesigns.

## Spec
1. **Consistency audit:** one reveal language site-wide (same durations and easing from tokens). Fix any page that drifts.
2. **Smooth scroll:** Lenis on desktop fine-pointer only, off under reduced motion; re-init on `astro:page-load`, destroy on `astro:before-swap`.
   Must not fight the film roll's horizontal drag or the picks shelves.
3. **Splice transitions:** tune the fade-through-black between pages, especially drying line → film roll, until it feels like one continuous cut.
4. **Drying line:** tune sway tempo (2D only, no twist) so the strips feel like real film in moving air (never synchronized, never seasick), and the hover freeze + amber glow so it feels instant.
5. **Hover bloom:** the white bloom appears consistently on every interactive image and never on text. No other color anywhere except photos and the film glow.
6. **Hero:** tune crossfade timing and drift so it feels like breathing, not a slideshow.
7. **Micro-interactions:** nav underline, buttons, copy-email feedback.

## Acceptance
- [ ] 60fps scroll on desktop; no layout thrash.
- [ ] Navigating 20 times leaks no listeners (check counts).
- [ ] Reduced motion: calm, fully usable, still beautiful.

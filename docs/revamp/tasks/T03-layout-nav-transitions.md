# T03 · Base layout, header/footer, UI primitives, copy system, transitions, GA

**Depends on:** T02 · **Unblocks:** T04–T09 · **Parallel-safe:** no
**Read first:** `01-DESIGN-SYSTEM.md`, `02-ARCHITECTURE.md` (Copy, Analytics)

## Goal
The shell every page lives in, plus the copy-in-YAML system, so page tasks only build their `<main>` content.

## Owns
`src/layouts/BaseLayout.astro`, `src/components/ui/*`, `src/lib/copy.ts`, `src/data/copy/site.yaml`.

## Spec
**Copy system:** `getCopy(page)` loads `src/data/copy/<page>.yaml` (typed loosely). Any string starting with
`TODO(copy)` renders with a dashed outline in dev, and **fails the production build** with a list of
every remaining TODO and its file. This lets us ship structure now and wording later.

**`BaseLayout` props:** `title`, `description`, `surface?: "paper" | "darkroom"`, `ogImage?`, `transparentHeader?`.
Renders: no-flash theme script, meta/OG/Twitter/canonical, font preload, `<ClientRouter />`, skip link, `Grain`,
`SiteHeader`, `<main id="main">`, `SiteFooter`.

**GA4:** port the snippet and consent defaults from `scripts/build_pages.mjs` on `main` (see `02-ARCHITECTURE.md`), as an
external script file, not inline (Abhiman may switch to cookieless analytics; keep it easy to swap).

**Security (from `04-SECURITY.md` §3):** a CSP `<meta http-equiv>` on every page (Astro's hash-based CSP if available),
`<meta name="referrer" content="strict-origin-when-cross-origin">`, no inline scripts except a hashed no-flash theme script.

**`SiteHeader`:** wordmark **"Abhiman"** (first name only) on the left in DM Mono; nav on the right: **Professional ·
Photography · Cool Stuff · Contact** (labels from `site.yaml`; Articles gets added in Phase 2). Active item gets a small dot in `--edge` (ink).
Transparent with light text over hero images when `transparentHeader`; gains a paper background + hairline after
scroll. Mobile: full-screen overlay with large serif links, staggered in, and @abhimangupta at the bottom.

**`SiteFooter`:** one large serif line linking to contact (copy from `site.yaml`), a row of small edge labels
(© year, "Tucson, AZ", local time live in `America/Phoenix`), social links. Calm, not busy.

**Primitives** (`src/components/ui/`): `Grain`, `Reveal` (IntersectionObserver; variants `fade`, `rise`, `shutter`),
`Print` (`<Picture>` + optional mat, caption, frame number, white hover bloom), `EdgeLabel`, `LinkArrow`, `ThemeToggle`.
Document usage at the top of each file.

**Transitions ("splice"):** ~250ms fade through `--dark` between pages using View Transitions; expose a
`transition:name` convention (`photo-<collection>-<file>`) for shared-element morphs where useful. Respect reduced motion.

## Acceptance
- [ ] A dummy page renders header/footer correctly at 375, 768, 1440 px, on paper and darkroom surfaces.
- [ ] A `TODO(copy)` string shows in dev and fails `npm run build`.
- [ ] Theme persists without flash; mobile menu traps focus and closes on Esc.
- [ ] GA absent in dev; present in a prod build with the variable set.

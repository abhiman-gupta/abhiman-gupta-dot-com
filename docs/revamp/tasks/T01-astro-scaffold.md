# T01 · Astro scaffold + legacy cleanup

**Depends on:** nothing · **Unblocks:** T02 · **Parallel-safe:** no (runs alone first)
**Read first:** `README.md`, `02-ARCHITECTURE.md`

## Goal
Replace the hand-written static site with an empty but working Astro 5 project that builds to static `dist/`,
with the target folder structure in place.

## Owns
`package.json`, lockfile, `astro.config.mjs`, `tsconfig.json`, `src/content/config.ts`, a temporary
`src/pages/index.astro`, and deletion of legacy files.

## Steps
1. Create branch `revamp-v2` from `main`.
2. Init Astro 5 (minimal, TypeScript strict) **in the repo root**, preserving `photography/collections/`,
   `images/`, `docs/`, `.github/`, `CNAME`, `README.md`.
3. `astro.config.mjs`: `site: "https://abhimangupta.com"`, `trailingSlash: "always"`, `build.format: "directory"`,
   integrations `@astrojs/sitemap`, `@astrojs/mdx`.
4. Install `gsap`, `lenis`. Dev: `@astrojs/check`, `@astrojs/rss`, `typescript`, `sharp`, `exifr`, `yaml` (if needed for copy files).
5. Scripts: `dev`, `build` (`astro check && astro build`), `preview`.
6. Move `CNAME` → `public/CNAME`, `images/headshot.jpg` → `src/assets/images/headshot.jpg`.
7. Create the target directories (`.gitkeep`), `src/data/copy/`, and `src/content/config.ts` exporting `collections = {}`.
8. Delete everything under "Legacy to remove" in `02-ARCHITECTURE.md`. Delete the empty `photography/collections/trips/`.
9. Placeholder `index.astro` that renders "Abhiman Gupta".
10. Update `.claude/launch.json` to run `npm run dev` on port 4321.

## Acceptance
- [ ] `npm ci && npm run build` passes with zero errors; `dist/index.html` and `dist/CNAME` exist.
- [ ] No legacy HTML/JS/CSS at the root; `photography/collections/portraits/` present.
- [ ] `.github/workflows/pages.yml` untouched (T12 rewrites it), so `main` keeps deploying the old site.

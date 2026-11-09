# 02 · Architecture

## Stack

| Concern | Choice |
| --- | --- |
| Framework | **Astro 5**, static output |
| Styling | Plain CSS + custom properties (tokens), scoped component `<style>`. No Tailwind |
| Content | Astro Content Collections: MDX articles, YAML picks, photography folders read at build time |
| Images | `astro:assets` `<Picture>` → AVIF + WebP, responsive `srcset`, explicit dimensions |
| Motion | CSS first; `gsap` only where CSS can't do it (film roll inertia, hero crossfade timing); `lenis` for desktop smooth scroll |
| Transitions | Astro View Transitions (`<ClientRouter />`) |
| Hosting | GitHub Pages via Actions, domain `abhimangupta.com` |
| Node | 20 LTS+ |

Runtime deps allowed: `astro`, `gsap`, `lenis`. Dev deps: `@astrojs/check`, `@astrojs/sitemap`, `@astrojs/rss`,
`@astrojs/mdx`, `typescript`, `sharp`, `exifr` (build-time EXIF only). No three.js.

## Copy lives in data, not components

Wording is still being worked on, so **every user-facing sentence lives in `src/data/copy/<page>.yaml`**
(home, professional, photography, cool-stuff, contact, 404, site; articles in Phase 2). Components read from it. Changing wording later
means editing one YAML file, never a component. Unwritten copy is `TODO(copy): <what's needed>`, which renders
visibly in dev and fails the production build (T03 adds the check).

## Target structure

```text
/
├─ astro.config.mjs, package.json, tsconfig.json
├─ public/            CNAME, fonts/*.woff2, og/, favicon
├─ photography/
│  └─ collections/
│     └─ <slug>/      collection.json + images   (one folder per collection, e.g. yosemite/)
├─ src/
│  ├─ styles/         tokens.css, global.css                         (T02)
│  ├─ layouts/        BaseLayout.astro                               (T03)
│  ├─ components/
│  │  ├─ ui/          shared primitives                              (T03)
│  │  ├─ photography/ DryingLine, FilmStrip (SVG), FeaturedPhotos    (T04)
│  │  ├─ filmroll/    FilmRoll, ContactSheet                         (T05)
│  │  ├─ home/        Hero, PathFrames, …                            (T06)
│  │  ├─ articles/    article components                             (T07)
│  │  └─ picks/       Shelf, IconGrid, BrowserFrame, Reel            (T08)
│  ├─ lib/
│  │  └─ photography.ts   build-time photo loader (public API below)  (T04)
│  ├─ content/
│  │  ├─ config.ts        (T01 creates; T07/T08 append their collection)
│  │  ├─ articles/        (T07)
│  │  └─ picks/           (T08)
│  ├─ data/copy/*.yaml    page copy (each page task owns its file; T03 owns site.yaml)
│  ├─ assets/images/      headshot, path-frame visuals
│  └─ pages/
│     ├─ index.astro                         (T06)
│     ├─ photography/index.astro             (T04)
│     ├─ photography/[slug].astro            (T05)
│     ├─ articles/index.astro, [slug].astro  (T07, Phase 2)
│     ├─ cool-stuff.astro                    (T08)
│     ├─ professional.astro, contact.astro, 404.astro, redirects (T09)
└─ docs/revamp/
```

## Photography data API (contract between T04, T05, T06)

T04 implements; T05 and T06 consume it and may mock it until T04 lands.

```ts
// src/lib/photography.ts
export type Photo = {
  file: string;            // "012.jpg"
  index: number;           // 1-based frame number in roll order
  image: ImageMetadata;    // from import.meta.glob, for <Picture>
  width: number; height: number;
  orientation: "landscape" | "portrait";   // 4:3 or 3:4, validated at build time
  caption?: string;        // from collection.json captions
  alt: string;             // caption or "<title>, frame <n>"
  exif?: { camera?: string; lens?: string; focal?: string; aperture?: string; shutter?: string; iso?: number; date?: string };
};
export type Collection = {
  slug: string; title: string; location?: string; year?: string;
  category: "travel" | "portrait" | "street" | "other";
  description?: string; order: number;
  photos: Photo[];         // natural-sorted; every photo is 4:3 or 3:4 (build fails otherwise)
  featured: Photo[];       // files listed in collection.json "featured"
};
export function getCollections(): Promise<Collection[]>;      // sorted by order, then year desc
export function getCollection(slug: string): Promise<Collection | undefined>;
export function getFeaturedPhotos(limit?: number): Promise<(Photo & { collection: string })[]>;
```

`collection.json` schema:

```json
{
  "title": "Yosemite",
  "location": "California",
  "year": "2026",
  "category": "travel",
  "description": "optional one-liner",
  "order": 1,
  "featured": ["004.jpg", "011.jpg"],
  "captions": { "004.jpg": "Half Dome before the storm" }
}
```

## File ownership map

| Task | Owns |
| --- | --- |
| T01 | `package.json`, lockfile, `astro.config.mjs`, `tsconfig.json`, `src/content/config.ts` (initial), legacy removal |
| T02 | `src/styles/*`, `public/fonts/*`, `public/grain.*` |
| T03 | `src/layouts/*`, `src/components/ui/*`, `src/data/copy/site.yaml` |
| T04 | `src/lib/photography.ts`, `src/components/photography/*`, `src/pages/photography/index.astro`, `photography/collections/**/collection.json`, `PHOTOGRAPHY_WORKFLOW.md`, `src/data/copy/photography.yaml` |
| T05 | `src/components/filmroll/*`, `src/pages/photography/[slug].astro` |
| T06 | `src/pages/index.astro`, `src/components/home/*`, `src/data/copy/home.yaml`, `src/assets/images/path/*` |
| T07 | `src/pages/articles/*`, `src/components/articles/*`, `src/content/articles/*`, `src/data/copy/articles.yaml` |
| T08 | `src/pages/cool-stuff.astro`, `src/components/picks/*`, `src/content/picks/*`, `src/data/copy/cool-stuff.yaml` |
| T09 | `src/pages/professional.astro`, `contact.astro`, `404.astro`, redirect pages, `src/components/professional/*`, `public/.well-known/security.txt`, `src/data/copy/{professional,contact,404}.yaml` |
| T10 | small cross-cutting motion edits after T04–T09 are done (listed in handoff) |
| T11 | any file, fixes only |
| T12 | `.github/workflows/*`, `README.md` |

`src/content/config.ts` is shared: append your collection, don't rewrite others.

## Analytics

Same behavior as today's `scripts/build_pages.mjs` (on `main`): inject GA4 only when `import.meta.env.PROD`
and `PUBLIC_GA_MEASUREMENT_ID` matches `/^G-[A-Z0-9]+$/`; consent defaults deny ads, signals off; send `page_view`
on `astro:page-load`. Lives in `BaseLayout` (T03). The workflow maps the repo variable `GA_MEASUREMENT_ID` to it (T12).

## Deploy

Actions: checkout → setup-node → `npm ci` → `npm run build` → upload `dist/` → `deploy-pages`, SHAs pinned,
triggers push to `main` + manual. `public/CNAME` keeps the domain.

## Legacy to remove (T01)

All root HTML pages and folders (`index.html`, `contact/`, `academia/`, `notes/`, `photography/index.html`,
`photography/collection/`, `photography/photography.js`, `photography/collections.json`), `script.js`,
`styles.css`, `libs/`, `scripts/`, `Makefile`, `.openai/`, `fonts/EditorialNew`, `fonts/FoundersGroteskCondensed`.
Move `images/headshot.jpg` → `src/assets/images/headshot.jpg`. All facts are already captured in `03-CONTENT.md`.

# abhimangupta.com

Personal website of Abhiman Gupta. Built with [Astro](https://astro.build), deployed to GitHub Pages.

## Run it locally

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## What's where

| Path | What it is |
| --- | --- |
| `src/pages/` | Pages: Home, Professional, Photography (+ one page per album), Cool Stuff, 404 |
| `src/layouts/Base.astro` | Header, footer, security policy, analytics |
| `src/lib/photos.ts` | Reads locations from `photography/locations/` at build time |
| `src/styles/global.css` | Colors, type, layout |
| `photography/locations/` | One folder per place, shown as a marker on the Photography globe (see `PHOTOGRAPHY_WORKFLOW.md`) |
| `public/textures/earth.jpg` | Globe terrain: Natural Earth II, public domain (naturalearthdata.com) |
| `docs/revamp/` | Design system, decisions, security notes and plans for future pages (`05-FUTURE.md`) |

## Common edits

- **Photos:** follow `PHOTOGRAPHY_WORKFLOW.md`.
- **Shark Tank videos:** `src/pages/cool-stuff.astro`.
- **Home text:** `src/pages/index.astro`.

## Deploy

Every push to `main` builds and deploys via `.github/workflows/pages.yml`. Pull requests run a build check.
Google Analytics 4 loads only when the repository variable `GA_MEASUREMENT_ID` is set (ads and signals disabled).

## Security

The site ships a strict Content-Security-Policy, self-hosts its fonts, and has no forms or server code.
Account and DNS recommendations are in `docs/revamp/04-SECURITY.md`.

# 05 · Future: what's planned, already designed

Phase 1 is live-ready (see `STATUS.md`). This file lists everything Abhiman wants **later**, with the design already decided,
so each piece can be added without redesigning anything. Every item must follow `01-DESIGN-SYSTEM.md`: Bone background,
monochrome UI, DM Mono headings + DM Sans text, no italics, photos are the only color (plus the amber film hover glow).

Reference mockup for the designs below: https://claude.ai/artifact/CrxRgqYGsDz3ZaBjuBjA6w (private).

## Photography (live now; how it grows)

- **Add photos / albums:** see `PHOTOGRAPHY_WORKFLOW.md`. One folder per album in `photography/collections/<slug>/`, photos
  cropped to 4:3 or 3:4 and named `01.jpg`, `02.jpg`, … in viewing order, plus `collection.json` (`title`, `location`, `order`).
- Strips always show 4 frames; until an album has 4 photos the empty frames read **COMING SOON**. Albums beyond the first four
  wrap onto a new row of the drying line automatically.
- Possible later: album year and optional captions (captions are off by default; Abhiman removed them), a short line under the
  "Photography" title, full content-hash file names for published images (today Astro outputs `01.<hash>.webp`, which leaks nothing
  because sources are numbered).
- Tried and rejected, don't rebuild: rotating cylinder carousel, contact-sheet grid, "SAFETY FILM"/ISO edge text, barcode, dust,
  scratches, gloss streaks, 3D twist in the sway, darkroom (black) background.

## Professional page (now: "Coming soon")

Designed in the mockup's Professional view; build when Abhiman decides the contents.
- Title "Professional", then one line: third-year PhD student in Optical Sciences, University of Arizona, Polarization Lab.
- **Path cards:** a horizontal strip of print-style cards (white mat, 3:4 image, slight ±1.5° rotation on desktop, straight on mobile,
  scroll-snap). Draft set from `03-CONTENT.md`: Alcon Surgical (mid-IR fibers for eye surgery), Microvascular Therapeutics
  (ultrasound contrast agents for thrombosis), Startup Wildcats / Arizona FORGE (startups), Outstanding TA award. Each card: image,
  2–5 word title, organization label, one visible line. No résumé patterns.
- **Publications & recognition:** compact list (year · title link · venue): JBO 2023 paper, BMES 2023 poster, Roche award,
  Barrett scholarship (resolve the 2024 vs 2025 award years first), Google Scholar link.
- Data-driven (`src/data/professional.yaml` or similar) so sections can be added or removed without code changes.

## Cool Stuff (now: Shark Tank section with the Polygons video)

- **Shark Tank pitches:** live as embedded YouTube videos (`youtube-nocookie.com`). Add more by repeating the `<figure class="video">`
  block in `src/pages/cool-stuff.astro` (or move the list to a data file once there are a few).
- **Later sections, already designed in the mockup** (one layout per object type, all monochrome):
  - **Books:** spines on a shelf, black-to-off-white shades, title vertical in DM Mono; tap pulls a spine out and shows a one-line note.
  - **Apps:** home-screen grid of monochrome rounded icons (initials in DM Mono or greyscale real icons) with names.
  - **Websites:** framed browser-window cards (three dots + URL) with a screenshot, slightly tilted, loose collage on desktop, stacked on mobile.
  - Each item: name, link, and a one-line "why" **in Abhiman's words** (never written by an agent).

## Articles (Phase 2, not in the menu yet)

- Full design and build guide: `tasks/T07-writing.md` (George Mack-style: big type, short paragraphs, pull-quote one-liners,
  TL;DR box, "named idea" cards, MDX). Route `/articles/`. When the first article is ready, add "Articles" to the header and,
  if wanted, a "Latest articles" block on Home. No placeholder article before that.
- Drafts never go in this repo (it's public).

## Home (now: hero + footer)

- Optional later: a short personal line under the hero (Abhiman's words), a "Selected photographs" spread linking to Photography,
  a Cool Stuff teaser. All three were in the mockup and removed for now.

## Site-wide later

- Dark-mode toggle (Bone only for now).
- Analytics decision: keep GA4 (needs a consent banner for EU/UK visitors) or switch to cookieless analytics (`04-SECURITY.md`).
- Move `@abhimangupta.com` email from Zoho to iCloud+, then decide the public address (`04-SECURITY.md` §2 item 10).
- Done 2026-11-10: `security.txt`, social preview card, JSON-LD `Person`, sitemap, robots.txt. Possible later: per-page preview images (e.g. a photo for Photography).
- Smooth scrolling / motion polish only if it stays calm (`tasks/T10-motion-polish.md`).

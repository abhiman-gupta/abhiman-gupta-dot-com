# T08 · Cool Stuff (formerly "Picks"): the cabinet

**Depends on:** T03 · **Parallel with:** T04–T07, T09
**Read first:** `00-VISION.md` (Signature moment 5), `01-DESIGN-SYSTEM.md`, `03-CONTENT.md` (Picks)

## Owns
`src/pages/cool-stuff.astro`, `src/components/picks/*`, `src/content/picks/*`, the `picks` entry in
`src/content/config.ts` (append only), `src/data/copy/cool-stuff.yaml`.

## Concept
The page is called **Cool Stuff** (route `/cool-stuff/`). Internally the content collection can stay `picks`.
One page and several "chapters". Each chapter is a category whose layout matches the objects in it,
so the page feels hand-arranged and artistic. Everything shares the same paper, serif, and spacing,
so it still reads as one cabinet. **Everything is monochrome**: spines, icons, frames and chrome
in black, white and greys (the site has no accent color). Real screenshots or covers may show their own color only inside an image. Categories are data-driven: adding a new one (gear, places, podcasts) means
adding a YAML file and choosing one of the existing layouts.

## Data
`src/content/picks/<category>.yaml`:
```yaml
title: "Shark Tank pitches"   # TODO(copy)
layout: reel                  # reel | shelf | icons | browser | list
order: 1
items:
  - name: "Polygons"
    by: "Rahul Agarwal"
    url: "https://www.youtube.com/watch?v=xm1ShtnwIgU"
    why: "TODO(copy)"
    image: optional path in src/assets/picks/
```
Seed: `shark-tank.yaml` with Polygons (from `03-CONTENT.md`). Create `websites.yaml`, `apps.yaml`, `books.yaml`
with `items: []`. Empty categories are hidden in production, and shown in dev as a dashed placeholder.

## Layouts (`src/components/picks/`)
| Layout | Category | Treatment |
| --- | --- | --- |
| `reel` | Shark Tank pitches | A screening reel: wide 16:9 thumbnails on a band of the same grey translucent film (tokens from T02), with perforation rows. Click loads the YouTube embed in place (`youtube-nocookie.com`, lite-embed pattern: no iframe until click) |
| `shelf` | Books | Book spines standing on a shelf line, each spine a shade from black to off-white (item's `shade`, or alternate automatically) with the title vertical in serif. Hover/tap pulls a spine out and shows the cover + the "why" note. Mobile: horizontally scrollable shelf |
| `icons` | Apps | A home-screen grid of rounded monochrome app icons (initials in DM Mono, or the real icon converted to greyscale) with names; tap opens a small card with the why + link |
| `browser` | Websites | Framed browser-window cards (minimal chrome: three dots + URL) with a screenshot inside, tilted slightly, overlapping in a loose collage on desktop and stacked on mobile |
| `list` | anything else | Clean numbered serif list with why notes |

Each chapter opens with a big serif title, a chapter number edge label (`01`, `02`, …), and a one-line intro from `cool-stuff.yaml`.
A sticky mini-index (chapter names) on desktop; chips on mobile.

## Acceptance
- [ ] Adding an item or a category requires editing YAML only.
- [ ] Pages load no YouTube iframes until the user clicks (check the network panel).
- [ ] Every layout keyboard-accessible; spines and icons have accessible names.
- [ ] Works and looks intentional with only one item total (today's reality).

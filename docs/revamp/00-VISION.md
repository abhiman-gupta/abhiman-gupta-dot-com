# 00 · Vision: "Contact Sheet"

> Status: **direction confirmed in the mockup, 2026-11-09.** Abhiman reviewed the clickable mockup and steered it
> to its current state: https://claude.ai/artifact/CrxRgqYGsDz3ZaBjuBjA6w (private; ask Abhiman for access).
> Where this file and the mockup disagree, this file wins. The mockup's photos are generated placeholders and its copy is draft.

## Who Abhiman is (the brand brief, in his words, paraphrased)

- A cool person, **not that nerdy.**
- An excellent photographer. He wants to be seen as an **attractive lifestyle/travel photographer** and also as a
  **meaningful, artistic photographer** who cares about the depth of an image, not just the postcard.
- A third-year PhD student in optics. That's the **first fact** on the home page, said plainly. It's not a design theme.
- A varied path: laser systems for eye surgery, pharma/drug-delivery work, startup accelerator programs, photography awards.
- Writes punchy, useful essays in the spirit of **George Mack** (example: cold-emailing his way into internships in his last undergrad semester).
- Curates **cool stuff**: favorite Shark Tank pitches, websites, apps, inspiring books.
- Wants it **minimal and monochrome**: black and white, so the photographs carry all the color.

**These are design cues, not copy.** Wording will be worked on separately. All page text lives in data files
(see `02-ARCHITECTURE.md` → Copy) and is treated as draft.

## The idea in one line

**A black-and-white site built like a darkroom, where the only color is in the photographs.** Quiet editorial
typography on white (or black in dark mode), real film details, and a darkroom for viewing photos.

Minimal in structure, rich in texture: few elements per screen, each one crafted (grain, real film geometry,
frame numbers, the way a strip moves).

## Decisions so far

| Decision | Why / source |
| --- | --- |
| Monochrome UI: white/black, greys, no accent colors | Abhiman, 2026-11-09: "black-and-white… looks minimal" |
| Only color = photographs + an amber glow on hovered film | Abhiman asked to keep the amber glow |
| Photography index is a **darkroom drying line** | Abhiman's idea |
| Rotating cylinder carousel tried and **rejected** in favor of the drying line | Abhiman, 2026-11-09 |
| Film looks like **real developed 35mm**: grey translucent base, real perforations, edge print | Abhiman: "more like the real film" |
| **Every photo is 4:3 or 3:4** | Abhiman |
| One folder = one collection (e.g. *Yosemite*) | Abhiman |
| No @portraits.by.abhiman anywhere (account is being deleted); portraits still appear as a collection | Abhiman |
| **Hero: headshot (no caption) beside "Hi, I'm Abhiman" and his own research line** (exact copy in `03-CONTENT.md`) | Abhiman, 2026-11-09 |
| **Font: DM Mono (display) + DM Sans (text). No italics.** Picked from five candidates in the mockup's font bar | Abhiman: "a non-italic main font", then "I like the DM Mono font" |
| **Header: "Abhiman" · Professional · Photography · Cool Stuff · Contact** (first name only in the wordmark) | Abhiman |
| **Articles are Phase 2**: not in the menu, no placeholder article; the design and template stay documented (T07) | Abhiman: "keep articles in notes… we'll add later" |
| "Picks" is renamed **Cool Stuff** | Abhiman's header |
| **Start small, add incrementally.** The Professional page starts as a short draft (path cards + publications); Abhiman decides what stays | Abhiman |
| Security baseline in `04-SECURITY.md` | Abhiman asked for "as secure as needed" |
| Optics-lab look (WebGL beam, wavelength colors, lens loader) dropped | Too nerdy for the brand |

## Signature moments

1. **The drying line (Photography index).** On the same Bone background as Home, a metal rod runs across the page. Each collection is a
   strip of developed 35mm film clipped to the rod with a steel clip, a weighted clip at the bottom, showing its first
   4–5 frames. The collection name (title only) sits **just above the rod**, over their strip. Strips sway
   slowly, each at its own tempo (flat side-to-side swing, no 3D twist, so a paused strip stays sharp). A soft light behind the line shows through the translucent
   film and its perforation holes. **Hover or keyboard focus freezes the strip**; its outline and label glow amber,
   the light behind it warms, and its frames brighten. **Click opens the collection** in the film roll viewer.
2. **Film roll viewer.** The collection as a horizontal strip of the same film. The current frame sits centered at
   full opacity; neighbors stay full size but dim (±1 ≈ 0.35, ±2 ≈ 0.12). Drag/swipe, arrow keys, trackpad, or tap a
   neighbor to advance; the strip glides with inertia and snaps. Caption, place, and date sit underneath.
3. **A simple, confident hero.** *(Phase 1)* "Hi, I'm Abhiman" (with "Hi, I'm" in grey), then his line: "I'm a third-year PhD student working on the intersection of polarization ray tracing, computer rendering, and ophthalmology." No links under it for now. Beside it, his **headshot with no caption or title**, cropped to head and collar.
4. **Path as frames, not a résumé.** *(Phase 1 draft, on the Professional page; Abhiman refines what it shows)* Previous work as a short strip of 4–6 print-style cards (lasers for eye
   surgery, drug delivery, startup scholarship, award-winning photography, teaching award). Each has an image,
   a 2–5 word title, the organization as a small label, and one line. No dates column, no bullets, no timeline.
5. **Articles that hit.** *(Phase 2)* Article pages in the George Mack mould: big type, short punchy paragraphs, bold one-liners
   pulled out large, simple diagrams, a TL;DR up top. Readable in one sitting, shareable as one screenshot.
6. **Cool Stuff as a cabinet of curiosities.** Each category gets a layout that matches its objects (books as spines on
   a shelf, apps as an icon grid, websites as browser windows, Shark Tank pitches as a film reel), all in
   black, white and greys.
7. **Texture.** Fine film grain over the whole site, real film edge markings, page changes as a quick cut through
   black like a film splice.

## Principles

- **Photos are the only color.** If a UI element is colored, it's wrong (the amber film glow is the one exception).
- **Cool beats clever.** Confident and a little playful. Never academic-looking.
- **Minimal.** If an element doesn't make an image or an idea land harder, cut it.
- **Real over decorative.** Film details follow real 35mm film, not a cartoon of it.
- **Mobile is first-class.** Much of the audience arrives from Instagram on a phone.
- **Fast and accessible.** Lighthouse mobile ≥ 90; everything readable without JS; reduced motion stays beautiful.

## Visitors

| Visitor | Needs |
| --- | --- |
| Instagram followers, potential portrait clients (mostly mobile) | The photos, the vibe, how to get in touch |
| Readers arriving from a shared article | The article, then more articles and picks |
| Academics, recruiters | The research line, the Professional page, contact |

## Phases: start small, add incrementally

**Phase 1 (launch):** the smallest site that already feels finished.

| Route | Purpose |
| --- | --- |
| `/` | Just the hero ("Hi, I'm Abhiman" + research line + headshot, no links) and the footer. Photography and Cool Stuff sections come later |
| `/professional/` | Draft: PhD and lab line, path cards (Alcon, Microvascular Therapeutics, FORGE, teaching award), compact publications and recognition, Google Scholar link |
| `/photography/` | Drying line: one hanging film strip per collection |
| `/photography/[slug]/` | Film roll viewer for one collection |
| `/cool-stuff/` | Shark Tank pitches, books, apps, websites |
| `/contact/` | Email, Instagram, LinkedIn |
| `/404` | Designed 404 |

Header: wordmark **"Abhiman"** on the left; menu **Professional · Photography · Cool Stuff · Contact**.

**Phase 2+ (as Abhiman decides):** Articles (`/articles/`, design and template in T07), a longer story/About, more
Cool Stuff categories, more collections. Each is added without redesigning Phase 1.

Redirects for old URLs: `/academia/` → `/professional/`, `/recommendations/` → `/cool-stuff/`, `/notes/` → `/` (→ `/articles/` once articles exist).

## Out of scope

CMS, comments, newsletter, booking/payments, i18n, analytics beyond the existing GA4.

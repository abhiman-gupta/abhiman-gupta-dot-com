# T07 · Articles (George Mack-style writing) · **Phase 2**

**Depends on:** T03 · **Parallel with:** T04–T06, T08, T09
**Read first:** `00-VISION.md` (Signature moment 5, Phases), `01-DESIGN-SYSTEM.md`, `03-CONTENT.md` (Articles), `04-SECURITY.md` (drafts)

## Owns
`src/pages/articles/index.astro`, `src/pages/articles/[slug].astro`, `src/components/articles/*`,
`src/content/articles/*`, the `articles` entry in `src/content/config.ts` (append only), `src/data/copy/articles.yaml`.

## Status: Phase 2 (don't build in Phase 1)
Abhiman: "keep articles in notes, design guidelines, but we'll add later." Articles are **not in the menu** and there is
**no placeholder article**. This brief stays as the design and build guide for when he has his first article. When it starts,
add "Articles" to the header (T03) and a "Latest articles" block on Home (T06).

## What "George Mack style" means for the design
Study the format of his essays (big ideas, short lines, memorable named concepts, simple visuals); don't copy the words.
- Large, comfortable type (`--fs-essay`), single narrow column, lots of air.
- Very short paragraphs; frequent **bold one-liners** that can be pulled out large (`--fs-pull`, display font, upright).
- **TL;DR** box at the top: 3–5 numbered takeaways.
- **Named ideas**: a card for a coined concept ("The ___ Rule") with the name in the display font and a one-line definition.
- **Simple visuals**: full-width figures, sketches or diagrams with captions.
- A share affordance on pull quotes (copy a link to that quote's anchor).

## Spec
- **Collection schema:** `{ title, hook, date, tags?: string[], tldr?: string[], cover? }` in MDX so articles can use
  `<Pull>`, `<NamedIdea>`, `<TLDR>`, `<Figure>`. Only files in the collection are published. **Drafts never live in this repo**
  (it's public); see `04-SECURITY.md`.
- **No seed entry.** For checking typography, use a dev-only sample (`src/content/articles/_sample.mdx`) excluded from production builds.
- **Index, empty (today):** page title, one intro line and an empty state ("Nothing here yet…" style, from `articles.yaml`,
  `TODO(copy)`) with a link to the photographs. No fake titles, no "coming soon" teasers.
- **Index, with articles:** large display-font titles stacked with generous space, hook underneath, date and reading time as labels.
- **Article page:** title, hook, date and reading time, TL;DR, body, a thin reading-progress line in ink, then "Next article"
  and a small picks teaser. Heading anchors on every h2.
- **RSS:** `/articles/rss.xml` (valid even when empty).
- **OG image** per article: title in the display font on paper with grain.

## Acceptance
- [ ] Production build with zero articles: empty state shows, RSS is valid, no broken routes.
- [ ] The dev sample reads beautifully at 375 px and 1440 px; pull quotes and named ideas look screenshot-worthy.
- [ ] Adding an article means adding one `.mdx` file.

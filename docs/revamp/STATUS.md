# Revamp Status

Update this table when you start or finish a task. Keep notes short; details go in your handoff.
**Phase 1 = start small** (see `00-VISION.md` → Phases). Phase 2 items are listed so nobody builds them early.

**2026-11-09: Phase 1 site built** on branch `revamp-v2` (Astro 5.18.2) and merged to `main` (PR #4): Home (hero + footer),
Professional ("Coming soon"), Photography (drying line + film roll), Cool Stuff, 404, redirects, strict CSP, GA4 via repo variable,
deploy + PR-check workflows, Dependabot. It was built directly from the mockup rather than task by task.

**2026-11-10: `explore` branch (not yet merged to `main`).** The drying line, film-roll viewer and all film styling are gone.
Photography is a terrain globe (Natural Earth II, red markers) of photo locations, grouped by country; photos open in a plain dark
full-screen viewer. Cool Stuff is renamed **Recommended** (`/recommended/`, data in `src/data/recommended.json`: favorite X posts,
articles, Shark Tank pitches as links, no embeds). Public email is `hello@abhimangupta.com` (obfuscated footer link), plus an X link.
Older docs (00–02, 05, README) still describe film and Cool Stuff in places; this file and the decisions log win where they disagree.

Statuses: `todo` · `in progress` · `blocked` · `review` · `done` · `superseded`

| Task | Title | Depends on | Status | Owner (agent/session) | Handoff | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | Astro scaffold + legacy cleanup | none | done | | | Legacy build output (`_site/`, `.sites/`) still untracked in the repo root |
| T02 | Design system (DM Mono + DM Sans, monochrome) | T01 | done | | | Film tokens removed on `explore` |
| T03 | Layout, copy system, transitions, GA, CSP | T02 | done | | | Header: Abhiman · Professional · Photography · Recommended · Contact |
| T04 | Photo pipeline + drying line | T03 | superseded | | | Pipeline kept; drying line replaced by the globe on `explore` |
| T05 | Film roll viewer | T03 (+T04 API) | superseded | | | Replaced by a plain dark full-screen viewer |
| T06 | Home (Phase 1 sections only) | T03 (+T04 API) | done | | | Hero + footer only |
| T07 | Articles | T03 | **Phase 2** | | | Not in Phase 1; design kept in the brief |
| T08 | Cool Stuff cabinet | T03 | in progress | | | Now "Recommended": simple link lists, one item per section so far |
| T09 | Professional, Contact, 404, redirects, security.txt | T03 | in progress | | | Professional still "Coming soon"; no security.txt yet |
| T10 | Motion + texture polish | T04–T06, T08, T09 | todo | | | |
| T11 | Perf / a11y / SEO / security audit | T10 | in progress | | | SEO basics done 2026-11-10 (OG card, JSON-LD, sitemap, robots, security.txt); audit still to do, incl. globe weight and keyboard access |
| T12 | Deploy + cutover | T11 | in progress | | | Phase 1 live on `main`; `explore` needs Abhiman's OK to merge |

## Decisions log

- 2026-11-09: Monochrome UI; photos are the only color, plus an amber glow on hovered film.
- 2026-11-09: Photography index is a darkroom drying line of real 35mm strips; every photo 4:3 or 3:4.
- 2026-11-09: No @portraits.by.abhiman links (account being deleted).
- 2026-11-09: Font: **DM Mono** (display) + **DM Sans** (text). No italics.
- 2026-11-09: Header is "Abhiman" · Professional · Photography · Cool Stuff · Contact. Articles move to Phase 2 (no placeholder).
- 2026-11-09: Start small. The Professional page is a short draft (path cards + publications) for Abhiman to refine.
- 2026-11-09: Home hero = headshot (no caption, cropped 3:4, 1350 × 1800 from the top, less chest) + "Hi, I'm Abhiman" + his research line (verbatim in `03-CONTENT.md`). No hero links for now.
- 2026-11-09: Home is just the hero + footer for now (photography and Cool Stuff sections removed). Footer has no "Contact · research, portraits, collaborations" label.
- 2026-11-09: Footer line is just "© <year> Abhiman Gupta" (no Tucson, no local time).
- 2026-11-09: Photography index stays the **drying line**; the rotating carousel was tried and rejected.
- 2026-11-09: Photography index and film roll viewer both use the Bone background; no darkroom pages remain. Film is light grey with dark edge print, identical in both views.
- 2026-11-09: Film strips: mid-grey base (lightened after real photos went in), light edge print, crisp amber hover outline (no blur). Photography page title is "Photography", with no count label.
- 2026-11-09: First real album: "Albuquerque Balloon Festival" (flag photo first). Published photo files get content-hash names, never original names.
- 2026-11-09: No "SAFETY FILM"/"400" edge text anywhere; no photo captions by default; film roll titles in one uniform style; no "Frame n / N · place" line under the roll.
- 2026-11-09: Film looks clean: no dust, scratches, barcode, gloss or light streak; nothing is drawn over the photos.
- 2026-11-09: Contact sheet removed from the film roll viewer. Sway is 2D only, so paused strips stay sharp on hover.
- 2026-11-09: Second real album "Tucson Light" (saguaro/flare first, moonrise second), placed after the balloon festival.
- 2026-11-09: Drying line shows only the two real albums; strips are always 4 frames, empty slots read COMING SOON.
- 2026-11-09: Background is **Bone** (`#ecebe6`, switched from Paper); no automatic dark mode in Phase 1. Headshot crop approved.
- 2026-11-09: Full footer (contact, Instagram, LinkedIn) on Home only; other pages show just "© <year> Abhiman Gupta".
- 2026-11-10 (`explore`): Drying line replaced by a **terrain globe** of photo locations (country-level places, fading banners,
  places list hidden). Realistic terrain colors and red markers are a deliberate exception to monochrome, still being tried out.
- 2026-11-10 (`explore`): **All film styling removed** (drying line, film roll, film tokens). Photos open in a plain dark viewer.
  Don't reintroduce film/darkroom visuals unless Abhiman asks.
- 2026-11-10 (`explore`): Cool Stuff renamed **Recommended**; sections are favorite X posts, articles and Shark Tank pitches as
  links (no YouTube embeds, CSP `frame-src 'none'`). `/cool-stuff/` and `/recommendations/` redirect to `/recommended/`.
- 2026-11-10 (`explore`): Footer adds an X link (`@abhiman_gupta`); email shown as `hello@abhimangupta.com` via an obfuscated link.
- 2026-11-10: The site is about Abhiman as a person, **not photography-first**; photography shows he's creative, the PhD is part of him.
- 2026-11-10: Social preview = name + portrait card (`public/og.jpg`, rendered from `scripts/og/card.html` by `sh scripts/og/build.sh`),
  used on every page; pages can pass their own `image`. Home has schema.org `Person` JSON-LD (facts only). Sitemap is generated from
  the pages; `robots.txt` and `security.txt` (contact `hello@abhimangupta.com`) are in `public/`.

## Security to-dos for Abhiman (details in `04-SECURITY.md` §2)

- [x] **`www` CNAME:** live DNS points to `abhiman-gupta.github.io` (checked 2026-11-10).
- [x] **GitHub Pages domain verification:** `abhimangupta.com` is shown as verified in account settings (checked 2026-11-10).
- [x] 2FA on GitHub, GoDaddy, iCloud and Google (reported by Abhiman 2026-11-10). GitHub uses SMS; an authenticator app or security key would be stronger where supported.
- [x] Domain auto-renew enabled (reported by Abhiman 2026-11-10); GoDaddy transfer lock is on.
- [x] DMARC monitoring record is present (`p=none`, reports to `hello@abhimangupta.com`; checked 2026-11-10).
- [x] Apex CAA `0 issue "letsencrypt.org"` added and verified in DNS on 2026-11-10. Review it when changing hosting or adding services that need certificates for this domain.
- [ ] **Turn on Dependabot alerts and a `main` ruleset** (approved 2026-11-10). Claude couldn't: the local `gh` login (`abhimangupta`) has
  read-only access to `abhiman-gupta/abhiman-gupta-dot-com`. In the repo: Settings → Advanced Security → Dependabot alerts → Enable;
  Settings → Rules → Rulesets → New branch ruleset: target the default branch, keep "Restrict deletions" and "Block force pushes", Active.
- [ ] `public/.well-known/security.txt` **expires 2027-11-10**: bump the `Expires` date before then.
- [ ] Before merging the Dependabot PR that moves `upload-pages-artifact` to v4+/v5, add `include-hidden-files: true` to it in
  `.github/workflows/pages.yml`, or `.well-known/` stops deploying.
- [ ] Analytics: keep GA4 (needs a consent banner for EU/UK visitors) or switch to cookieless analytics?

## Later (decided, not scheduled)

- [ ] Move `@abhimangupta.com` email from Zoho to **iCloud+ Custom Email Domain**, then remove Zoho (steps in `04-SECURITY.md` §2, item 10).

## Questions for Abhiman

**Facts (Phase 2, professional side; whenever you're ready)**
- [ ] Professional page: keep, cut or add to the draft (path cards, publications & recognition).
- [ ] The other pharma companies (only Microvascular Therapeutics is on record).
- [ ] Award years: Outstanding TA and Roche award, 2024 (LinkedIn) or 2025 (current site)?
- [ ] The four photography awards, and which photo won.
- [ ] CV PDF to link?

**Phase 1**
- [ ] Dark-mode toggle later, or Bone only? (Bone only for Phase 1.)
- [x] Public email: `hello@abhimangupta.com` (iCloud+), shown via the obfuscated footer link.
- [ ] More photos and places for the globe; years for the existing ones.
- [ ] Keep the globe and merge `explore` into `main`?
- [ ] Recommended lists: more X posts, articles, Shark Tank pitches (and books/apps/websites?), each with a one-line "why".
- [ ] All `TODO(copy)` wording. We'll go through these together page by page.

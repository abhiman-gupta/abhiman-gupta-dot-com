# Revamp Status

Update this table when you start or finish a task. Keep notes short; details go in your handoff.
**Phase 1 = start small** (see `00-VISION.md` → Phases). Phase 2 items are listed so nobody builds them early.

**2026-11-09: Phase 1 site built** on branch `revamp-v2` (Astro 5.18.2): Home (hero + footer), Professional ("Coming soon"),
Photography (drying line + film roll, albums "Albuquerque Balloon Festival" and "Tucson Light"), Cool Stuff (Shark Tank section with the
Polygons YouTube embed), 404, redirects, strict CSP, GA4 via repo variable, deploy + PR-check workflows, Dependabot.
It was built directly from the mockup rather than task by task, so the task rows below describe the fuller plan; what's still
ahead is collected in `05-FUTURE.md`.

Statuses: `todo` · `in progress` · `blocked` · `review` · `done`

| Task | Title | Depends on | Status | Owner (agent/session) | Handoff | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | Astro scaffold + legacy cleanup | none | todo | | | |
| T02 | Design system (DM Mono + DM Sans, monochrome) | T01 | todo | | | |
| T03 | Layout, copy system, transitions, GA, CSP | T02 | todo | | | Header: Abhiman · Professional · Photography · Cool Stuff · Contact |
| T04 | Photo pipeline + drying line | T03 | todo | | | Publish data API early; match the mockup |
| T05 | Film roll viewer | T03 (+T04 API) | todo | | | Signature piece |
| T06 | Home (Phase 1 sections only) | T03 (+T04 API) | todo | | | |
| T07 | Articles | T03 | **Phase 2** | | | Not in Phase 1; design kept in the brief |
| T08 | Cool Stuff cabinet | T03 | todo | | | Formerly "Picks" |
| T09 | Professional, Contact, 404, redirects, security.txt | T03 | todo | | | Professional is a small draft |
| T10 | Motion + texture polish | T04–T06, T08, T09 | todo | | | |
| T11 | Perf / a11y / SEO / security audit | T10 | todo | | | |
| T12 | Deploy + cutover | T11 | todo | | | Needs Abhiman's OK to merge |

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

## Security to-dos for Abhiman (details in `04-SECURITY.md` §2)

- [ ] **Change the `www` CNAME** from `abhimangupta27.github.io` (that username no longer exists) to `abhiman-gupta.github.io`.
- [ ] **Verify `abhimangupta.com` in GitHub** (profile → Settings → Pages → Add a domain).
- [ ] 2FA (passkey or authenticator app) on GitHub, domain registrar, Zoho Mail, Google.
- [ ] Domain auto-renew + registrar lock on.
- [ ] Add a DMARC record (start with `p=none`), then a CAA record for `letsencrypt.org`.
- [ ] OK for Claude to turn on Dependabot alerts/updates and a `main` ruleset (no force-push, no deletion)?
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
- [ ] Public email: `abhiman@abhimangupta.com` (on Zoho now, moving to iCloud+ later) or `abhimangupta@arizona.edu`?
- [ ] Albuquerque Balloon Festival and Tucson Light: years, any more photos. Other collections for the Photography page.
- [ ] Cool Stuff lists: websites, apps, books, more Shark Tank pitches, each with a one-line "why".
- [ ] All `TODO(copy)` wording. We'll go through these together page by page.
- [ ] Keep the amber glow on hovered film, or make it white too?

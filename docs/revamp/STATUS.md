# Revamp Status

Update this table when you start or finish a task. Keep notes short; details go in your handoff.
**Phase 1 = start small** (see `00-VISION.md` → Phases). Phase 2 items are listed so nobody builds them early.

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

## Security to-dos for Abhiman (details in `04-SECURITY.md` §2)

- [ ] **Change the `www` CNAME** from `abhimangupta27.github.io` (that username no longer exists) to `abhiman-gupta.github.io`.
- [ ] **Verify `abhimangupta.com` in GitHub** (profile → Settings → Pages → Add a domain).
- [ ] 2FA (passkey or authenticator app) on GitHub, domain registrar, Zoho Mail, Google.
- [ ] Domain auto-renew + registrar lock on.
- [ ] Add a DMARC record (start with `p=none`), then a CAA record for `letsencrypt.org`.
- [ ] OK for Claude to turn on Dependabot alerts/updates and a `main` ruleset (no force-push, no deletion)?
- [ ] Analytics: keep GA4 (needs a consent banner for EU/UK visitors) or switch to cookieless analytics?

## Questions for Abhiman

**Facts (Phase 2, professional side; whenever you're ready)**
- [ ] Professional page: keep, cut or add to the draft (path cards, publications & recognition).
- [ ] Plain-language one-liner for what you work on.
- [ ] The other pharma companies (only Microvascular Therapeutics is on record).
- [ ] Startup accelerator programs and the entrepreneur-in-residence role: names and places.
- [ ] The four photography awards, and which photo won.
- [ ] CV PDF to link?

**Phase 1**
- [ ] Public email: `abhiman@abhimangupta.com` (your Zoho mailbox) or `abhimangupta@arizona.edu`?
- [ ] First photo collections (e.g. Yosemite) + 3–5 featured frames for the home hero.
- [ ] Cool Stuff lists: websites, apps, books, more Shark Tank pitches, each with a one-line "why".
- [ ] Optional hero subline (the hero is name + PhD line for now).
- [ ] All `TODO(copy)` wording. We'll go through these together page by page.
- [ ] Keep the amber glow on hovered film, or make it white too?

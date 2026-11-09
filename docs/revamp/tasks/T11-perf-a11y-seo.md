# T11 · Performance, accessibility, SEO audit + fixes

**Depends on:** T10 · **Parallel-safe:** no · Fixes only; no redesign.
**Read first:** all handoffs

## Checks and targets
| Area | Target |
| --- | --- |
| Lighthouse mobile (Home, Professional, Photography index, a film roll, Cool Stuff, Contact) | Perf ≥ 90, A11y 100, Best Practices ≥ 95, SEO 100 |
| LCP / CLS / INP (throttled mobile) | < 2.5s / < 0.05 / < 200ms |
| JS per page (gzipped) | ≤ 40 KB, except the film roll page ≤ 60 KB |
| Images | AVIF/WebP served, correct `sizes`, nothing over 2× the display size, no GPS EXIF in `dist/` |
| axe-core | 0 violations on every page, paper and dark |
| Keyboard-only walkthrough | everything reachable; film roll, picks shelves, mobile menu |
| VoiceOver (iOS Safari) | film roll announces frames; picks items have names |
| JS disabled | every page readable; film roll falls back to a simple list of frames |

## SEO / sharing
- Unique `title`/`description` per page (from copy YAML), canonical URLs, sitemap, `robots.txt`.
- JSON-LD `Person` on Home (name, jobTitle, affiliation University of Arizona, sameAs Instagram @abhimangupta + LinkedIn).
- OG images 1200×630: Home, Photography, each collection (its film strip + title), Professional, Cool Stuff (articles in Phase 2). Sharing must look great on
  Instagram stories, iMessage, and LinkedIn previews.
- Confirm there are zero `TODO(copy)` strings left (the build check from T03). If any remain, list them for Abhiman instead of inventing copy.

## Security checks (from `04-SECURITY.md` §3)
- CSP meta present on every page and nothing in the console violates it; no inline scripts.
- No runtime requests to third parties except analytics (and YouTube only after a click). Check the Network panel.
- No GPS/location EXIF in any file in `dist/` (run `exiftool -gps:all -r dist` or equivalent).
- `security.txt` present; 404 doesn't echo the URL.
- Run securityheaders.com and Mozilla Observatory against the preview and record results (header limits of GitHub Pages are expected).

## Deliverable
`docs/revamp/handoffs/T11-audit.md`: before/after scores, fixes made (file + reason), anything left for Abhiman.

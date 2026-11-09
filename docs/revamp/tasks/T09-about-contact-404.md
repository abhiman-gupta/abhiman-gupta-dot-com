# T09 · Professional page, Contact, 404, redirects, security.txt

**Depends on:** T03 · **Parallel with:** T04–T08
**Read first:** `00-VISION.md`, `01-DESIGN-SYSTEM.md`, `03-CONTENT.md` (Identity, About page material, Contact)

## Owns
`src/pages/about.astro`, `src/pages/contact.astro`, `src/pages/404.astro`, the redirect pages
(`academia`, `notes`, `recommendations`), `src/data/copy/{about,contact,404}.yaml`.

## Professional (`/professional/`, Phase 1 draft)
In the header. Abhiman will decide the final contents, so build it small and data-driven (`professional.yaml`) so sections can be
added, removed or reordered without code changes. Match the mockup's Professional view:
- Page title, then one line: third-year PhD student in Optical Sciences at the University of Arizona, Polarization Lab.
- **Path cards**: a horizontal strip of print-style cards (white mat, 3:4 image, slight rotation on desktop, straight on mobile,
  scroll-snap). Draft set: Alcon Surgical (lasers for eye surgery), Microvascular Therapeutics (drug delivery hardware),
  Arizona FORGE (health startup scholarship), Outstanding TA award. Each: image, 2–5 word title, org label, one visible line. Facts only from `03-CONTENT.md`.
- **Publications & recognition**: a compact list (year · title/link · venue), e.g. the JBO paper, the BMES poster, the Roche award,
  the Barrett scholarship, plus a Google Scholar link.
- No résumé patterns (no duty bullets, no timeline). Monochrome, DM Mono headings.

## Contact
- A big serif line + the purpose line (`contact.yaml`).
- Large email link with a copy-to-clipboard button ("Copied" feedback, `aria-live`); falls back to `mailto:` without JS.
- Rows for Instagram (@abhimangupta) and LinkedIn. **No @portraits.by.abhiman** (being deleted); portrait inquiries go through email or Instagram.
- No form.

## 404 ("overexposed")
The page appears blown out to near-white and "develops" back to normal over ~1.2s (or instantly with reduced
motion). Copy from `404.yaml` (`TODO(copy)`), plus links home and to photography.

## security.txt
`public/.well-known/security.txt` with `Contact:` (Abhiman's public email) and `Expires:` one year out (`04-SECURITY.md`).

## Redirects
Static pages at `/academia/` → `/professional/`, `/recommendations/` → `/cool-stuff/`, `/notes/` → `/` (→ `/articles/` in Phase 2): meta refresh,
canonical to the target, and a visible fallback link.

## Acceptance
- [ ] Professional page facts all come from `03-CONTENT.md`; nothing invented; sections editable in `professional.yaml`.
- [ ] `dist/404.html` exists; all three redirects work.
- [ ] Copy button works; the page is fine without JS.

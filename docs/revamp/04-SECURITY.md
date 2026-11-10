# 04 · Security

A personal static site is low-risk by nature: no server code, no database, no logins, no forms. The real risks are
around it: **accounts** (GitHub, domain registrar, email), **DNS** (someone serving content on your domain), the
**build pipeline** (a compromised dependency or Action), and **privacy** (what photos, analytics and email reveal).

This file has three parts: what I checked on 2026-11-09, what Abhiman should do now (most of it is account and DNS
settings only he can change), and the rules the revamp build must follow.

## 1. What I checked (2026-11-09)

| Area | Finding | Status |
| --- | --- | --- |
| Hosting | GitHub Pages, built by Actions, repo `abhiman-gupta/abhiman-gupta-dot-com` (public) | OK |
| HTTPS | Certificate approved, **HTTPS enforced**, `http://` 301-redirects to `https://` | OK |
| `www` subdomain | Redirects to the apex correctly, **but its DNS CNAME points to `abhimangupta27.github.io`, a GitHub username that no longer exists** (the account was renamed to `abhiman-gupta`) | **Fix now** |
| Domain verification in GitHub | Not verified (`protected_domain_state: null`) | **Fix now** |
| DNSSEC | Enabled (DS records present) | OK |
| CAA record | None (any certificate authority may issue for the domain) | Should fix |
| Email (Zoho) | MX → Zoho, SPF present (`~all`), DKIM present (`zmail` selector), **no DMARC record** | Should fix |
| IPv6 | No AAAA records for GitHub Pages | Nice to have |
| Security headers | Only `server: GitHub.com`. No HSTS, CSP, X-Frame-Options, etc. GitHub Pages doesn't allow custom headers | Known limit (see §3) |
| Branch protection / rulesets on `main` | None | Should fix |
| Dependabot alerts | Off | Should fix |
| Actions workflow | Actions pinned to commit SHAs, minimal `permissions` | OK (keep it) |
| Analytics | GA4 with ads/signals disabled but **analytics cookies on by default**, no consent banner | Decide (see §2) |
| Repo visibility | Public (required for Pages on a free plan), so anything committed, including drafts, is public | Keep in mind |

## 2. Do now (Abhiman; account and DNS settings)

Ranked by how much harm each prevents. None of these depend on the revamp.

**Must do**
1. **Fix the `www` record.** At your DNS provider, change the `www` CNAME from `abhimangupta27.github.io` to
   `abhiman-gupta.github.io`. *Why:* the old username is free for anyone to register. Whoever takes it could publish a
   site that answers on `www.abhimangupta.com` (a "subdomain takeover").
2. **Verify the domain in GitHub.** Your profile → Settings → Pages → *Add a domain* → add `abhimangupta.com` and create the
   TXT record GitHub gives you. *Why:* once verified, no other GitHub account can attach your domain or its subdomains to their Pages site.
3. **Two-factor authentication everywhere**, preferably passkeys or an authenticator app (not SMS): GitHub, your domain
   registrar, Zoho Mail, and the Google account that owns Analytics. *Why:* an account takeover beats every other protection here.
4. **Domain: auto-renew on, registrar lock on**, and make sure the registrar's contact email is one you read. *Why:* an expired or
   transferred domain is the most common way personal sites are lost.

**Should do**

5. **Add a DMARC record** so others can't easily send email pretending to be `@abhimangupta.com`. Start in monitor mode:
   `_dmarc.abhimangupta.com TXT "v=DMARC1; p=none; rua=mailto:<your address>"`. Once reports show only Zoho sending, move to
   `p=quarantine`. Optionally tighten SPF from `~all` to `-all` at the same time.
6. **Add a CAA record** so only GitHub Pages' certificate authority can issue certificates for your domain:
   `abhimangupta.com CAA 0 issue "letsencrypt.org"`. (Update this if you ever move hosting, e.g. to Cloudflare.)
7. **Repo settings** (I can do these with your OK): turn on Dependabot alerts and security updates, keep secret scanning and
   push protection on, and add a ruleset for `main` that blocks force-pushes and branch deletion.
8. **Analytics and privacy:** GA4 sets analytics cookies. If visitors from the EU/UK matter to you, that strictly needs a consent
   banner. Simpler options: switch to a **cookieless** analytics tool (Cloudflare Web Analytics, GoatCounter or Plausible), so no
   banner is needed, or drop analytics. Either way, add a short "Privacy" note in the footer saying what's collected.

**Nice to have**

9. Add GitHub Pages' AAAA (IPv6) records for the apex (listed in GitHub's custom-domain docs).
10. **Done (checked 2026-11-10): domain email runs on iCloud+ Custom Email Domain** (MX, SPF and DKIM point to iCloud; Zoho records are gone; DMARC is still missing, see item 5). History: Abhiman has iCloud+, which includes custom email domains, so
    `@abhimangupta.com` mail could run through iCloud Mail instead of Zoho. Setup happens in iCloud settings (Custom Email Domain), and Apple gives
    the exact MX, SPF, DKIM and verification records to add at the DNS provider. Caveats: the domain's MX records can point to only one mail
    provider, so switching replaces Zoho (move any mail you want to keep first). At switch time: remove Zoho's MX records, its SPF include
    (`dc-8e814c8572._spfm`) and its DKIM record (`zmail._domainkey`), add Apple's records, then add/update DMARC. Cancel Zoho only after
    iCloud receives mail. Apple's limits (number of domains
    and addresses per domain) should be checked in its current documentation at setup time.
11. **Done (2026-11-10):** the site shows `hello@abhimangupta.com` instead of the university email. The address is never written out in
    the HTML; the footer script assembles it from two reversed halves, so raw-HTML scrapers miss it.

## 3. Rules for the revamp build (agents must follow)

**Headers and CSP.** GitHub Pages can't send custom headers, so:
- Ship a **Content-Security-Policy as a `<meta http-equiv>` tag** on every page. Use Astro's built-in hash-based CSP support if the
  installed Astro version has it; otherwise write the meta tag in `BaseLayout`. Target policy:
  `default-src 'self'; script-src 'self' https://www.googletagmanager.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com; img-src 'self' data: https://*.google-analytics.com https://www.googletagmanager.com; style-src 'self'; font-src 'self'; frame-src https://www.youtube-nocookie.com; object-src 'none'; base-uri 'self'; form-action 'none'; upgrade-insecure-requests`.
  `upgrade-insecure-requests` is emitted only in GitHub Actions builds (the deployed site): Safari applies it to
  `http://localhost`, which would break local previews.
  Drop the Google entries if analytics changes; add only what's actually used. Allow `'unsafe-inline'` for styles only if Astro's
  inlined CSS makes it unavoidable, and say so in the handoff.
- **No inline scripts.** Move the GA bootstrap into a small file under `/scripts/` so `script-src` needs no `'unsafe-inline'`.
  (There's no theme toggle in Phase 1, so no no-flash theme script is needed.)
- `<meta name="referrer" content="strict-origin-when-cross-origin">` on every page.
- Things a meta tag can't do (HSTS preload, `frame-ancestors`, `Permissions-Policy`) need real headers. If wanted later, put
  Cloudflare in front of Pages or move to a host with a headers file. **Not required for Phase 1.**

**Third parties.**
- **Self-host everything**: fonts, libraries, images. No Google Fonts or CDN requests at runtime (privacy and supply chain).
- YouTube embeds: `youtube-nocookie.com`, click-to-load only (no iframe until the visitor clicks).
- External links: `rel="noopener noreferrer"` with `target="_blank"`.

**Photos and personal info.**
- Strip **GPS and all location EXIF** at build time. Keep camera settings, and add `Artist`/`Copyright` = "Abhiman Gupta".
- Publish web sizes only (long edge ≤ 2400 px); originals stay off the repo.
- Don't publish home or exact routine locations in captions; city-level ("Tucson") is fine.
- Right-click blocking and "disable save" scripts are pointless; a visible © line is enough.

**Repo and pipeline.**
- The repo is public: **never commit unpublished drafts, private notes, or secrets.** Keep article drafts outside the repo
  (or in a private repo) until they're ready.
- Keep Actions pinned to commit SHAs, `permissions` minimal per job, `actions/checkout` with `persist-credentials: false`.
- Add `.github/dependabot.yml` for `npm` and `github-actions` (weekly). Use `npm ci` with the lockfile. Keep runtime dependencies
  to the short list in `02-ARCHITECTURE.md`.
- The GA measurement ID is public by design; it's fine as a repository variable. There are no secrets in this site.

**Small extras.**
- `/.well-known/security.txt` with a contact address and an `Expires` date a year out.
- A designed 404 (T09) that doesn't echo the requested URL into the page.
- No contact form, no CAPTCHA: a plain email address and a copy button are enough.

## 4. Where this lands in the plan

- §2 items are listed in `STATUS.md` → "Security to-dos for Abhiman".
- §3 rules are applied by T03 (CSP, referrer, scripts), T04 (EXIF), T08 (YouTube), T09 (security.txt, 404), T11 (verification),
  and T12 (Dependabot, workflow hardening).

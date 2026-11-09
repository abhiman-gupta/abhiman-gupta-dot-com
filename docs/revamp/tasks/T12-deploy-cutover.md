# T12 · Deploy workflow + cutover

**Depends on:** T11 · **Parallel-safe:** no · **Needs Abhiman's go-ahead before merging to `main`.**
**Read first:** `02-ARCHITECTURE.md` (Deploy, Analytics)

## Owns
`.github/workflows/pages.yml`, `README.md`.

## Steps
1. Rewrite `pages.yml`: checkout → `actions/setup-node` (20, npm cache) → `npm ci` → `npm run build`
   with `PUBLIC_GA_MEASUREMENT_ID: ${{ vars.GA_MEASUREMENT_ID }}` → `actions/upload-pages-artifact` (`dist`) →
   `actions/deploy-pages`. Pin every action to a commit SHA (as the current workflow does). Keep
   `concurrency: pages`, minimal permissions, triggers: push to `main` + `workflow_dispatch`.
2. Add a PR check workflow (build only, no deploy) so `revamp-v2` PRs show green/red. Use `persist-credentials: false` on
   checkout, and add `.github/dependabot.yml` for `npm` and `github-actions` (weekly) per `04-SECURITY.md`.
3. Rewrite `README.md`: stack, `npm run dev`, adding photos (link `PHOTOGRAPHY_WORKFLOW.md`), adding an article,
   adding picks, editing copy in `src/data/copy/`, GA variable, deploy.
4. Open a PR `revamp-v2` → `main` with screenshots (desktop + mobile, both themes) and the T11 scores.
5. **Stop and ask Abhiman** before merging. After merge: confirm the Pages run succeeds, the custom domain
   serves the new site over HTTPS, `/academia/`, `/notes/` and `/recommendations/` redirect, `/404` works,
   and GA fires (if the variable is set).

## Acceptance
- [ ] PR check passes; deploy succeeds after merge; live site verified at https://abhimangupta.com/.
- [ ] Rollback note in handoff: the last pre-revamp commit SHA on `main` (`6298607`) to revert to.

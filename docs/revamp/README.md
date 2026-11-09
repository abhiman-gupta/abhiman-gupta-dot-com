# Website Revamp: Agent Playbook

The single source of truth for the abhimangupta.com revamp. It's written so that **any agent (or human)
can pick up one task file and do it without the conversation that produced it.**

**Direction (confirmed in the mockup, 2026-11-09): "Contact Sheet".** A minimal black-and-white site where the
photographs are the only color. The Photography index is a darkroom drying line of real 35mm film strips. Each collection
opens as a film roll. All photos are 4:3 or 3:4. Header: **Abhiman · Professional · Photography · Cool Stuff · Contact**. Articles (George Mack-style) come in Phase 2.
**Start small, add incrementally.**
The PhD in optics is the first fact on Home, but it's not the theme. See `00-VISION.md`.

**Reference mockup:** https://claude.ai/artifact/CrxRgqYGsDz3ZaBjuBjA6w (private; ask Abhiman for access).
Its photos are generated placeholders and its copy is draft. Where the docs and the mockup disagree, the docs win.

## How to use this folder

1. Read, in this order:
   1. [`00-VISION.md`](00-VISION.md): the brand brief and what we're building
   2. [`01-DESIGN-SYSTEM.md`](01-DESIGN-SYSTEM.md): colors, type, texture, motion (binding)
   3. [`02-ARCHITECTURE.md`](02-ARCHITECTURE.md): Astro structure, the copy system, the photo data API, file ownership, deploy
   4. [`03-CONTENT.md`](03-CONTENT.md): every known fact about Abhiman, and what's still TODO
   5. [`04-SECURITY.md`](04-SECURITY.md): security findings, Abhiman's to-dos, and rules every build task follows
2. Open [`STATUS.md`](STATUS.md) and pick a task whose dependencies are **done**.
3. Mark it `in progress` in `STATUS.md` with your agent/session name.
4. Do only what the task file says. Touch only the files it says you **own**.
5. When finished, write a handoff in `handoffs/` from [`templates/HANDOFF.md`](templates/HANDOFF.md) and mark the task `done` (or `blocked`).

## Rules for every agent

- **Facts come only from `03-CONTENT.md`.** Never invent biography, awards, or numbers.
- **Wording is not final.** Put every user-facing sentence in `src/data/copy/<page>.yaml`. If copy doesn't exist,
  write `TODO(copy): <what's needed>`; the dev build highlights it and the production build refuses to ship it.
- **Never write Abhiman's articles or "why I love this" notes.** Build the containers; he fills them.
- **Don't change design tokens** unless your task owns `src/styles/`. Request changes in your handoff.
- **Stay inside your owned files.** Parallel tasks run at the same time.
- **Mobile first-class, reduced motion respected, works without JS.**
- **No new runtime deps** beyond `02-ARCHITECTURE.md` without a reason in your handoff.
- **Monochrome.** No accent colors anywhere. The only color is in photographs and the amber glow on hovered film.
- **No real film brand names or imitation of specific publications or people's sites.** Mood only.
- Work on `revamp-v2` (or a branch off it). Never push to `main`.
- Verify in a browser before marking done: desktop, 375 px, reduced motion.

## Task graph

```text
T01 scaffold ─► T02 design system ─► T03 layout/copy/transitions ─┬─► T04 photo pipeline + collections ─┐
                                                                  ├─► T05 film roll viewer  (mock T04 API)│
                                                                  ├─► T06 home              (mock T04 API)├─► T10 polish ─► T11 audit ─► T12 deploy
                                                                  ├─► T07 articles (Phase 2)             │
                                                                  ├─► T08 cool stuff                     │
                                                                  └─► T09 professional/contact/404       ┘
```

T04–T09 run fully in parallel (six agents). T05 and T06 code against the photo data API in
`02-ARCHITECTURE.md` with mock data and switch to the real loader when T04 lands.

## Files

| File | Purpose |
| --- | --- |
| `00-VISION.md` | Brand brief, signature moments, site map |
| `01-DESIGN-SYSTEM.md` | Binding visual + motion spec |
| `02-ARCHITECTURE.md` | Stack, structure, copy system, photo API, ownership, deploy |
| `03-CONTENT.md` | Facts, sources, open TODOs |
| `04-SECURITY.md` | Security findings, to-dos, build rules |
| `STATUS.md` | Live task tracker + questions for Abhiman |
| `tasks/T*.md` | One self-contained brief per task |
| `templates/HANDOFF.md` | Completion note template |
| `handoffs/` | Completed handoffs |

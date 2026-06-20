# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Dev server at http://localhost:3000 (Turbopack)
yarn build        # Production build
yarn test         # = yarn lint && yarn type-check (run this before committing)
yarn lint         # ESLint (cached); add --fix to auto-fix
yarn type-check   # tsc --noEmit
yarn format       # Prettier across the repo
```

There is no test runner (no Jest/Vitest); `yarn test` means lint + type-check only. Node 22+ and Yarn 4 (via corepack) are required. Pre-commit hooks (Husky + lint-staged) auto-fix and format staged files.

## Architecture

A bilingual (fr default, en) single-page resume built on Next.js 16 App Router, React 19, Tailwind v4, and next-intl. The whole resume renders on one route: `app/[locale]/page.tsx`.

### Two-tier internationalization — the central concept

There are **two separate translation systems**, and conflating them is the most common mistake:

1. **UI strings** → `messages/{en,fr}.json`, consumed via next-intl (`getTranslations` on the server, `useTranslations` in client components). Keys are type-checked against the `IntlMessages` interface in `types/next-intl.d.ts` — when you add a message key, update that interface too. Wired up via `i18n/request.ts` and the `proxy.ts` middleware.

2. **Resume content** → `app/data/{en,fr}.json`, two independent per-locale documents. These do **not** go through next-intl. Instead `app/data/resume.ts` _zips_ the two JSON files at runtime into bilingual structures: each field becomes a `Localized` value `{ fr, en }` (see `types/index.ts`). `getResumeData()` returns this merged structure carrying **both** languages at once.

Because resume data is bilingual-merged, components receive the full `Localized` value plus the active `lang` and resolve it with `pick()` / `pickList()` from `lib/localize.ts`. They do _not_ receive pre-translated strings. The two `app/data` JSON files must stay positionally aligned — `resume.ts` zips experiences/schools/items **by array index**, so reordering one locale's array without the other silently mismatches content.

### Server/client split

`page.tsx` (server) loads data and renders `Layout` + `Hero` + `ResumeBody`. `ResumeBody.tsx` (`'use client'`) is the stateful container: it owns the cross-section `activeFilter` and passes `onTagClick`/`activeFilter` down to both `SkillsSection` and `ExperiencesSection`.

### The tag system ties content together

`TagRef` (`lib/tagMeta.ts`) is a small fixed set of category keys (`js`, `css`, `back`, `ios`, …). It does double duty:

- **Color**: `getTagColor(ref)` maps each ref to an oklch bg/fg pair (`TagPill` renders these).
- **Filtering**: skills (`lib/skills.ts`) and experience tags share the same `TagRef` values, so clicking a skill pill filters the experience timeline by tag name. Keep refs consistent across `skills.ts` and the experience `tags` in `app/data` for filtering and colors to line up.

### Theming (3 themes, flash-free)

Themes are `dark` (default), `clean`, `bold`, switched by setting `data-theme` on `<html>`.

- Color/font tokens are CSS variables under `[data-theme='…']` in `app/globals.css`, exposed to Tailwind via `@theme` (use semantic classes like `bg-bg`, `text-body`, `border-border`, `text-brand`).
- Per-theme overrides beyond tokens use the custom variants `theme-dark:`, `theme-clean:`, `theme-bold:`.
- `useTheme.ts` persists the choice to `localStorage['cv-theme']`; an inline `NO_FLASH_SCRIPT` in `app/layout.tsx` applies it before hydration. All six theme fonts are loaded up-front in the root layout to avoid FOUT on switch.

### Layout & scroll

`components/layout.tsx` is a client shell: sticky sidebar nav, mobile drawer, and scroll-spy via `hooks/useScrollTracking.ts` feeding `ActiveExperienceContext`. Sidebar clicks smooth-scroll to `[data-exp-id]` / section anchors inside the scrollable `MainContent` (not the window).

### Middleware matcher

`proxy.ts` uses a generic catch-all that excludes Next.js internals and known root-level extension-less metadata routes:

```ts
matcher: ['/((?!_next|opengraph-image|twitter-image|.*\\..*).*)'];
```

**Adding a new `app/[locale]/<segment>/` route requires no matcher change** — the catch-all picks it up automatically. The only case that would require a matcher update is adding a new root-level route _without a file extension_ (like `opengraph-image`/`twitter-image`) that must not be locale-redirected.

### Print

Print styles matter (this is a resume): components use `print:` Tailwind variants liberally and `ExtraItem.print` controls print-only inclusion. Verify print layout when touching sections.

### `components/_archive`

The previous component design lives in `components/_archive` and is **excluded from tsconfig and ESLint**. Don't edit, import, or reference it — current components are the flat `components/{hero,experience,skills,education,extras,contact,layout,ui}` tree.

## Conventions

- Path alias `@/*` maps to repo root.
- Server Components by default; add `'use client'` only for interactivity/hooks.
- ESLint enforces `sonarjs/cognitive-complexity` ≤ 15 and `no-duplicate-string` (threshold 3); `security/detect-object-injection` is a warning — existing dynamic-index access is annotated with eslint-disable comments explaining why it's safe.

### Tailwind-first styling

**Always prefer Tailwind utility classes over custom CSS.** `app/globals.css` is reserved exclusively for:

- `@theme` / `[data-theme='…']` token definitions
- `@keyframes` and animation declarations (`.hero-char`, `.hero-skill-item`, etc.)
- Pseudo-elements (`::before`, `::after`) with complex values (gradients, generated content)
- Selectors that Tailwind cannot express (e.g., descendant combinators not reachable via variants)

**Compose classes with `cn`** (`lib/cn.ts`, wraps clsx + tailwind-merge) — never `.join(' ')` or template strings to assemble class names.  
**Put classes directly in JSX** — do not extract them into module-level `const` strings; keep the styling co-located with the markup.  
**Conditionals** → use the object form `cn({ 'classes': condition })`, including two-branch toggles: `cn({ 'a b': cond, 'c d': !cond })`. **Avoid ternaries** inside `className`.  
**Exception** — a module-level `const` is acceptable only for multi-theme chains that contain long arbitrary values (`color-mix(…)`, multi-layer `shadow-[…]`); add a comment explaining why.  
**Per-theme overrides** → use `theme-dark:`, `theme-clean:`, `theme-bold:` variants.  
**Per-instance dynamic values** → set a CSS custom property via `style` inline, reference it with an arbitrary Tailwind value (`border-(--exp-accent)`, `bg-[var(--skill-tint)]`).  
**CSS variable shorthand** → prefer Tailwind v4 canonical form `(--var-name)` over `[var(--var-name)]` for single-variable values.

## AI Orchestration Workflow

The orchestration rules defined for Copilot agents in [`.github/copilot-instructions.md`](.github/copilot-instructions.md) (annex) and [`docs/AI_WORKFLOW.md`](docs/AI_WORKFLOW.md) **apply equally to Claude agents**. Summary of what's expected:

- **Plan first for non-trivial work** (3+ steps or architectural decisions). If something goes sideways, stop and re-plan instead of pushing through.
- **Use subagents** to offload research, exploration, and parallel analysis and keep the main context clean — one focused task per subagent.
- **Self-improvement loop**: after any correction from the user, record the pattern in `docs/lessons.md`; review it at session start. Track plans/progress in `tasks/todo.md` with checkable items and add a review section when done.
- **Verify before claiming done**: never mark a task complete without proving it works (run `yarn test`/`yarn build`, check behavior). "Would a staff engineer approve this?"
- **Demand elegance (balanced)**: for non-trivial changes, pause and ask if there's a cleaner approach; skip this for simple obvious fixes — don't over-engineer.
- **Autonomous bug fixing**: given a bug report with logs/failing checks, just fix the root cause — no temporary patches, no hand-holding.

Core principles: simplicity first, minimal-impact changes, root-cause fixes over band-aids.

# Copilot Instructions for mcomperat

## Project Overview

This is a modern, responsive web resume built with Next.js App Router, TypeScript, and Tailwind CSS v4. The project showcases a professional experience as a Frontend Developer with support for internationalization (English and French).

## Tech Stack

- **Framework**: Next.js 15.5+ with App Router
- **Language**: TypeScript 5.9+ with strict mode enabled
- **Styling**: Tailwind CSS 4.1+ with native CSS @theme support
- **Runtime**: React 19
- **Package Manager**: Yarn 4+ (managed via corepack)
- **Node.js**: 22+

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles with Tailwind imports
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Homepage (redirects to /fr)
│   ├── not-found.tsx      # 404 page
│   ├── en/                # English pages
│   └── fr/                # French pages
├── components/            # Reusable React components
│   ├── layout.tsx         # Layout components
│   ├── seo.tsx           # SEO components
│   └── [various]/        # Feature-specific components
├── public/               # Static assets
│   └── data/            # JSON data files (en.json, fr.json)
├── types/               # TypeScript type definitions
└── docs/                # Project documentation
```

## Development Commands

- `yarn install` - Install dependencies
- `yarn dev` - Start development server (http://localhost:3000)
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint checks
- `yarn lint --fix` - Auto-fix ESLint issues
- `yarn format` - Format code with Prettier
- `yarn test` - Run linting and type checking (must pass before commits)
- `yarn type-check` - TypeScript type checking

## Code Quality Standards

### TypeScript

- Strict mode is enabled - all code must be type-safe
- Use explicit types for function parameters and return values
- Path aliases: Use `@/*` for imports from root directory
- No `any` types unless absolutely necessary
- Configuration: See `tsconfig.json`

### ESLint

- Modern flat config format (`eslint.config.js`)
- **All code must pass ESLint with zero errors**
- Key rules enforced:
  - TypeScript type checking
  - React Hooks rules (React 19 compatible)
  - Import sorting via `simple-import-sort`
  - Unused imports detection
  - Security vulnerability checks
  - Accessibility (jsx-a11y)
  - Code complexity limits (SonarJS)
  - Next.js best practices
- Run `yarn lint` before committing
- Use `yarn lint --fix` to auto-fix issues

### Prettier

- Automatic code formatting on commit via Husky hooks
- Tailwind CSS class sorting enabled
- Configuration: See `.prettierrc`
- Run `yarn format` to format all files

## Coding Conventions

### Component Structure

- **Server Components** by default (Next.js 15 App Router)
- **Client Components** marked with `'use client'` directive when needed (for interactivity, hooks, styled-jsx)
- Use functional components with TypeScript
- Export component types from the same file when possible

### Import Order

Imports are automatically sorted by `simple-import-sort`:

1. React and Next.js imports
2. External packages
3. Internal absolute imports (using `@/` alias)
4. Relative imports
5. Type imports

### Naming Conventions

- **Components**: PascalCase (e.g., `PostList.tsx`)
- **Files**: kebab-case for utilities, PascalCase for components
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase

### Styling

- **Tailwind CSS v4** with native CSS support
- Use Tailwind utility classes
- Custom theme via CSS `@theme` directive in `app/globals.css`
- PostCSS integration with `@tailwindcss/postcss`
- Classes automatically sorted by Prettier

## Internationalization

- English: `/en` routes with `public/data/en.json`
- French: `/fr` routes with `public/data/fr.json` (default language)
- Homepage redirects to `/fr`

## Testing Requirements

- Run `yarn test` (linting + type checking) before committing
- All checks must pass
- No console errors or warnings in development

## Git Workflow

- Use conventional commit messages (e.g., `feat:`, `fix:`, `chore:`)
- Pre-commit hooks automatically format code
- Create feature branches: `git checkout -b feat/your-feature`

## Best Practices

1. **Code Quality**: Zero ESLint errors required
2. **Type Safety**: Maintain TypeScript strict mode compliance
3. **Formatting**: Automatic via Prettier on commit
4. **Performance**: Use Next.js 15 features (Server Components, streaming)
5. **Accessibility**: Follow WCAG guidelines, use semantic HTML
6. **Security**: No security vulnerabilities (checked by ESLint)
7. **SEO**: Use Next.js metadata API (`generateMetadata`)

## Common Tasks

### Adding a New Page

1. Create page in `app/[locale]/` directory
2. Export async function for Server Component
3. Add metadata via `generateMetadata()` function
4. Import and use data from `public/data/[locale].json`

### Adding a New Component

1. Create component file in `components/` directory
2. Add `'use client'` if it needs interactivity
3. Export component with TypeScript types
4. Follow naming conventions and import order

### Updating Dependencies

1. Check outdated: `yarn outdated`
2. Interactive update: `yarn upgrade-interactive`
3. Test after updates: `yarn test && yarn build`

## Notes

- This is a personal resume website for Matthieu Compérat
- Deployment configured for Vercel/Netlify
- Documentation in `docs/` directory
- Migration history available in `docs/MIGRATION_*.md`

---

## Annex: AI Orchestration Workflow

> This annex is a **complementary action plan** for AI contributors (Copilot, etc.). It enriches the guidelines above without replacing or overriding any existing rule.

For the full workflow details, see [`docs/AI_WORKFLOW.md`](../docs/AI_WORKFLOW.md).

### Workflow Orchestration

#### 1. Plan Node Default

- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately – don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

#### 2. Subagent Strategy

- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

#### 3. Self-Improvement Loop

- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

#### 4. Verification Before Done

- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

#### 5. Demand Elegance (Balanced)

- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes – don't over-engineer
- Challenge your own work before presenting it

#### 6. Autonomous Bug Fixing

- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests – then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

### Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

### Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

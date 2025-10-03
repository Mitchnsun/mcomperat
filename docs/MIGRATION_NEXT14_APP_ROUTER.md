# Migration from Next.js 13 Pages Router to Next.js 14 App Router

## Summary of changes made

### 1. Dependencies update

- **Next.js** : `^13.5.6` → `^14.2.0`
- **eslint-config-next** : `^13.5.11` → `^14.2.0`

### 2. Folder structure

- **Removed** : `pages/` (Pages Router)
- **Created** : `app/` (App Router)
  - `app/layout.tsx` - Root layout
  - `app/page.tsx` - Home page with redirection
  - `app/fr/page.tsx` - French page
  - `app/en/page.tsx` - English page
  - `app/not-found.tsx` - Custom 404 page

### 3. Configuration changes

- **next.config.mjs** : Removed redirections (now handled by App Router)

### 4. Component migration

#### Metadata (SEO)

- **Before** : Using `next/head` and `<Head>` component
- **After** : Using Next.js 14 `generateMetadata()` API
- **Modified file** : `components/seo.tsx`

#### Client Components

All components using `styled-jsx` have been marked as Client Components:

- `components/layout.tsx`
- `components/heading/Heading.tsx`
- `components/tag/Tag.tsx`
- `components/card/Card.tsx`
- `components/post/*.tsx` (all post components)

### 5. Data handling

- **Before** : `getStaticProps` in pages
- **After** : Direct JSON data import in server components with `async/await`

### 6. Navigation and redirections

- **Before** : Redirections configured in `next.config.mjs`
- **After** : Redirection in `app/page.tsx` with `redirect()` from `next/navigation`

## Migration benefits

1. **Improved performance** : App Router with Server Components by default
2. **Optimized metadata** : Native Next.js 14 metadata API
3. **Clearer structure** : File colocation in the `app/` folder
4. **Streaming and Suspense** : Native support for better UX
5. **Enhanced TypeScript** : Better TypeScript support in App Router

## Available routes

- `/` → Redirects to `/fr`
- `/fr` → French page with CV
- `/en` → English page with Resume

## Technical notes

### Client vs Server Components

- **Server Components** : Main pages (`app/fr/page.tsx`, `app/en/page.tsx`)
- **Client Components** : UI components with `styled-jsx` and interactivity

### Error handling

- Custom 404 page with `app/not-found.tsx`
- Automatic error handling by Next.js 14

### Build and deployment

- Successful build with automatic optimizations
- Static generation maintained for all pages
- Compatible with all existing Next.js deployments

## Recommended next steps

1. **CSS optimization** : Consider migrating from `styled-jsx` to Tailwind CSS or CSS Modules
2. **Internationalization** : Use Next.js 14 native i18n system
3. **Images** : Verify image optimization with `next/image`
4. **Tests** : Update tests for App Router
5. **Performance** : Use new Next.js 14 performance hooks

## Development commands

```bash
# Development
yarn dev

# Build
yarn build

# Production
yarn start

# Linting and type checking
yarn test
```

The migration is now complete and the project works with Next.js 14 and App Router! 🎉

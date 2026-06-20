# Lessons learned

## Middleware matcher must be updated when adding a localized route

**What happened:** Adding `app/[locale]/print/page.tsx` made `/fr/print` and `/en/print` work, but `/print` (without locale) returned 404 instead of redirecting to the user's locale.

**Root cause:** `proxy.ts` uses an explicit allowlist matcher:

```ts
matcher: ['/', '/(fr|en)/:path*'];
```

Paths not in this list are never intercepted by the next-intl middleware, so no locale detection or redirect happens → Next.js finds no matching route → 404.

**Why the allowlist (not a catch-all):** A catch-all pattern would intercept `/opengraph-image`, `/sitemap.xml`, `/robots.txt` etc. and break them by redirecting to `/fr/opengraph-image`.

**Fix:** Add the bare path to the matcher alongside `/`:

```ts
matcher: ['/', '/print', '/(fr|en)/:path*'];
```

**Fix applied:** Replaced the allowlist with a generic catch-all that excludes `_next`, extension-less metadata routes (`opengraph-image`, `twitter-image`), and any path with a file extension:

```ts
matcher: ['/((?!_next|opengraph-image|twitter-image|.*\\..*).*)'];
```

**Rule for the future:** New localized routes require no matcher change. The only case requiring a matcher update is a new root-level route _without a file extension_ that must not be locale-redirected.

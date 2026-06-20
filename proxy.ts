// `proxy.ts` is the Next.js 16 file convention for routing middleware (replaces `middleware.ts`).
// Handles locale detection and redirects via next-intl.
// See: https://nextjs.org/docs/messages/middleware-to-proxy
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Generic catch-all that excludes:
  //   _next           — Next.js internals and static assets
  //   opengraph-image — root-level image metadata route (no extension)
  //   twitter-image   — idem
  //   .*\..*          — any path with a file extension (robots.txt, sitemap.xml, favicon.ico…)
  matcher: ['/((?!_next|opengraph-image|twitter-image|.*\\..*).*)'],
};

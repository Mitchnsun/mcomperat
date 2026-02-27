// `proxy.ts` is the Next.js 16 file convention for routing middleware (replaces `middleware.ts`).
// Handles locale detection and redirects via next-intl.
// See: https://nextjs.org/docs/messages/middleware-to-proxy
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(fr|en)/:path*'],
};

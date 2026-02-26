// `proxy.ts` is the Next.js 16 convention for routing middleware (renamed from `middleware.ts`).
// It handles locale detection and redirects based on the routing configuration.
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(fr|en)/:path*'],
};

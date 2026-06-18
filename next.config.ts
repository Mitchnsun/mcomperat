import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // swcMinify is enabled by default in Next.js 15
  turbopack: {
    resolveAlias: {
      '@/*': './*',
    },
  },
};

export default withNextIntl(nextConfig);

import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.mcomper.at',
          },
        ],
        destination: 'https://mcomper.at/:path*',
        permanent: true,
      },
    ];
  },
  // swcMinify is enabled by default in Next.js 15
  turbopack: {
    resolveAlias: {
      '@/*': './*',
    },
  },
};

export default withNextIntl(nextConfig);

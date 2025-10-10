import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // swcMinify is enabled by default in Next.js 15
  turbopack: {
    resolveAlias: {
      '@/*': './*',
    },
  },
};

export default nextConfig;

import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';

const SITE_URL = 'https://mcomper.at';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // The printable preview route (`/[locale]/print`) is intentionally excluded from
  // the sitemap: it is a generator tool, not indexable content (it is also
  // marked `noindex` in its metadata). Only the canonical locale homepages are
  // listed for search engines.
  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    alternates: {
      languages: {
        fr: `${SITE_URL}/fr`,
        en: `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/fr`,
      },
    },
  }));
}

import type { Metadata } from 'next';

import { pick } from '@/lib/localize';
import { type Lang, type Person } from '@/types';

export const SITE_URL = 'https://mcomper.at';
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;
const TWITTER_IMAGE_URL = `${SITE_URL}/twitter-image`;
const SITE_AUTHOR = '@Mitchnsun';
const SITE_TITLE = 'Matthieu Compérat';

interface MetadataOptions {
  locale: Lang;
  title: string;
  description: string;
}

interface StructuredDataOptions {
  locale: Lang;
  person: Person;
  description: string;
}

export function generateMetadata({ locale, title, description }: MetadataOptions): Metadata {
  const isEnglish = locale === 'en';
  const canonicalUrl = `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_TITLE,
      template: `%s | ${SITE_TITLE}`,
    },
    description,
    keywords: [
      'Matthieu Compérat',
      'Frontend Developer',
      'React',
      'Next.js',
      'TypeScript',
      'Freelance',
      'Développeur Frontend',
      'Développeur React',
      'Développeur Next.js',
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: `${SITE_URL}/fr`,
        en: `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/fr`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_TITLE,
      locale: isEnglish ? 'en_US' : 'fr_FR',
      alternateLocale: isEnglish ? ['fr_FR'] : ['en_US'],
      type: 'website',
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: `${SITE_TITLE} - Frontend Developer`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_AUTHOR,
      creator: SITE_AUTHOR,
      title,
      description,
      images: [TWITTER_IMAGE_URL],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        'max-snippet': -1,
      },
    },
  };
}

export function generateStructuredData({ locale, person, description }: StructuredDataOptions): object[] {
  const fullName = `${person.firstname} ${person.lastname}`;
  const localeUrl = `${SITE_URL}/${locale}`;
  const sameAs = [person.link?.linkedin ? pick(person.link.linkedin, locale) : undefined, person.link?.github].filter(
    Boolean
  );

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_TITLE,
      description,
      inLanguage: ['fr', 'en'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: fullName,
      givenName: person.firstname,
      familyName: person.lastname,
      jobTitle: pick(person.title, locale),
      url: localeUrl,
      image: OG_IMAGE_URL,
      sameAs,
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance',
      },
    },
  ];
}

import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { getResumeData } from '@/app/data/resume';
import PrintApp from '@/components/print/PrintApp';
import { SITE_URL } from '@/components/seo';
import { routing } from '@/i18n/routing';
import { type Lang } from '@/types';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const lang: Lang = locale === 'en' ? 'en' : 'fr';
  const t = await getTranslations({ locale: lang, namespace: 'meta.cv' });

  // The printable preview is a tool, not indexable content: keep it out of
  // search engines (it is also intentionally excluded from the sitemap).
  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function PrintCvPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang: Lang = locale === 'en' ? 'en' : 'fr';
  const data = getResumeData();

  return <PrintApp data={data} initialLang={lang} />;
}

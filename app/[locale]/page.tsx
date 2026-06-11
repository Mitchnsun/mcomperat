import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { getResumeData } from '@/app/data/resume';
import Hero from '@/components/hero/Hero';
import Layout from '@/components/layout';
import ResumeBody from '@/components/ResumeBody';
import { generateMetadata as generateSEOMetadata } from '@/components/seo';
import { routing } from '@/i18n/routing';
import { pick } from '@/lib/localize';
import { type Lang } from '@/types';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return generateSEOMetadata(t('title'));
}

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang: Lang = locale === 'en' ? 'en' : 'fr';
  const data = getResumeData();
  const t = await getTranslations({ locale, namespace: 'sections' });
  const tSidebar = await getTranslations({ locale, namespace: 'sidebar' });

  const experiences = data.experiences.map((exp) => ({
    id: exp.id,
    company: exp.company,
    year: /\d{4}/.exec(pick(exp.start, lang))?.[0] ?? '',
  }));

  const sections = [
    { label: t('skills'), href: '#skills' },
    { label: t('education'), href: '#education' },
    { label: t('extras'), href: '#extras' },
    { label: tSidebar('contact'), href: '#contact' },
  ];

  return (
    <Layout person={data.person} experiences={experiences} sections={sections}>
      <Hero person={data.person} locale={locale} />
      <ResumeBody data={data} lang={lang} />
    </Layout>
  );
}

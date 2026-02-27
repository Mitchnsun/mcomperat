import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import Layout from '@/components/layout';
import PostExtra from '@/components/post/PostExtra';
import PostList from '@/components/post/PostList';
import { generateMetadata as generateSEOMetadata } from '@/components/seo';
import { routing } from '@/i18n/routing';
import { type ResumeData } from '@/types';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function getData(locale: string): Promise<ResumeData> {
  if (locale === 'en') {
    const { default: data } = await import('@/app/data/en.json');
    return data as ResumeData;
  }
  const { default: data } = await import('@/app/data/fr.json');
  return data as ResumeData;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return generateSEOMetadata(t('title'));
}

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = await getData(locale);
  const t = await getTranslations({ locale, namespace: 'sections' });

  return (
    <Layout person={data.person}>
      <PostList title={t('work')} list={data.work.experiences} />
      <PostList title={t('education')} list={data.education.schools} />
      <PostList title={t('extras')}>
        {data.extra.items.map((item, index) => (
          <PostExtra {...item} key={item.title || index} />
        ))}
      </PostList>
    </Layout>
  );
}

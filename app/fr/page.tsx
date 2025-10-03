import { Metadata } from 'next';
import React from 'react';

import Layout from '../../components/layout';
import PostExtra from '../../components/post/PostExtra';
import PostList from '../../components/post/PostList';
import { generateMetadata as generateSEOMetadata } from '../../components/seo';
import { ResumeData } from '../../types';

async function getData(): Promise<ResumeData> {
  const data = await import('../../public/data/fr.json');
  return data.default as ResumeData;
}

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata('CV');
}

export default async function FrPage() {
  const data = await getData();

  return (
    <Layout person={data.person}>
      <PostList title={data.work.title} list={data.work.experiences} />
      <PostList title={data.education.title} list={data.education.schools} />
      <PostList title={data.extra.title}>
        {data.extra.items.map((item, index) => (
          <PostExtra {...item} key={item.title || index} />
        ))}
      </PostList>
    </Layout>
  );
}

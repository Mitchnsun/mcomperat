import React from 'react';
import { GetStaticProps } from 'next';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostList from '../components/post/PostList';
import PostExtra from '../components/post/PostExtra';
import { PageProps, ResumeData } from '../types';

const ENPage: React.FC<PageProps> = ({ data }) => {
  return (
    <Layout person={data.person}>
      <SEO title="Resume" lang="en" />
      <PostList title={data.work.title} list={data.work.experiences} />
      <PostList title={data.education.title} list={data.education.schools} />
      <PostList title={data.extra.title}>
        {data.extra.items.map((item, index) => (
          <PostExtra {...item} key={item.title || index} />
        ))}
      </PostList>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await import('../public/data/en.json');
  return {
    props: {
      data: data.default as ResumeData,
    },
  };
};

export default ENPage;
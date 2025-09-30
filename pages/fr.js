import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostList from '../components/post/PostList';
import PostExtra from '../components/post/PostExtra';

function FRPage({ data }) {
  return (
    <Layout person={data.person}>
      <SEO title="CV" lang="fr" />
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

export async function getStaticProps() {
  const data = await import('../public/data/fr.json');
  return {
    props: {
      data: data.default,
    },
  };
}

export default FRPage;

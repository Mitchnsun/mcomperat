import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostList from '../components/post/PostList';
import PostExtra from '../components/post/PostExtra';
import data from '../assets/data/fr.json';

const FRPage = () => (
  <Layout person={data.person}>
    <SEO title="CV" />
    <PostList title={data.work.title} list={data.work.experiences} />
    <PostList title={data.education.title} list={data.education.schools} />
    <PostList title={data.extra.title}>
      {data.extra.items.map((item) => (
        <PostExtra {...item} key={uuidv4()} />
      ))}
    </PostList>
  </Layout>
);

export default FRPage;

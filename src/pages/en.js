import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostList from '../components/post/PostList';
import PostExtra from '../components/post/PostExtra';
import data from '../assets/data/en.json';

const ENPage = () => (
  <Layout>
    <SEO title="Home" />
    <PostList title={data.work.title} list={data.work.experiences} />
    <PostList title={data.education.title} list={data.education.schools} />
    <div className="Posts">
      <h2 className="Posts-header">{data.extra.title}</h2>
      {data.extra.items.map((item) => (
        <PostExtra {...item} key={uuidv4()} />
      ))}
    </div>
  </Layout>
);

export default ENPage;

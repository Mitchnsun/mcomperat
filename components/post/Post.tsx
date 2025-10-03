'use client';

import React from 'react';

import { PostProps } from '../../types';
import PostDescription from './PostDescription';
import PostHeader from './PostHeader';

const Post: React.FC<PostProps> = (props) => (
  <>
    <section className="Post">
      <PostHeader {...props} />
      <PostDescription {...props} />
    </section>
    <style jsx>
      {`
        section {
          padding-bottom: 0.5em;
        }
        @media print {
          section {
            padding-bottom: 0.25em;
          }
        }
      `}
    </style>
  </>
);

export default Post;

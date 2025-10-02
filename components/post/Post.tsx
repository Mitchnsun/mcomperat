import React from 'react';
import PostHeader from './PostHeader';
import PostDescription from './PostDescription';
import { PostProps } from '../../types';

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
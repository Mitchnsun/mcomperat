import React from 'react';
import PostHeader from './PostHeader';
import PostDescription from './PostDescription';

const Post = (props) => (
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

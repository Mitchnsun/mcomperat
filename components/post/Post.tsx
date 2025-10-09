import React from 'react';

import { PostProps } from '@/types';

import PostDescription from './PostDescription';
import PostHeader from './PostHeader';

const Post: React.FC<PostProps> = (props) => (
  <section className="pb-4 print:pb-1">
    <PostHeader {...props} />
    <PostDescription {...props} />
  </section>
);

export default Post;

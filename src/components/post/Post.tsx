import React from 'react';
import { Post as PostType } from '@/types/all';
import PostHeader from './PostHeader';
import PostDescription from './PostDescription';

const Post = (props: PostType) => (
    <section className="pb-2">
      <PostHeader {...props} />
      <PostDescription {...props} />
    </section>
);

export default Post;

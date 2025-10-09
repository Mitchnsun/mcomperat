import React from 'react';

import { PostListProps } from '@/types';

import Post from './Post';

const PostList: React.FC<PostListProps> = ({ title, list = [], children }) => (
  <div className="pb-4 print:pb-0">
    <h2 className="mb-4 border-b border-zinc-200 pb-2 text-2xl font-medium tracking-widest text-neutral-400 uppercase print:mb-2 print:py-1 print:text-lg">
      {title}
    </h2>
    {children || list.map((post, index) => <Post {...post} key={`PostList-${post.title}-${index}`} />)}
  </div>
);

export default PostList;

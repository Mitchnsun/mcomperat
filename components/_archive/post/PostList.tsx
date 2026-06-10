import React from 'react';

import { PostListProps } from '@/types';

import Post from './Post';

const PostList: React.FC<PostListProps> = ({ title, list = [], children, sectionId, idPrefix }) => (
  <div id={sectionId} className="scroll-mt-28 pb-4 print:pb-0">
    <h2 className="border-heading text-heading/80 mb-4 border-b pb-2 text-2xl font-medium tracking-widest uppercase print:mb-2 print:py-1 print:text-lg">
      {title}
    </h2>
    {children ||
      list.map((post, index) => (
        <Post {...post} id={idPrefix ? `${idPrefix}-${index}` : undefined} key={`PostList-${post.title}-${index}`} />
      ))}
  </div>
);

export default PostList;

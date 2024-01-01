import React, { PropsWithChildren } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Post as PostType } from '@/types/all';
import Post from './Post';

interface PostListProps extends PropsWithChildren {
  title: string;
  list?: PostType[];
}

const PostList = ({ title, list = [], children }: PostListProps) => (
  <div className="pb-4">
    <h2 className="uppercase text-2xl font-medium tracking-widest text-zinc-400 border-b-2 border-solid border-slate-200 py-2 px-0">
      {title}
    </h2>
    {children || list.map((post) => <Post {...post} key={uuidv4()} />)}
  </div>
);

export default PostList;

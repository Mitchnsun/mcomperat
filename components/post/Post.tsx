'use client';

import cn from 'clsx';
import React from 'react';

import { useReveal } from '@/hooks/useReveal';
import { PostProps } from '@/types';

import PostDescription from './PostDescription';
import PostHeader from './PostHeader';

const Post: React.FC<PostProps> = ({ id, ...props }) => {
  const [revealRef, revealed] = useReveal<HTMLElement>();

  return (
    <section
      id={id}
      ref={revealRef}
      data-exp-id={id}
      className={cn('exp-card scroll-mt-28 pb-4 print:pb-1', { 'is-revealed': revealed })}
    >
      <PostHeader {...props} />
      <PostDescription {...props} />
    </section>
  );
};

export default Post;

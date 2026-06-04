'use client';

import cn from 'clsx';
import React from 'react';

import { useReveal } from '@/hooks/useReveal';
import { PostExtraProps } from '@/types';

const PostExtra: React.FC<PostExtraProps> = ({ print, title, text, list }) => {
  const [revealRef, revealed] = useReveal<HTMLElement>();

  return (
    <section
      ref={revealRef}
      className={cn('exp-card pb-2', { 'is-revealed': revealed, 'print:block': print, 'print:hidden': !print })}
    >
      <header className="print:float-left print:w-1/3">
        <h2 className="text-heading mb-1 text-xl font-bold print:mt-0 print:mr-4 print:inline-block print:text-base">
          {title}
        </h2>
      </header>
      <div className="text-body print:float-left print:w-2/3 print:text-sm">
        {text}
        <ul className="list-disc pl-8 print:list-none print:pl-4">
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PostExtra;

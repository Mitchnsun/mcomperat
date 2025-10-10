import cn from 'clsx';
import React from 'react';

import { PostExtraProps } from '@/types';

const PostExtra: React.FC<PostExtraProps> = ({ print, title, text, list }) => (
  <section className={cn('pb-2', { 'print:block': print, 'print:hidden': !print })}>
    <header className="print:float-left print:w-1/3">
      <h2 className="mb-1 text-xl font-bold text-neutral-800 print:mt-0 print:mr-4 print:inline-block print:text-base">
        {title}
      </h2>
    </header>
    <div className="text-neutral-700 print:float-left print:w-2/3 print:text-sm">
      {text}
      <ul className="list-disc pl-8 print:list-none print:pl-4">
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  </section>
);

export default PostExtra;

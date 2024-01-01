import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ExtraItem } from '@/types/extra';

const PostExtra = ({ title, text, list }: ExtraItem) => (
  <section className="pb-2">
    <header>
      <h2 className="text-xl text-black font-bold pb-1">{title}</h2>
    </header>
    <div className="text-base text-black">
      {text}
      <ul className="list-disc pl-8">
        {list.map((item) => (
          <li key={uuidv4()}>{item}</li>
        ))}
      </ul>
    </div>
  </section>
);

export default PostExtra;

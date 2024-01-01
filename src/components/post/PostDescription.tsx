import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { type Description } from '@/types/all';

const PostDescription = ({ description }: { description: Description[] }) => (
  <article className="text-base text-black">
    {description.map((item) => (
      <div key={uuidv4()}>
        {item.text}
        {item.list ? (
          <ul className="list-disc pl-8">
            {item.list.map((text) => (
              <li key={uuidv4()}>{text}</li>
            ))}
          </ul>
        ) : null}
      </div>
    ))}
  </article>
);

export default PostDescription;

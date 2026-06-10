import React from 'react';

import { PostDescriptionProps } from '@/types';

const PostDescription: React.FC<PostDescriptionProps> = ({ description }) => (
  <article className="text-body pl-2 print:text-sm">
    {description.map((item, index) => (
      <div key={item.id || `desc-${index}`}>
        {item.text}
        {item.list ? (
          <ul className="list-disc py-2 pl-8 print:list-none print:pl-4">
            {item.list.map((text, listIndex) => (
              <li key={`item-${index}-${listIndex}`}>{text}</li>
            ))}
          </ul>
        ) : null}
      </div>
    ))}
  </article>
);

export default PostDescription;

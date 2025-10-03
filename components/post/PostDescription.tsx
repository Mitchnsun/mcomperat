'use client';

import React from 'react';

import { PostDescriptionProps } from '../../types';

const PostDescription: React.FC<PostDescriptionProps> = ({ description }) => (
  <>
    <article>
      {description.map((item, index) => (
        <div key={item.id || `desc-${index}`}>
          {item.text}
          {item.list ? (
            <ul>
              {item.list.map((text, listIndex) => (
                <li key={`item-${index}-${listIndex}`}>{text}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </article>
    <style jsx>
      {`
        article {
          font-family: Georgia, 'Cambria', serif;
          color: #444;
          line-height: 1.5em;
        }
        @media print {
          article {
            font-size: 0.8em;
            line-height: 1.25em;
          }
        }
      `}
    </style>
  </>
);

export default PostDescription;

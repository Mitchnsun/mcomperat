import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const PostDescription = ({ description }) => (
  <>
    <article>
      {description.map((item) => (
        <div key={uuidv4()}>
          {item.text}
          {item.list ? (
            <ul>
              {item.list.map((text) => (
                <li key={uuidv4()}>{text}</li>
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

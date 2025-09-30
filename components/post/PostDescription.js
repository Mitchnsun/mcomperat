import React from 'react';

const PostDescription = ({ description }) => (
  <>
    <article>
      {description.map((item) => (
        <div key={item.id || `desc-${description.indexOf(item)}`}>
          {item.text}
          {item.list ? (
            <ul>
              {item.list.map((text) => (
                <li key={`item-${item.list.indexOf(text)}`}>{text}</li>
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

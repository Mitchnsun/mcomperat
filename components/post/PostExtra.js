import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const PostExtra = ({ print, title, text, list }) => (
  <>
    <section>
      <header>
        <h2>{title}</h2>
      </header>
      <div>
        {text}
        <ul>
          {list.map((item) => (
            <li key={uuidv4()}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
    <style jsx>
      {`
        section {
          padding-bottom: 0.5em;
        }
        h2 {
          font-size: 1.3em;
          color: #222;
          margin-bottom: 0.2em;
        }
        div {
          font-family: Georgia, 'Cambria', serif;
          color: #444;
          line-height: 1.5em;
        }
        @media print {
          section {
            display: ${print ? 'block' : 'none'};
          }
          header {
            float: left;
            width: 30%;
          }
          h2 {
            font-size: 1em;
            margin-top: 0;
            margin-right: 5px;
            display: inline-block;
          }
          div {
            float: left;
            width: 70%;
            font-size: 0.8em;
            line-height: 1em;
          }
          ul {
            margin: 0 auto O.5em;
            list-style-type: none;
          }
        }
      `}
    </style>
  </>
);

export default PostExtra;

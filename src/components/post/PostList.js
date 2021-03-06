import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Post from './Post';

const PostList = ({ title, list = [], children }) => (
  <>
    <div>
      <h2>{title}</h2>
      {children || list.map((post) => <Post {...post} key={uuidv4()} />)}
    </div>
    <style jsx>
      {`
        div {
          padding-bottom: 1em;
        }
        h2 {
          text-transform: uppercase;
          color: #aaa;
          border-bottom: 1px solid #eee;
          padding: 0.4em 0;
          font-size: 1.5em;
          font-weight: 500;
          letter-spacing: 0.1em;
        }
        @media print {
          div {
            padding-bottom: 0;
          }
          h2 {
            padding: 0.2em 0;
            margin-bottom: 0.3em;
            font-size: 1.1em;
            font-weight: 500;
            letter-spacing: 0.1em;
          }
        }
      `}
    </style>
  </>
);

export default PostList;

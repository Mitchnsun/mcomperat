import React from 'react';

import { PostHeaderProps } from '../../types';
import Tag from '../tag/Tag';

const PostHeader: React.FC<PostHeaderProps> = ({ title, company, city, country, context, start, end, tags }) => (
  <>
    <header>
      <h3>{title}</h3>
      <p className="meta">
        {company}, {city}, {country} {context ? ` - ${context}` : ''}
      </p>
      <p className="meta" style={{ fontSize: '75%' }}>
        {start} - {end}
      </p>
      <p className="meta tags">
        {tags ? tags.map((tag) => <Tag tag={tag.ref} name={tag.name} key={tag.ref} />) : null}
      </p>
    </header>
    <style jsx>
      {`
        h3 {
          font-size: 1.3em;
          color: #222;
          margin-bottom: 0.2em;
        }
        .meta {
          color: #999;
          font-size: 90%;
          margin: 0;
          margin-bottom: 5px;
          overflow: hidden;
        }
        @media print {
          h3 {
            font-size: 1em;
            margin-top: 0;
            margin-right: 5px;
            display: inline-block;
          }
          .meta {
            display: inline-block;
            margin-bottom: -0.2em;
            margin-right: 5px;
          }
          .tags {
            margin-top: -0.2em;
            margin-bottom: 0.2em;
          }
        }
      `}
    </style>
  </>
);

export default PostHeader;

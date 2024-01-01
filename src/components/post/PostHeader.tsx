import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Post } from '@/types/all';
import Tag from '../tag/Tag';

const PostHeader = ({ title, company, city, country, context, start, end, tags }: Post) => (
  <header>
    <h3 className="text-xl text-black font-bold pb-1">{title}</h3>
    <p className="text-gray-600 text-sm m-0 mb-1 overflow-hidden">
      {company}, {city}, {country} {context ? ` - ${context}` : ''}
    </p>
    <p className="text-gray-600 text-xs m-0 mb-1 overflow-hidden">
      {start} - {end}
    </p>
    <div className="flex flex-wrap gap-3 text-gray-600 text-sm m-0 mb-1 overflow-hidden">
      {tags ? tags.map((tag) => <Tag {...tag} key={uuidv4()} />) : null}
    </div>
  </header>
);

export default PostHeader;

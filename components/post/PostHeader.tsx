import React from 'react';

import { Tag } from '@/components/tag';
import { PostHeaderProps } from '@/types';

const PostHeader: React.FC<PostHeaderProps> = ({ title, company, city, country, context, start, end, tags }) => (
  <header>
    <h3 className="text-xl font-bold text-neutral-800 print:mr-2 print:inline-block print:text-base">{title}</h3>
    <p className="overflow-hidden text-sm text-neutral-400 print:mr-2 print:inline-block">
      {company}, {city}, {country} {context ? ` - ${context}` : ''}
    </p>
    <p className="mb-2 overflow-hidden text-xs text-neutral-400 print:mr-2 print:-mb-2 print:inline-block">
      {start} - {end}
    </p>
    <div className="mb-2 flex flex-wrap items-center gap-2 print:-mt-1 print:mr-2 print:mb-1 print:inline-block">
      {tags
        ? tags.map((tag, index) => (
            <Tag tag={tag.ref} name={tag.name} key={`Tag-${start}-${end}-${tag.ref}-${index}`} />
          ))
        : null}
    </div>
  </header>
);

export default PostHeader;

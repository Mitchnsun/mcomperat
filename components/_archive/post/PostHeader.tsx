'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Tag } from '@/components/_archive/tag';
import { PostHeaderProps } from '@/types';

const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  company,
  city,
  country,
  context,
  freelance,
  start,
  end,
  tags,
}) => {
  const t = useTranslations('post');

  return (
    <header>
      <div className="flex flex-wrap items-center gap-2 print:inline">
        <h3 className="text-heading text-xl font-bold print:mr-2 print:inline-block print:text-base">{title}</h3>
        {freelance ? (
          <span
            role="status"
            aria-label={t('badge.freelance')}
            className="border-brand/40 text-brand rounded-full border px-2 py-0.5 text-xs font-medium print:mr-2 print:inline-block"
          >
            {t('badge.freelance')}
          </span>
        ) : null}
      </div>
      <p className="text-body-muted overflow-hidden text-sm print:mr-2 print:inline-block">
        {company}, {city}, {country} {context ? ` - ${context}` : ''}
      </p>
      <p className="text-body-muted mb-2 overflow-hidden text-xs print:mr-2 print:-mb-2 print:inline-block">
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
};

export default PostHeader;

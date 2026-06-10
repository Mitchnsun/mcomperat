'use client';

import cn from 'clsx';
import React, { useState } from 'react';

import TagPill from '@/components/ui/TagPill';
import { getCompanyAccent } from '@/lib/companyColors';
import { pick, pickList } from '@/lib/localize';
import { type Experience, type Lang } from '@/types';

export interface ExperienceCardProps {
  exp: Experience;
  lang: Lang;
  isActive?: boolean;
  isRelated?: boolean;
  isDimmed?: boolean;
  defaultExpanded?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  activeFilter?: string | null;
  onTagClick?: (tagName: string) => void;
  className?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  exp,
  lang,
  isActive = false,
  isRelated = false,
  isDimmed = false,
  defaultExpanded = false,
  onMouseEnter,
  onMouseLeave,
  activeFilter = null,
  onTagClick,
  className,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const bodyId = `${exp.id}-body`;
  const desc = pick(exp.desc, lang);
  const list = pickList(exp.list, lang);
  const accent = getCompanyAccent(exp.company);
  const context = exp.context ? pick(exp.context, lang) : '';

  return (
    <article
      id={exp.id}
      data-exp-id={exp.id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ '--exp-accent': accent } as React.CSSProperties}
      className={cn('exp-card scroll-mt-28', className, {
        'is-active': isActive,
        'is-related': isRelated,
        'is-dimmed': isDimmed,
      })}
    >
      <button
        type="button"
        onClick={() => setExpanded((open) => !open)}
        aria-expanded={expanded}
        aria-controls={bodyId}
        className="exp-card__toggle"
      >
        <span className="min-w-0 flex-1">
          <span className="text-heading block text-lg font-bold print:text-base">{pick(exp.title, lang)}</span>
          <span className="text-body-muted block text-sm">
            {exp.company}, {exp.location}
            {context ? ` — ${context}` : ''}
          </span>
          <span className="text-body-muted block text-xs tabular-nums">
            {pick(exp.start, lang)} – {pick(exp.end, lang)}
          </span>
        </span>
        <span aria-hidden="true" className={cn('exp-card__chevron', { 'is-open': expanded })}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {exp.tags.length > 0 ? (
        <div className="mt-2 flex flex-wrap items-center gap-2 print:mt-1">
          {exp.tags.map((tag, index) => (
            <TagPill
              key={`${exp.id}-tag-${tag.ref}-${index}`}
              name={tag.name}
              tagRef={tag.ref}
              onClick={onTagClick}
              active={activeFilter === tag.name}
            />
          ))}
        </div>
      ) : null}

      <div id={bodyId} className={cn('exp-card__body', { 'is-collapsed': !expanded })}>
        {desc ? <p className="text-body mt-3 whitespace-pre-line print:text-sm">{desc}</p> : null}
        {list.length > 0 ? (
          <ul className="text-body mt-2 list-disc pl-6 print:list-none print:pl-4">
            {list.map((item, index) => (
              <li key={`${exp.id}-li-${index}`}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
};

export default ExperienceCard;

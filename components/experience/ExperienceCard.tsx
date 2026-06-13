'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import TagPill from '@/components/ui/TagPill';
import { cn } from '@/lib/cn';
import { getCompanyAccent } from '@/lib/companyColors';
import { pick, pickList } from '@/lib/localize';
import { type Experience, type Lang } from '@/types';

export interface ExperienceCardProps {
  exp: Experience;
  lang: Lang;
  isActive?: boolean;
  isHovered?: boolean;
  isRelated?: boolean;
  isDimmed?: boolean;
  defaultExpanded?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  activeFilters?: string[];
  onTagClick?: (tagName: string) => void;
  className?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  exp,
  lang,
  isActive = false,
  isHovered = false,
  isRelated = false,
  isDimmed = false,
  defaultExpanded = false,
  onMouseEnter,
  onMouseLeave,
  activeFilters = [],
  onTagClick,
  className,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const t = useTranslations('post');
  const showActiveBorder = isActive || isHovered;

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
      className={cn(
        // border-l-2 border-l-transparent: always reserve 2px for the left accent border so
        // active/hover color changes never shift content. Bold overrides width to 3px.
        'theme-bold:border-l-[3px] border-l-2 border-l-transparent px-5 py-4',
        'print:rounded-none print:border-0 print:bg-transparent print:p-0',
        'scroll-mt-28',
        className,
        { 'opacity-45 print:opacity-100': isDimmed },
        { 'border-l-(--exp-accent)': isRelated },
        {
          'theme-dark:border-l-2 theme-dark:border-l-(--exp-accent) theme-clean:border-l-2 theme-clean:border-l-(--exp-accent) theme-bold:border-l-(--exp-accent)':
            showActiveBorder,
          'theme-bold:border-l-transparent': !showActiveBorder,
        }
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((open) => !open)}
        aria-expanded={expanded}
        aria-controls={bodyId}
        className="flex w-full cursor-pointer items-start gap-3 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2 print:inline">
            <span className="text-heading text-lg font-bold print:mr-2 print:inline-block print:text-base">
              {pick(exp.title, lang)}
            </span>
            {exp.freelance ? (
              <span
                role="status"
                aria-label={t('badge.freelance')}
                className="border-brand/40 text-brand rounded border px-2 py-0.5 text-xs font-medium print:mr-2 print:inline-block"
              >
                {t('badge.freelance')}
              </span>
            ) : null}
          </span>
          <span className="text-body-muted block text-sm">
            {exp.company}, {exp.location}
            {context ? ` — ${context}` : ''}
          </span>
          <span className="text-body-muted block text-xs tabular-nums">
            {pick(exp.start, lang)} – {pick(exp.end, lang)}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={cn('text-body-muted shrink-0 transition-transform duration-200 print:hidden', {
            'rotate-180': expanded,
          })}
        >
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
              active={activeFilters.includes(tag.name)}
            />
          ))}
        </div>
      ) : null}

      <div id={bodyId} className={cn({ 'hidden print:block': !expanded })}>
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

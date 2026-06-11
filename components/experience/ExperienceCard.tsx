'use client';

import cn from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import TagPill from '@/components/ui/TagPill';
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
  activeFilter?: string | null;
  onTagClick?: (tagName: string) => void;
  className?: string;
}

// border-l-2 border-l-transparent: always reserve 2px for the left accent border so active/hover
// color changes never shift content. Bold overrides width to 3px.
const CARD_BASE = [
  'px-5 py-4',
  'border-l-2 border-l-transparent',
  'theme-bold:border-l-[3px]',
  'print:rounded-none print:border-0 print:bg-transparent print:p-0',
].join(' ');

const CARD_TOGGLE = 'flex w-full cursor-pointer items-start gap-3 text-left';

const CARD_CHEVRON = 'shrink-0 text-body-muted transition-transform duration-200 print:hidden';

const CARD_ACTIVE_BORDER = [
  'theme-dark:border-l-2 theme-dark:border-l-(--exp-accent)',
  'theme-clean:border-l-2 theme-clean:border-l-(--exp-accent)',
  'theme-bold:border-l-(--exp-accent)',
].join(' ');

const CARD_IDLE_BOLD_BORDER = 'theme-bold:border-l-transparent';

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
  activeFilter = null,
  onTagClick,
  className,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const t = useTranslations('post');

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
        CARD_BASE,
        'scroll-mt-28',
        className,
        isDimmed && 'opacity-45 print:opacity-100',
        isRelated && 'border-l-(--exp-accent)',
        isActive || isHovered ? CARD_ACTIVE_BORDER : CARD_IDLE_BOLD_BORDER
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((open) => !open)}
        aria-expanded={expanded}
        aria-controls={bodyId}
        className={CARD_TOGGLE}
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
        <span aria-hidden="true" className={cn(CARD_CHEVRON, expanded && 'rotate-180')}>
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

      <div id={bodyId} className={cn(!expanded && 'hidden print:block')}>
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

'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import TagPill from '@/components/ui/TagPill';

export interface FilterBarTag {
  name: string;
  ref: string;
}

interface FilterBarProps {
  tags: FilterBarTag[];
  count: number;
  total: number;
  onRemove: (tagName: string) => void;
  onClearAll: () => void;
}

// Banner displayed above the experience list when one or more tag filters are active.
// Shows each active tag as a clickable pill (click removes that filter), a clear-all
// button, and a match counter.
const FilterBar: React.FC<FilterBarProps> = ({ tags, count, total, onRemove, onClearAll }) => {
  const t = useTranslations('filter');

  return (
    <div
      role="status"
      aria-live="polite"
      className="border-border bg-card-hover/60 animate-filter-bar-in mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border px-4 py-2.5 text-sm print:hidden"
    >
      {/* Filter icon */}
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-body-muted shrink-0"
      >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>

      {/* Label */}
      <span className="text-body-muted text-xs font-semibold tracking-widest uppercase">{t('filteredBy')}</span>

      {/* One pill per active tag — clicking it removes that specific filter */}
      {tags.map((tag) => (
        <TagPill key={tag.name} name={tag.name} tagRef={tag.ref} onClick={onRemove} active />
      ))}

      {/* Explicit clear-all button */}
      <button
        type="button"
        onClick={onClearAll}
        className="text-body-muted hover:text-body focus-visible:ring-accent rounded px-2 py-0.5 text-xs focus:outline-none focus-visible:ring-2"
      >
        × {t('clear')}
      </button>

      {/* Spacer to push counter to the right */}
      <span className="text-body-muted ml-auto text-xs tabular-nums">
        {count}&nbsp;/&nbsp;{total}&nbsp;{t('missions')}
      </span>
    </div>
  );
};

export default FilterBar;

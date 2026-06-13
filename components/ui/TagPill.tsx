'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { cn } from '@/lib/cn';
import { getTagColor, type TagRef } from '@/lib/tagMeta';

export interface TagPillProps {
  name: string;
  tagRef: TagRef | string;
  // When provided, the pill renders as a <button> and calls onClick with the
  // tag name (used to filter the experience timeline).
  onClick?: (name: string) => void;
  // Highlights the pill when it matches the active filter.
  active?: boolean;
  className?: string;
}

// Per-theme idle styles (only applied when the pill is *not* active).
// Kept as module-level consts: each string contains long arbitrary color-mix() values.
const DARK_IDLE =
  'theme-dark:text-[var(--tag-bg)] theme-dark:bg-[color-mix(in_srgb,var(--tag-bg)_8%,transparent)] theme-dark:border-[color-mix(in_srgb,var(--tag-bg)_50%,transparent)]';
const CLEAN_IDLE =
  'theme-clean:text-[color-mix(in_srgb,var(--tag-bg)_72%,#000)] theme-clean:bg-[color-mix(in_srgb,var(--tag-bg)_15%,transparent)] theme-clean:border-[color-mix(in_srgb,var(--tag-bg)_25%,transparent)]';
const BOLD_IDLE = 'theme-bold:text-[var(--tag-fg)] theme-bold:bg-[var(--tag-bg)] theme-bold:border-[var(--tag-bg)]';
const IDLE = cn(DARK_IDLE, CLEAN_IDLE, BOLD_IDLE);

// Theme-aware technology tag. Category colours are injected as CSS custom
// properties (`--tag-bg` / `--tag-fg`); the three `@custom-variant` entries in
// `app/globals.css` handle per-theme rendering without any JS.
const TagPill: React.FC<TagPillProps> = ({ name, tagRef, onClick, active = false, className }) => {
  const t = useTranslations('tagFilter');
  const color = getTagColor(tagRef);
  const style = { '--tag-bg': color.bg, '--tag-fg': color.fg } as React.CSSProperties;
  const classes = cn(
    'inline-block rounded border border-transparent px-2 py-1 text-sm whitespace-nowrap',
    {
      'text-[var(--tag-fg)] bg-[var(--tag-bg)] border-[var(--tag-bg)]': active,
      [IDLE]: !active,
    },
    {
      'cursor-pointer hover:brightness-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tag-bg)]':
        !!onClick,
    },
    className
  );

  if (onClick) {
    return (
      <button
        type="button"
        style={style}
        className={classes}
        aria-pressed={active}
        aria-label={active ? t('removeFilter', { name }) : t('filterBy', { name })}
        onClick={() => onClick(name)}
      >
        {name}
      </button>
    );
  }

  return (
    <span style={style} className={classes}>
      {name}
    </span>
  );
};

export default TagPill;

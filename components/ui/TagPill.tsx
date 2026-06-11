import cn from 'clsx';
import React from 'react';

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

// Base layout classes shared by every pill.
const BASE = 'inline-block rounded border border-transparent px-2 py-1 text-sm whitespace-nowrap';

// Full-fill style: used when the pill is active, or always in the bold theme.
const FILLED = 'text-[var(--tag-fg)] bg-[var(--tag-bg)] border-[var(--tag-bg)]';

// Per-theme idle styles (only applied when the pill is *not* active).
const DARK_IDLE =
  'theme-dark:text-[var(--tag-bg)] theme-dark:bg-[color-mix(in_srgb,var(--tag-bg)_8%,transparent)] theme-dark:border-[color-mix(in_srgb,var(--tag-bg)_50%,transparent)]';
const CLEAN_IDLE =
  'theme-clean:text-[color-mix(in_srgb,var(--tag-bg)_72%,#000)] theme-clean:bg-[color-mix(in_srgb,var(--tag-bg)_15%,transparent)] theme-clean:border-[color-mix(in_srgb,var(--tag-bg)_25%,transparent)]';
const BOLD_IDLE = 'theme-bold:text-[var(--tag-fg)] theme-bold:bg-[var(--tag-bg)] theme-bold:border-[var(--tag-bg)]';
const IDLE = [DARK_IDLE, CLEAN_IDLE, BOLD_IDLE].join(' ');

// Theme-aware technology tag. Category colours are injected as CSS custom
// properties (`--tag-bg` / `--tag-fg`); the three `@custom-variant` entries in
// `app/globals.css` handle per-theme rendering without any JS.
const TagPill: React.FC<TagPillProps> = ({ name, tagRef, onClick, active = false, className }) => {
  const color = getTagColor(tagRef);
  const style = { '--tag-bg': color.bg, '--tag-fg': color.fg } as React.CSSProperties;
  const classes = cn(
    BASE,
    active ? FILLED : IDLE,
    onClick &&
      'cursor-pointer hover:brightness-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tag-bg)]',
    className
  );

  if (onClick) {
    return (
      <button type="button" style={style} className={classes} aria-pressed={active} onClick={() => onClick(name)}>
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

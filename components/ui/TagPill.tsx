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

// Theme-aware technology tag. The category colors are injected as CSS custom
// properties (`--tag-bg` / `--tag-fg`); `app/globals.css` renders them as an
// outline (dark), a light fill (clean) or a full fill (bold).
const TagPill: React.FC<TagPillProps> = ({ name, tagRef, onClick, active = false, className }) => {
  const color = getTagColor(tagRef);
  const style = { '--tag-bg': color.bg, '--tag-fg': color.fg } as React.CSSProperties;
  const classes = cn('tag-pill', { 'is-active': active, 'is-interactive': Boolean(onClick) }, className);

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

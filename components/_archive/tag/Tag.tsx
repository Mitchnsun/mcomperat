import cn from 'clsx';
import React from 'react';

import { TagProps } from '@/types';

const TAG_COLORS: Record<string, string> = {
  html: 'bg-green-500',
  css: 'bg-blue-500',
  js: 'bg-amber-500',
  back: 'bg-neutral-800',
  ios: 'bg-fuchsia-700',
  db: 'bg-cyan-500',
};

const Tag: React.FC<TagProps> = ({ name, tag }) => (
  // eslint-disable-next-line security/detect-object-injection
  <span className={cn('inline-block px-2 py-1 text-xs text-white', TAG_COLORS[tag] ?? 'bg-gray-500')}>{name}</span>
);

export default Tag;

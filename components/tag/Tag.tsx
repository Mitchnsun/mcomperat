import cn from 'clsx';
import React from 'react';

import { TagProps } from '../../types';

const TAGS = ['html', 'css', 'js', 'back', 'ios', 'db'] as const;

const Tag: React.FC<TagProps> = ({ name, tag }) => (
  <span
    className={cn('inline-block px-2 py-1 text-xs text-white', {
      'bg-green-500': tag === 'html',
      'bg-blue-500': tag === 'css',
      'bg-amber-500': tag === 'js',
      'bg-neutral-800': tag === 'back',
      'bg-fuchsia-700': tag === 'ios',
      'bg-cyan-500': tag === 'db',
      'bg-gray-500': !TAGS.includes(tag as (typeof TAGS)[number]),
    })}
  >
    {name}
  </span>
);

export default Tag;

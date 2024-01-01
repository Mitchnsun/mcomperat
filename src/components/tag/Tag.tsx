import React from 'react';
import classNames from 'classnames';
import { type Tag } from '@/types/all';

const BACKGROUND_COLOR: Record<string, string> = {
  html: 'bg-green-500',
  css: 'bg-sky-500',
  js: 'bg-orange-500',
  back: 'bg-slate-900',
  ios: 'bg-violet-600',
  db: 'bg-cyan-300',
};

const Tag = ({ name, cat }: Tag) => (
  <div className={classNames('text-white text-xs py-1 px-4', BACKGROUND_COLOR[cat] || 'bg-gray-500')}>{name}</div>
);

export default Tag;

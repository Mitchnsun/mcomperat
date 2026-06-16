import { describe, expect, it } from '@jest/globals';

import { countMatchingTags, findTagRef } from '@/lib/tagUtils';
import { type Experience } from '@/types';

const EXPERIENCE: Experience = {
  id: 'exp-0',
  company: 'Acme',
  location: 'Paris, France',
  title: { fr: 'Développeur', en: 'Developer' },
  start: '2020',
  end: '2021',
  tags: [
    { name: 'TypeScript', ref: 'js' },
    { name: 'Tailwind CSS', ref: 'css' },
  ],
  desc: { fr: 'Description', en: 'Description' },
  list: { fr: ['Item'], en: ['Item'] },
};

describe('countMatchingTags', () => {
  it('should return 0 when filter list is empty', () => {
    expect(countMatchingTags(EXPERIENCE, [])).toBe(0);
  });

  it('should return count when exp contains matching tags', () => {
    expect(countMatchingTags(EXPERIENCE, ['TypeScript', 'Jest'])).toBe(1);
  });

  it('should return 0 when exp does not contain matching tags', () => {
    expect(countMatchingTags(EXPERIENCE, ['Jest'])).toBe(0);
  });
});

describe('findTagRef', () => {
  it('should return undefined for unknown tag', () => {
    expect(findTagRef([EXPERIENCE], 'Unknown')).toBeUndefined();
  });

  it('should return the matching tag ref', () => {
    expect(findTagRef([EXPERIENCE], 'Tailwind CSS')).toBe('css');
  });
});

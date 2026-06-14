import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { experienceReveal } from '@/lib/experienceReveal';

describe('experienceReveal', () => {
  beforeEach(() => {
    experienceReveal.setFilteredOutIds(new Set());
    experienceReveal.setClearFilters(() => undefined);
    experienceReveal.setOverflowState(
      () => false,
      () => undefined
    );
  });

  it('reveals hidden experience by clearing filters and overflow', () => {
    const clearFilters = jest.fn();
    const revealOverflow = jest.fn();

    experienceReveal.setFilteredOutIds(new Set(['exp-42']));
    experienceReveal.setClearFilters(clearFilters);
    experienceReveal.setOverflowState((id) => id === 'exp-42', revealOverflow);

    experienceReveal.reveal('exp-42');

    expect(clearFilters).toHaveBeenCalled();
    expect(revealOverflow).toHaveBeenCalled();
  });

  it('does nothing when experience is already visible', () => {
    const clearFilters = jest.fn();
    const revealOverflow = jest.fn();

    experienceReveal.setFilteredOutIds(new Set());
    experienceReveal.setClearFilters(clearFilters);
    experienceReveal.setOverflowState(() => false, revealOverflow);

    experienceReveal.reveal('exp-1');

    expect(clearFilters).not.toHaveBeenCalled();
    expect(revealOverflow).not.toHaveBeenCalled();
  });
});

import '@testing-library/jest-dom';

import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ExperienceRoulette from '@/components/layout/ExperienceRoulette';
import { type ExperienceNavItem } from '@/types';

const EXPERIENCES: ExperienceNavItem[] = [
  { id: 'exp-0', company: 'Alpha', year: '2020' },
  { id: 'exp-1', company: 'Beta', year: '2021' },
  { id: 'exp-2', company: 'Gamma', year: '2022' },
];

describe('YearTimeline (ExperienceRoulette)', () => {
  it('should render a chip for each experience', () => {
    const { container } = render(
      <ExperienceRoulette
        experiences={EXPERIENCES}
        activeExpId="exp-0"
        label="Experiences"
        toggleExpandLabel="Expand"
        toggleCollapseLabel="Collapse"
        onExpClick={() => undefined}
      />
    );

    const chips = container.querySelectorAll('[data-testid^="timeline-chip-"]');
    expect(chips.length).toBe(EXPERIENCES.length);
  });

  it('should highlight the active experience', () => {
    render(
      <ExperienceRoulette
        experiences={EXPERIENCES}
        activeExpId="exp-1"
        label="Experiences"
        toggleExpandLabel="Expand"
        toggleCollapseLabel="Collapse"
        onExpClick={() => undefined}
      />
    );

    expect(screen.getByTestId('sidebar-exp-btn-exp-1').getAttribute('aria-current')).toBe('true');
  });

  it('should call onExpClick when chip is clicked', async () => {
    const user = userEvent.setup();
    const onExpClick = jest.fn();

    render(
      <ExperienceRoulette
        experiences={EXPERIENCES}
        activeExpId="exp-0"
        label="Experiences"
        toggleExpandLabel="Expand"
        toggleCollapseLabel="Collapse"
        onExpClick={onExpClick}
      />
    );

    await user.click(screen.getByTestId('sidebar-exp-btn-exp-1'));

    expect(onExpClick).toHaveBeenCalledWith('exp-1');
  });
});

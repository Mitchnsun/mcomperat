import '@testing-library/jest-dom';

import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ExperienceCard from '@/components/experience/ExperienceCard';
import { type Experience } from '@/types';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const EXPERIENCE: Experience = {
  id: 'exp-1',
  company: 'Acme Corp',
  location: 'Paris, France',
  title: { fr: 'Développeur Frontend', en: 'Frontend Developer' },
  start: '2021',
  end: '2022',
  tags: [{ name: 'TypeScript', ref: 'js' }],
  desc: { fr: 'Mission importante', en: 'Important mission' },
  list: { fr: ['Item FR'], en: ['Item EN'] },
};

describe('ExperienceCard', () => {
  it('should render company name', () => {
    render(<ExperienceCard exp={EXPERIENCE} lang="fr" />);

    expect(screen.getByText('Acme Corp, Paris, France')).toBeTruthy();
  });

  it('should toggle body on header click', async () => {
    const user = userEvent.setup();
    const { container } = render(<ExperienceCard exp={EXPERIENCE} lang="fr" defaultExpanded={false} />);

    const body = container.querySelector(`#${EXPERIENCE.id}-body`);
    expect(body?.classList.contains('hidden')).toBe(true);

    await user.click(screen.getByTestId(`exp-expand-btn-${EXPERIENCE.id}`));

    expect(body?.classList.contains('hidden')).toBe(false);
  });

  it('should be collapsed by default when defaultExpanded=false', () => {
    const { container } = render(<ExperienceCard exp={EXPERIENCE} lang="fr" defaultExpanded={false} />);

    expect(container.querySelector(`#${EXPERIENCE.id}-body`)?.classList.contains('hidden')).toBe(true);
  });

  it('should call onTagClick with tag name when tag clicked', async () => {
    const user = userEvent.setup();
    const onTagClick = jest.fn();

    render(<ExperienceCard exp={EXPERIENCE} lang="fr" onTagClick={onTagClick} />);

    await user.click(screen.getByTestId('tag-pill-TypeScript'));

    expect(onTagClick).toHaveBeenCalledWith('TypeScript');
  });

  it('should apply active and dimmed visual classes', () => {
    const { container } = render(<ExperienceCard exp={EXPERIENCE} lang="fr" isActive isDimmed />);

    const article = container.querySelector('[data-exp-id="exp-1"]');
    expect(article?.classList.contains('theme-dark:border-l-2')).toBe(true);
    expect(article?.classList.contains('opacity-45')).toBe(true);
  });
});

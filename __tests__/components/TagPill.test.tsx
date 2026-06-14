import '@testing-library/jest-dom';

import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TagPill from '@/components/ui/TagPill';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: { name?: string }) => (values?.name ? `${key}:${values.name}` : key),
}));

describe('TagPill', () => {
  it('should render as <span> without onClick', () => {
    const { container } = render(<TagPill name="TypeScript" tagRef="js" />);

    expect(container.querySelector('span')).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('should render as <button> with onClick', () => {
    render(<TagPill name="TypeScript" tagRef="js" onClick={() => undefined} />);

    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('should call onClick with stopPropagation', async () => {
    const user = userEvent.setup();
    const parentClick = jest.fn();
    const onClick = jest.fn();

    render(
      <div onClick={parentClick}>
        <TagPill name="TypeScript" tagRef="js" onClick={onClick} />
      </div>
    );

    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledWith('TypeScript');
    expect(parentClick).not.toHaveBeenCalled();
  });

  it('should have active styles when active=true', () => {
    render(<TagPill name="TypeScript" tagRef="js" onClick={() => undefined} active />);

    expect(screen.getByRole('button').classList.contains('bg-[var(--tag-bg)]')).toBe(true);
  });
});

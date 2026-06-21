import '@testing-library/jest-dom';

import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContentModeSeg from '@/components/print/controls/ContentModeSeg';
import DesignPicker from '@/components/print/controls/DesignPicker';
import SectionToggles from '@/components/print/controls/SectionToggles';
import { type ContentMode, type Design, type SectionKey } from '@/hooks/usePrintOptions';
import { type ResumeData } from '@/types';

jest.mock('@/components/print/PrintSidebar', () => ({
  __esModule: true,
  default: ({ onPrint }: { onPrint: () => void }) => (
    <button type="button" data-testid="print-trigger" onClick={onPrint}>
      print
    </button>
  ),
}));

describe('DesignPicker', () => {
  it('click on a design calls onChange with the selected value', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn<(next: Design) => void>();

    render(<DesignPicker value="classic" onChange={onChange} />);
    await user.click(screen.getByTestId('print-design-editorial'));

    expect(onChange).toHaveBeenCalledWith('editorial');
  });
});

describe('ContentModeSeg', () => {
  it('segmented content reflects mode and calls onModeChange', async () => {
    const user = userEvent.setup();
    const onModeChange = jest.fn<(next: ContentMode) => void>();

    render(
      <ContentModeSeg
        mode="condensed"
        onModeChange={onModeChange}
        detail="summary"
        scope="recent"
        onDetailChange={() => undefined}
        onScopeChange={() => undefined}
      />
    );

    expect(screen.getByTestId('print-mode-condensed').getAttribute('aria-checked')).toBe('true');
    await user.click(screen.getByTestId('print-mode-custom'));
    expect(onModeChange).toHaveBeenCalledWith('custom');
  });
});

describe('SectionToggles', () => {
  const sections: Array<{ key: SectionKey; enabled: boolean }> = [
    { key: 'profile', enabled: true },
    { key: 'techSkills', enabled: true },
  ];

  it('is disabled when locked=true', () => {
    render(<SectionToggles sections={sections} locked onToggle={() => undefined} />);

    expect(screen.getByTestId('print-section-profile').hasAttribute('disabled')).toBe(true);
    expect(screen.getByTestId('print-section-techSkills').hasAttribute('disabled')).toBe(true);
  });

  it('is active when locked=false', async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn<(key: SectionKey) => void>();
    render(<SectionToggles sections={sections} locked={false} onToggle={onToggle} />);

    await user.click(screen.getByTestId('print-section-profile'));
    expect(onToggle).toHaveBeenCalledWith('profile');
  });

  it('renders distinct snapshots for dark, clean and bold', () => {
    const dark = render(
      <div data-theme="dark">
        <SectionToggles sections={sections} locked={false} onToggle={() => undefined} />
      </div>
    );
    expect(dark.container.firstChild).toMatchSnapshot('theme-dark');

    const clean = render(
      <div data-theme="clean">
        <SectionToggles sections={sections} locked={false} onToggle={() => undefined} />
      </div>
    );
    expect(clean.container.firstChild).toMatchSnapshot('theme-clean');

    const bold = render(
      <div data-theme="bold">
        <SectionToggles sections={sections} locked={false} onToggle={() => undefined} />
      </div>
    );
    expect(bold.container.firstChild).toMatchSnapshot('theme-bold');
  });
});

describe('PrintApp', () => {
  it('clicking print calls window.print', async () => {
    const PrintApp = require('@/components/print/PrintApp')
      .default as typeof import('@/components/print/PrintApp').default;
    const user = userEvent.setup();
    const printSpy = jest.spyOn(window, 'print').mockImplementation(() => undefined);
    const data: ResumeData = {
      person: {
        firstname: 'Matthieu',
        lastname: 'Compérat',
        title: { fr: 'Développeur', en: 'Developer' },
        email: 'matthieu@example.com',
      },
      experiences: [],
      skills: [],
      education: [],
      extras: [],
    };

    render(<PrintApp data={data} initialLang="fr" />);
    await user.click(screen.getByTestId('print-trigger'));

    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });
});

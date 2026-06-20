'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { CONTENT_MODES, type ContentMode, type Design, DESIGNS } from '@/hooks/usePrintOptions';
import { cn } from '@/lib/cn';
import { type Lang } from '@/types';

interface PrintSidebarProps {
  design: Design;
  onDesignChange: (design: Design) => void;
  mode: ContentMode;
  onModeChange: (mode: ContentMode) => void;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  onPrint: () => void;
}

const LANGS: Lang[] = ['fr', 'en'];

interface OptionGroupProps<T extends string> {
  name: string;
  label: string;
  options: readonly T[];
  selected: T;
  onSelect: (value: T) => void;
  renderLabel: (value: T) => string;
}

function OptionGroup<T extends string>({ name, label, options, selected, onSelect, renderLabel }: OptionGroupProps<T>) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-body-muted mb-2 text-sm font-medium">{label}</legend>
      <div role="radiogroup" className="flex flex-wrap gap-2">
        {options.map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected === value}
            data-testid={`print-${name}-${value}`}
            onClick={() => onSelect(value)}
            className={cn('border-border rounded-md border px-3 py-1.5 text-sm', {
              'bg-brand text-bg': selected === value,
              'text-body bg-transparent': selected !== value,
            })}
          >
            {renderLabel(value)}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

// Foundation sidebar (TICKET-011): exposes the core print options wired to
// usePrintOptions. Richer controls (custom section toggles, detail/scope) are
// layered on in later tickets.
const PrintSidebar: React.FC<PrintSidebarProps> = ({
  design,
  onDesignChange,
  mode,
  onModeChange,
  lang,
  onLangChange,
  onPrint,
}) => {
  const t = useTranslations('print');

  return (
    <aside
      data-testid="print-sidebar"
      className="border-border bg-bg flex w-full shrink-0 flex-col gap-6 p-6 md:w-72 md:border-r print:hidden"
    >
      <h2 className="text-brand text-lg font-semibold">{t('title')}</h2>

      <OptionGroup
        name="design"
        label={t('design.label')}
        options={DESIGNS}
        selected={design}
        onSelect={onDesignChange}
        renderLabel={(value) => t(`design.${value}`)}
      />

      <OptionGroup
        name="mode"
        label={t('mode.label')}
        options={CONTENT_MODES}
        selected={mode}
        onSelect={onModeChange}
        renderLabel={(value) => t(`mode.${value}`)}
      />

      <OptionGroup
        name="lang"
        label={t('language.label')}
        options={LANGS}
        selected={lang}
        onSelect={onLangChange}
        renderLabel={(value) => t(`language.${value}`)}
      />

      <button
        type="button"
        data-testid="print-trigger"
        onClick={onPrint}
        className="bg-brand text-bg rounded-md px-4 py-2 text-sm font-semibold"
      >
        {t('print')}
      </button>
    </aside>
  );
};

export default PrintSidebar;

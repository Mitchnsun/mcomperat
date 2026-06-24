'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { CONTENT_MODES, type ContentMode, type CustomConfig } from '@/hooks/usePrintOptions';
import { cn } from '@/lib/cn';

interface SegmentedProps<T extends string> {
  testId: string;
  options: readonly T[];
  value: T;
  onChange: (next: T) => void;
  renderLabel: (value: T) => string;
}

function Segmented<T extends string>({ testId, options, value, onChange, renderLabel }: SegmentedProps<T>) {
  return (
    <div
      role="radiogroup"
      className="border-border flex items-center justify-center gap-1 rounded-lg border bg-white p-1"
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          data-testid={`${testId}-${option}`}
          aria-checked={value === option}
          onClick={() => onChange(option)}
          className={cn('basis-1/3 rounded-md px-3 py-1.5 text-xs font-semibold', {
            'bg-brand text-bg': value === option,
            'hover:bg-card-hover hover:text-body text-mauve-900': value !== option,
          })}
        >
          {renderLabel(option)}
        </button>
      ))}
    </div>
  );
}

interface ContentModeSegProps {
  mode: ContentMode;
  onModeChange: (next: ContentMode) => void;
  detail: CustomConfig['detail'];
  scope: CustomConfig['scope'];
  onDetailChange: (next: CustomConfig['detail']) => void;
  onScopeChange: (next: CustomConfig['scope']) => void;
}

const DETAIL_OPTIONS = ['full', 'summary'] as const;
const SCOPE_OPTIONS = ['all', 'recent'] as const;

const ContentModeSeg: React.FC<ContentModeSegProps> = ({
  mode,
  onModeChange,
  detail,
  scope,
  onDetailChange,
  onScopeChange,
}) => {
  const t = useTranslations('print');
  const custom = mode === 'custom';

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-body-muted text-sm font-medium">{t('content.label')}</legend>

      <Segmented
        testId="print-mode"
        options={CONTENT_MODES}
        value={mode}
        onChange={onModeChange}
        renderLabel={(value) => t(`content.${value}`)}
      />

      <p className="text-body-muted text-xs">{t(`content.help.${mode}`)}</p>

      {custom ? (
        <div className="border-border flex flex-col gap-3 rounded-lg border bg-white p-3">
          <div className="flex flex-col gap-2">
            <p className="text-body text-xs font-medium">{t('content.detail.label')}</p>
            <Segmented
              testId="print-detail"
              options={DETAIL_OPTIONS}
              value={detail}
              onChange={onDetailChange}
              renderLabel={(value) => t(`content.detail.${value}`)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-body text-xs font-medium">{t('content.scope.label')}</p>
            <Segmented
              testId="print-scope"
              options={SCOPE_OPTIONS}
              value={scope}
              onChange={onScopeChange}
              renderLabel={(value) => t(`content.scope.${value}`)}
            />
          </div>
        </div>
      ) : null}
    </fieldset>
  );
};

export default ContentModeSeg;

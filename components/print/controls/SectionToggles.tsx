'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { type SectionKey } from '@/hooks/usePrintOptions';
import { cn } from '@/lib/cn';

interface SectionToggle {
  key: SectionKey;
  enabled: boolean;
}

interface SectionTogglesProps {
  sections: SectionToggle[];
  locked: boolean;
  onToggle: (key: SectionKey) => void;
}

const SectionToggles: React.FC<SectionTogglesProps> = ({ sections, locked, onToggle }) => {
  const t = useTranslations('print');

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-body-muted text-sm font-medium">{t('sections.label')}</legend>
      <div className="border-border flex flex-col rounded-lg border bg-white">
        {sections.map((section) => (
          <label
            key={section.key}
            className={cn(
              'border-body-muted flex items-center justify-between gap-3 border-b px-3 py-2 text-sm last:border-b-0',
              {
                'cursor-pointer': !locked,
                'opacity-70': locked,
              }
            )}
          >
            <span className="text-mauve-900">{t(`sections.items.${section.key}`)}</span>
            <input
              type="checkbox"
              checked={section.enabled}
              disabled={locked}
              data-testid={`print-section-${section.key}`}
              onChange={() => onToggle(section.key)}
              className="accent-(--c-accent)"
            />
          </label>
        ))}
      </div>
      {locked ? <p className="text-body-muted text-xs">{t('sections.lockedHelp')}</p> : null}
    </fieldset>
  );
};

export default SectionToggles;

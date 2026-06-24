'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { type Design, DESIGNS } from '@/hooks/usePrintOptions';
import { cn } from '@/lib/cn';

interface DesignPickerProps {
  value: Design;
  onChange: (next: Design) => void;
}

const swatchByDesign: Record<Design, React.ReactNode> = {
  classic: (
    <div className="border-border relative h-14 w-full overflow-hidden rounded border bg-white p-2">
      <div className="bg-body/70 h-1.5 w-2/3 rounded" />
      <div className="mt-2 grid grid-cols-2 gap-1">
        <div className="space-y-1">
          <div className="bg-body/25 h-1 rounded" />
          <div className="bg-body/25 h-1 rounded" />
          <div className="bg-body/25 h-1 rounded" />
        </div>
        <div className="space-y-1">
          <div className="bg-body/25 h-1 rounded" />
          <div className="bg-body/25 h-1 rounded" />
          <div className="bg-body/25 h-1 rounded" />
        </div>
      </div>
    </div>
  ),
  editorial: (
    <div className="border-border h-14 w-full rounded border bg-white p-2">
      <div className="bg-body/70 mx-auto h-1.5 w-1/2 rounded" />
      <div className="mt-2 space-y-1.5">
        <div className="bg-body/25 mx-auto h-1 w-3/4 rounded" />
        <div className="bg-body/25 mx-auto h-1 w-2/3 rounded" />
        <div className="bg-body/25 mx-auto h-1 w-3/5 rounded" />
      </div>
    </div>
  ),
  timeline: (
    <div className="border-border relative h-14 w-full rounded border bg-white p-2 pl-5">
      <div className="bg-accent absolute top-2 bottom-2 left-2 w-0.5" />
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <span className="bg-accent h-1.5 w-1.5 rounded-full" />
          <span className="bg-body/25 h-1 w-3/4 rounded" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="bg-accent h-1.5 w-1.5 rounded-full" />
          <span className="bg-body/25 h-1 w-2/3 rounded" />
        </div>
      </div>
    </div>
  ),
};

const DesignPicker: React.FC<DesignPickerProps> = ({ value, onChange }) => {
  const t = useTranslations('print');

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-body-muted mb-1 text-sm font-medium">{t('design.label')}</legend>
      <div className="grid grid-cols-3 gap-2">
        {DESIGNS.map((design) => (
          <button
            key={design}
            type="button"
            data-testid={`print-design-${design}`}
            onClick={() => onChange(design)}
            className={cn('border-border rounded-lg border p-2 text-left', {
              'border-accent ring-accent/30 ring-2': value === design,
              'hover:bg-card-hover': value !== design,
            })}
          >
            {/* eslint-disable-next-line security/detect-object-injection -- design is a fixed Design union */}
            {swatchByDesign[design]}
            <span className="text-body mt-2 block text-xs font-medium">{t(`design.${design}`)}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
};

export default DesignPicker;

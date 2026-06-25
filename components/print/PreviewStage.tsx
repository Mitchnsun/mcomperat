'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { getPrintData } from '@/app/data/printContent';
import ClassicCV from '@/components/print/designs/ClassicCV';
import { useFitToWidth } from '@/hooks/useFitToWidth';
import { type ContentMode, type CustomConfig, type Design } from '@/hooks/usePrintOptions';
import { resolveConfig } from '@/lib/printConfig';
import { type Lang, type ResumeData } from '@/types';

interface PreviewStageProps {
  data: ResumeData;
  lang: Lang;
  design: Design;
  mode: ContentMode;
  custom: CustomConfig;
  onPrint: () => void;
}

// Foundation preview (TICKET-011): renders a single A4 sheet wrapper that the
// design-specific layouts (TICKET-013+) will populate. It already reflects the
// active language so the option state is observable end-to-end.
const PreviewStage: React.FC<PreviewStageProps> = ({ data, lang, design, mode, custom, onPrint }) => {
  const { paperRef, stageRef } = useFitToWidth();
  const t = useTranslations('print');
  const cfg = mode === 'custom' ? resolveConfig(mode, custom) : resolveConfig(mode);
  const printData = getPrintData();

  return (
    <section
      ref={stageRef}
      data-testid="print-preview"
      data-design={design}
      data-mode={mode}
      className="preview-stage min-h-0 flex-1 overflow-y-auto bg-orange-50 px-4 py-6 md:px-8 print:h-auto print:min-h-0 print:overflow-visible print:bg-white print:p-0"
    >
      <div className="mx-auto flex w-fit max-w-full flex-col items-center gap-4">
        <div
          data-testid="print-toolbar"
          className="flex w-full max-w-[210mm] flex-wrap items-center justify-between gap-3 rounded-xl border border-black/10 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-sm backdrop-blur print:hidden"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-semibold text-slate-950">A4 · 210 × 297 mm</span>
            <span aria-hidden="true" className="text-slate-300">
              •
            </span>
            <span>{t(`design.${design}`)}</span>
            <span aria-hidden="true" className="text-slate-300">
              •
            </span>
            <span>{t(`content.${mode}`)}</span>
          </div>
          <button
            type="button"
            onClick={onPrint}
            className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
          >
            {t('print')}
          </button>
        </div>

        <div
          ref={(node) => {
            paperRef.current = node;
          }}
        >
          <ClassicCV data={data} print={printData} cfg={cfg} lang={lang} />
        </div>
      </div>
    </section>
  );
};

export default PreviewStage;

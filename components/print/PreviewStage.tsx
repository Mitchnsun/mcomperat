'use client';

import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';

import { getPrintData } from '@/app/data/printContent';
import TimelineCV from '@/components/print/designs/TimelineCV';
import { useFitToWidth } from '@/hooks/useFitToWidth';
import { type ContentMode, type Design } from '@/hooks/usePrintOptions';
import { cn } from '@/lib/cn';
import { pick } from '@/lib/localize';
import { resolveConfig } from '@/lib/printConfig';
import { type CustomConfig, type Lang, type ResumeData } from '@/types';

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
  const { person } = data;
  const { paperRef, stageRef } = useFitToWidth();
  const t = useTranslations('print');

  const printData = useMemo(() => getPrintData(), []);
  const cfg = useMemo(
    () => (mode === 'custom' ? resolveConfig('custom', custom) : resolveConfig(mode)),
    [mode, custom]
  );

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

        <article
          ref={paperRef}
          data-testid="print-sheet"
          className={cn(
            'paper min-h-[297mm] w-[210mm] bg-white p-[15mm] text-black shadow-[0_16px_40px_rgba(15,23,42,0.18)]',
            'print:min-h-0 print:shadow-none print:[zoom:1]!'
          )}
        >
          {design === 'timeline' ? (
            <TimelineCV data={data} print={printData} cfg={cfg} lang={lang} />
          ) : (
            <header className="border-b border-black/10 pb-4">
              <h1 className="text-2xl font-bold">
                {person.firstname} {person.lastname}
              </h1>
              <p className="mt-1 text-sm text-black/70">{pick(person.title, lang)}</p>
            </header>
          )}
        </article>
      </div>
    </section>
  );
};

export default PreviewStage;

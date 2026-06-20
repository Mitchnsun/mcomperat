'use client';

import React from 'react';

import { type ContentMode, type Design } from '@/hooks/usePrintOptions';
import { cn } from '@/lib/cn';
import { pick } from '@/lib/localize';
import { type Lang, type ResumeData } from '@/types';

interface PreviewStageProps {
  data: ResumeData;
  lang: Lang;
  design: Design;
  mode: ContentMode;
}

// Foundation preview (TICKET-011): renders a single A4 sheet wrapper that the
// design-specific layouts (TICKET-013+) will populate. It already reflects the
// active language so the option state is observable end-to-end.
const PreviewStage: React.FC<PreviewStageProps> = ({ data, lang, design, mode }) => {
  const { person } = data;

  return (
    <div
      data-testid="print-preview"
      data-design={design}
      data-mode={mode}
      className="bg-card flex flex-1 justify-center overflow-auto p-8 print:overflow-visible print:bg-transparent print:p-0"
    >
      <article
        data-testid="print-sheet"
        className={cn(
          'aspect-[210/297] w-[210mm] max-w-full bg-white p-[15mm] text-black shadow-lg',
          'print:aspect-auto print:w-full print:max-w-none print:shadow-none print:[page:print-route]'
        )}
      >
        <header className="border-b border-black/10 pb-4">
          <h1 className="text-2xl font-bold">
            {person.firstname} {person.lastname}
          </h1>
          <p className="mt-1 text-sm text-black/70">{pick(person.title, lang)}</p>
        </header>
      </article>
    </div>
  );
};

export default PreviewStage;

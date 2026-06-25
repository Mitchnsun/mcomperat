'use client';

import React, { useCallback } from 'react';

import PreviewStage from '@/components/print/PreviewStage';
import PrintSidebar from '@/components/print/PrintSidebar';
import { usePrintOptions } from '@/hooks/usePrintOptions';
import { type Lang, type ResumeData } from '@/types';

interface PrintAppProps {
  data: ResumeData;
  initialLang: Lang;
}

// Client container for the printable CV preview (TICKET-011). Owns the print
// option state via usePrintOptions and composes the sidebar (controls) with the
// preview stage (the rendered sheet).
const PrintApp: React.FC<PrintAppProps> = ({ data, initialLang }) => {
  const { design, setDesign, mode, setMode, custom, setCustom, lang } = usePrintOptions(initialLang);

  const handlePrint = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }, []);

  return (
    <main className="print-route flex min-h-screen flex-col pt-16 md:h-screen md:flex-row md:overflow-hidden md:pt-0 print:block print:h-auto print:overflow-visible print:pt-0 print:[page:print-route]">
      <PrintSidebar
        design={design}
        onDesignChange={setDesign}
        mode={mode}
        onModeChange={setMode}
        custom={custom}
        onCustomChange={setCustom}
        onPrint={handlePrint}
      />
      <PreviewStage data={data} lang={lang} design={design} mode={mode} custom={custom} onPrint={handlePrint} />
    </main>
  );
};

export default PrintApp;

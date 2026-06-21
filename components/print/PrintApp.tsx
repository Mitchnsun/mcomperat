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
  const { design, setDesign, mode, setMode, custom, setCustom } = usePrintOptions(initialLang);

  const handlePrint = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }, []);

  return (
    <main className="print-route flex min-h-screen flex-col pt-16 md:h-screen md:flex-row md:overflow-hidden md:pt-0 print:block print:h-auto print:overflow-visible">
      <PrintSidebar
        design={design}
        onDesignChange={setDesign}
        mode={mode}
        onModeChange={setMode}
        custom={custom}
        onCustomChange={setCustom}
        onPrint={handlePrint}
      />
      <PreviewStage data={data} lang={initialLang} design={design} mode={mode} onPrint={handlePrint} />
    </main>
  );
};

export default PrintApp;

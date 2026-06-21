'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react';

import ContentModeSeg from '@/components/print/controls/ContentModeSeg';
import DesignPicker from '@/components/print/controls/DesignPicker';
import SectionToggles from '@/components/print/controls/SectionToggles';
import LangToggle from '@/components/ui/LangToggle';
import {
  type ContentMode,
  type CustomConfig,
  type Design,
  SECTION_KEYS,
  type SectionKey,
} from '@/hooks/usePrintOptions';
import { cn } from '@/lib/cn';
import { resolveConfig } from '@/lib/printConfig';

interface PrintSidebarProps {
  design: Design;
  onDesignChange: (design: Design) => void;
  mode: ContentMode;
  onModeChange: (mode: ContentMode) => void;
  custom: CustomConfig;
  onCustomChange: (updater: (current: CustomConfig) => CustomConfig) => void;
  onPrint: () => void;
}

// Foundation sidebar (TICKET-011): exposes the core print options wired to
// usePrintOptions. Richer controls (custom section toggles, detail/scope) are
// layered on in later tickets.
const PrintSidebar: React.FC<PrintSidebarProps> = ({
  design,
  onDesignChange,
  mode,
  onModeChange,
  custom,
  onCustomChange,
  onPrint,
}) => {
  const t = useTranslations('print');
  const locale = useLocale();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const locked = mode !== 'custom';
  const cfg = useMemo(() => (mode === 'custom' ? resolveConfig(mode, custom) : resolveConfig(mode)), [custom, mode]);

  const handleSectionToggle = (key: SectionKey) => {
    if (locked) return;
    onCustomChange((current) => ({
      ...current,
      sections: {
        ...current.sections,
        // eslint-disable-next-line security/detect-object-injection -- key is a fixed SectionKey union
        [key]: !current.sections[key],
      },
    }));
  };

  const handleDetailChange = (value: CustomConfig['detail']) => {
    onCustomChange((current) => ({ ...current, detail: value }));
  };

  const handleScopeChange = (value: CustomConfig['scope']) => {
    onCustomChange((current) => ({ ...current, scope: value }));
  };

  return (
    <>
      <div className="bg-sidebar border-border fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b px-4 md:hidden print:hidden">
        <div className="flex items-center gap-3">
          <span className="bg-brand text-bg inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold tracking-wide">
            MC
          </span>
          <div className="leading-tight">
            <p className="text-body text-sm font-semibold">Matthieu Compérat</p>
            <p className="text-body-muted text-xs">{t('identity.printable')}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label={t('drawer.toggle')}
          aria-expanded={isDrawerOpen}
          onClick={() => setIsDrawerOpen((open) => !open)}
          className="border-border focus-visible:ring-accent inline-flex h-10 w-10 items-center justify-center rounded-md border"
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isDrawerOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {isDrawerOpen ? (
        <button
          type="button"
          aria-label={t('drawer.close')}
          tabIndex={-1}
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden print:hidden"
        />
      ) : null}

      <aside
        data-testid="print-sidebar"
        className={cn(
          'bg-sidebar border-border fixed top-16 bottom-0 left-0 z-40 flex w-[20rem] max-w-[90vw] shrink-0 flex-col border-r transition-transform duration-300 ease-in-out md:static md:top-0 md:h-screen md:w-80 md:max-w-none md:translate-x-0 print:hidden',
          { 'translate-x-0': isDrawerOpen, '-translate-x-full md:translate-x-0': !isDrawerOpen }
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-6">
          <div className="hidden items-center gap-3 md:flex">
            <span className="bg-brand text-bg inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold tracking-wide">
              MC
            </span>
            <div className="leading-tight">
              <p className="text-body text-sm font-semibold">Matthieu Compérat</p>
              <p className="text-body-muted text-xs">{t('identity.printable')}</p>
            </div>
          </div>

          <Link
            href={`/${locale}`}
            className="text-brand text-sm font-medium hover:underline"
            onClick={() => setIsDrawerOpen(false)}
          >
            {t('back')}
          </Link>

          <DesignPicker value={design} onChange={onDesignChange} />

          <ContentModeSeg
            mode={mode}
            onModeChange={onModeChange}
            detail={cfg.detail}
            scope={cfg.scope}
            onDetailChange={handleDetailChange}
            onScopeChange={handleScopeChange}
          />

          <SectionToggles
            // eslint-disable-next-line security/detect-object-injection -- key is from SECTION_KEYS fixed literals
            sections={SECTION_KEYS.map((key) => ({ key, enabled: cfg.sections[key] }))}
            locked={locked}
            onToggle={handleSectionToggle}
          />
        </div>

        <footer className="border-border flex items-center justify-between gap-3 border-t p-4">
          <LangToggle className="shrink-0" />
          <button
            type="button"
            data-testid="print-trigger"
            onClick={onPrint}
            className="bg-brand text-bg rounded-md px-4 py-2 text-sm font-semibold"
          >
            {t('print')}
          </button>
        </footer>
      </aside>
    </>
  );
};

export default PrintSidebar;

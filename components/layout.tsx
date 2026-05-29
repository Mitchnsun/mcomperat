'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';

import MainContent from '@/components/layout/MainContent';
import Sidebar from '@/components/layout/Sidebar';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { LayoutProps } from '@/types';

// Offset (px) applied when scrolling to a card so it is not hidden behind the
// sticky timeline header.
const SCROLL_OFFSET = 120;

const Layout: React.FC<LayoutProps> = ({ person, experiences = [], sections = [], children }) => {
  const mainRef = useRef<HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const expIds = useMemo(() => experiences.map((exp) => exp.id), [experiences]);
  const activeExpId = useScrollTracking(mainRef, expIds);

  const scrollToTarget = useCallback((selector: string) => {
    const container = mainRef.current;
    const el = container?.querySelector(selector);
    if (!el || !container) return;
    const offset = el.getBoundingClientRect().top - container.getBoundingClientRect().top;
    container.scrollTo({ top: container.scrollTop + offset - SCROLL_OFFSET, behavior: 'smooth' });
  }, []);

  const handleExpClick = useCallback(
    (id: string) => {
      scrollToTarget(`[data-exp-id="${id}"]`);
      setIsDrawerOpen(false);
    },
    [scrollToTarget]
  );

  const handleSectionClick = useCallback(
    (href: string) => {
      scrollToTarget(`#${CSS.escape(href.replace(/^#/, ''))}`);
      setIsDrawerOpen(false);
    },
    [scrollToTarget]
  );

  return (
    <div className="cv-layout bg-bg text-body flex h-screen overflow-hidden print:block print:h-auto print:overflow-visible">
      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={isDrawerOpen}
        onClick={() => setIsDrawerOpen((open) => !open)}
        className="bg-card border-border focus-visible:ring-accent fixed top-3 left-3 z-50 inline-flex h-10 w-10 items-center justify-center rounded-md border md:hidden print:hidden"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isDrawerOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
        </svg>
      </button>

      {/* Backdrop for the mobile drawer */}
      {isDrawerOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          tabIndex={-1}
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden print:hidden"
        />
      ) : null}

      <nav
        aria-label="Primary"
        className={[
          'cv-sidebar bg-sidebar border-border z-40 w-[244px] shrink-0 overflow-y-auto border-r',
          'fixed inset-y-0 left-0 h-screen transition-transform duration-300 ease-in-out md:static md:translate-x-0',
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          'print:hidden',
        ].join(' ')}
      >
        <Sidebar
          person={person}
          experiences={experiences}
          sections={sections}
          activeExpId={activeExpId}
          onExpClick={handleExpClick}
          onSectionClick={handleSectionClick}
        />
      </nav>

      <MainContent ref={mainRef}>
        <div className="p-4 lg:px-12 lg:py-8">{children}</div>
        <footer className="border-border text-body-muted border-t px-12 py-6 font-serif print:hidden">
          © {new Date().getFullYear()}, Built with&nbsp;
          <a href="https://nextjs.org" className="text-brand hover:underline">
            Next.js
          </a>
          , by&nbsp;
          <a href="https://www.gocosmic.dev/" className="text-brand hover:underline">
            Go Cosmic
          </a>
        </footer>
      </MainContent>
    </div>
  );
};

export default Layout;

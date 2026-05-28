import React from 'react';

import { Heading } from '@/components/heading';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { LayoutProps } from '@/types';

const Layout: React.FC<LayoutProps> = ({ person, children }) => (
  <div id="App" className="bg-bg text-text relative p-0 lg:pl-[30%]">
    <div className="fixed top-3 right-3 z-50 print:hidden">
      <ThemeToggle />
    </div>
    <nav
      role="navigation"
      aria-label="Primary"
      className="bg-sidebar text-text relative top-0 bottom-0 m-0 inline-block w-full align-top lg:fixed lg:-ml-[30%] lg:w-[30%]"
    >
      <Heading person={person} />
    </nav>
    <div>
      <main className="p-4 lg:px-12 lg:py-8">{children}</main>
      <footer className="border-border text-text-muted border-t px-12 py-6 font-serif print:hidden">
        © {new Date().getFullYear()}, Built with&nbsp;
        <a href="https://nextjs.org" className="text-brand hover:underline">
          Next.js
        </a>
        , by&nbsp;
        <a href="https://www.gocosmic.dev/" className="text-brand hover:underline">
          Go Cosmic
        </a>
      </footer>
    </div>
  </div>
);

export default Layout;

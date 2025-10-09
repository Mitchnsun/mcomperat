import React from 'react';

import { Heading } from '@/components/heading';
import { LayoutProps } from '@/types';

const Layout: React.FC<LayoutProps> = ({ person, children }) => (
  <div id="App" className="relative p-0 lg:pl-[30%]">
    <nav
      role="navigation"
      aria-label="Primary"
      className="relative top-0 bottom-0 m-0 inline-block w-full bg-slate-900 align-top text-white lg:fixed lg:-ml-[30%] lg:w-[30%]"
    >
      <Heading person={person} />
    </nav>
    <div>
      <main className="p-4 lg:px-12 lg:py-8">{children}</main>
      <footer className="border-t border-zinc-100 px-12 py-6 font-serif text-neutral-400 print:hidden">
        © {new Date().getFullYear()}, Built with&nbsp;
        <a href="https://nextjs.org" className="text-brand hover:underline">
          Next.js
        </a>
      </footer>
    </div>
  </div>
);

export default Layout;

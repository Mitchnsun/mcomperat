import './globals.css';

import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Matthieu Compérat - Resume',
  description: 'Web & Mobile Lead Programmer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

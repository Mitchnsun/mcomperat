import './globals.css';

import Script from 'next/script';
import { getLocale } from 'next-intl/server';
import React from 'react';

// Runs before React hydration to apply the stored theme and avoid a flash.
// Must live in the root layout so it is never re-rendered during client navigation.
const NO_FLASH_SCRIPT = `(() => {
  try {
    var t = localStorage.getItem('cv-theme');
    if (t !== 'dark' && t !== 'clean' && t !== 'bold') t = 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch (_) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let locale = 'fr';
  try {
    locale = await getLocale();
  } catch {
    // No locale context (e.g., root not-found page) — fall back to default locale.
  }

  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning>
      <head>
        <Script id="cv-theme-init" strategy="beforeInteractive">
          {NO_FLASH_SCRIPT}
        </Script>
      </head>
      <body className="bg-bg text-body font-sans">{children}</body>
    </html>
  );
}

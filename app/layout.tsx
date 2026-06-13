import './globals.css';

import { DM_Mono, DM_Sans, Inter, JetBrains_Mono, Space_Grotesk, Syne } from 'next/font/google';
import Script from 'next/script';
import { getLocale } from 'next-intl/server';
import React from 'react';

import { cn } from '@/lib/cn';

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

// Load all theme fonts up-front so switching themes never causes a FOUT.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

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
      <body
        className={cn(
          spaceGrotesk.variable,
          jetbrainsMono.variable,
          dmSans.variable,
          dmMono.variable,
          syne.variable,
          inter.variable,
          'bg-bg text-body font-sans'
        )}
      >
        {children}
      </body>
    </html>
  );
}

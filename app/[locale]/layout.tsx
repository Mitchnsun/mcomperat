import { DM_Mono, DM_Sans, Inter, JetBrains_Mono, Space_Grotesk, Syne } from 'next/font/google';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import React from 'react';

import { type Locale, routing } from '@/i18n/routing';

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

// Runs before React hydration to apply the stored theme and avoid a flash.
const NO_FLASH_SCRIPT = `(() => {
  try {
    var t = localStorage.getItem('cv-theme');
    if (t !== 'dark' && t !== 'clean' && t !== 'bold') t = 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch (_) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  const fontClasses = [
    spaceGrotesk.variable,
    jetbrainsMono.variable,
    dmSans.variable,
    dmMono.variable,
    syne.variable,
    inter.variable,
  ].join(' ');

  return (
    <html lang={locale} data-theme="dark" className={fontClasses}>
      <head>
        <Script id="cv-theme-init" strategy="beforeInteractive">
          {NO_FLASH_SCRIPT}
        </Script>
      </head>
      <body className="bg-bg text-text font-sans">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

'use client';

import { useLocale } from 'next-intl';
import React, { useTransition } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';
import { type Locale, routing } from '@/i18n/routing';
import { cn } from '@/lib/cn';

const LangToggle: React.FC<{ className?: string }> = ({ className }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      role="radiogroup"
      aria-label="Langue / Language"
      className={cn('border-border inline-flex items-center gap-1 rounded-full border p-1', className)}
    >
      {routing.locales.map((value) => {
        const isActive = locale === value;
        const label = value.toUpperCase();
        const fullLabel = value === 'fr' ? 'Français' : 'English';
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={fullLabel}
            disabled={isPending}
            onClick={() => switchLocale(value)}
            className={cn(
              'inline-flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-full px-3 text-xs font-semibold',
              'focus-visible:ring-accent focus:outline-none focus-visible:ring-2',
              { 'bg-accent text-white': isActive, 'text-body-muted hover:bg-card-hover hover:text-body': !isActive }
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default LangToggle;

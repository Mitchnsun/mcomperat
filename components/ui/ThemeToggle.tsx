'use client';

import React from 'react';

import { type Theme, useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/cn';

type ThemeOption = {
  value: Theme;
  label: string;
  icon: React.ReactNode;
};

// Moon (Dark / Nuit)
const MoonIcon: React.FC = () => (
  <svg
    aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// Sun (Clean / Soleil)
const SunIcon: React.FC = () => (
  <svg
    aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

// Palm tree (Bold / Palmier)
const PalmIcon: React.FC = () => (
  <svg
    aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22V10" />
    <path d="M12 10c0-3 2-5 5-6-2-1-5-1-7 1-1-2-4-3-7-2 3 1 5 3 5 6" />
    <path d="M12 10c2-2 5-3 8-2-2 2-5 3-8 2z" />
    <path d="M12 10c-2-2-5-3-8-2 2 2 5 3 8 2z" />
    <path d="M10 22c0-2 1-3 2-3s2 1 2 3" />
  </svg>
);

const OPTIONS: ThemeOption[] = [
  { value: 'dark', label: 'Dark / Nuit', icon: <MoonIcon /> },
  { value: 'clean', label: 'Clean / Soleil', icon: <SunIcon /> },
  { value: 'bold', label: 'Bold / Palmier', icon: <PalmIcon /> },
];

const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn('border-border inline-flex items-center gap-1 rounded-full border p-1 backdrop-blur', className)}
    >
      {OPTIONS.map((opt) => {
        const isActive = theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            data-testid={`theme-btn-${opt.value}`}
            role="radio"
            aria-checked={isActive}
            aria-label={opt.label}
            title={opt.label}
            onClick={() => setTheme(opt.value)}
            className={cn(
              'inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full',
              'focus-visible:ring-accent focus:outline-none focus-visible:ring-2',
              { 'bg-accent text-white': isActive, 'text-body-muted hover:bg-card-hover hover:text-body': !isActive }
            )}
          >
            {opt.icon}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;

'use client';

import React from 'react';

import { cn } from '@/lib/cn';
import { type Person } from '@/types';

interface SidebarIdentityProps {
  person: Person;
  className?: string;
}

// Identity block (monogram + name + title) shared between the sidebar and the
// mobile top bar so it stays visible even when the drawer is closed.
const SidebarIdentity: React.FC<SidebarIdentityProps> = ({ person, className }) => {
  const letterM = person.firstname?.[0]?.toUpperCase() ?? '';
  const letterC = person.lastname?.[0]?.toUpperCase() ?? '';
  const monogram = `${letterM}${letterC}`;

  return (
    <>
      <header className={cn('flex items-center gap-3', className)}>
        <span
          aria-label={monogram}
          className={cn(
            'border-body-muted text-body-muted shadow-body-muted/50',
            'flex h-11 w-11 shrink-0 items-center justify-center gap-0 rounded-lg border text-sm font-bold shadow',
            '[transition:color_300ms_ease,border-color_300ms_ease,box-shadow_250ms_ease]',
            'motion-safe:animate-[mono-dark-breathe_3.4s_ease-in-out_infinite]'
          )}
        >
          <span aria-hidden="true">{letterM}</span>
          <span aria-hidden="true">{letterC}</span>
        </span>
        <span className="leading-tight">
          <span className="text-heading block text-base font-bold">
            {person.firstname} {person.lastname}
          </span>
        </span>
      </header>
      <p className="text-body-muted block text-xs leading-tight">{person.title}</p>
    </>
  );
};

export default SidebarIdentity;

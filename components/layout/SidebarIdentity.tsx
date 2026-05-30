'use client';

import React from 'react';

import { type Person } from '@/types';

interface SidebarIdentityProps {
  person: Person;
  className?: string;
}

// Identity block (monogram + name + title) shared between the sidebar and the
// mobile top bar so it stays visible even when the drawer is closed.
const SidebarIdentity: React.FC<SidebarIdentityProps> = ({ person, className }) => {
  const monogram = `${person.firstname?.[0] ?? ''}${person.lastname?.[0] ?? ''}`.toUpperCase();

  return (
    <header className={['flex items-center gap-3', className ?? ''].filter(Boolean).join(' ')}>
      <span
        aria-hidden="true"
        className="bg-accent flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
      >
        {monogram}
      </span>
      <span className="leading-tight">
        <span className="text-heading block text-base font-bold">
          {person.firstname} {person.lastname}
        </span>
        <span className="text-body-muted block text-xs">{person.title}</span>
      </span>
    </header>
  );
};

export default SidebarIdentity;

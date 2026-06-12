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
  const monogram = `${person.firstname?.[0]?.toUpperCase() ?? ''}${person.lastname?.[0]?.toUpperCase() ?? ''}`;

  return (
    <>
      <header className={cn('flex items-center gap-3', className)}>
        <span
          aria-label={monogram}
          className="sidebar-monogram border-body-muted text-body-muted shadow-body-muted/50 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border text-sm font-bold shadow"
        >
          {monogram}
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

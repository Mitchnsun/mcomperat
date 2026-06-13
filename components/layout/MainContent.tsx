'use client';

import React from 'react';

import { cn } from '@/lib/cn';

interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}

// Scrollable main region. Exposes its underlying <main> element via a ref so
// the layout can drive scroll-tracking and smooth-scroll navigation.
const MainContent = React.forwardRef<HTMLElement, MainContentProps>(({ children, className }, ref) => (
  <main ref={ref} className={cn('h-screen flex-1 overflow-y-auto print:h-auto print:overflow-visible', className)}>
    {children}
  </main>
));

MainContent.displayName = 'MainContent';

export default MainContent;

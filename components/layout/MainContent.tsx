'use client';

import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}

// Scrollable main region. Exposes its underlying <main> element via a ref so
// the layout can drive scroll-tracking and smooth-scroll navigation.
const MainContent = React.forwardRef<HTMLElement, MainContentProps>(({ children, className }, ref) => (
  <main
    ref={ref}
    className={['cv-main flex-1 overflow-y-auto print:h-auto print:overflow-visible', 'h-screen', className ?? '']
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </main>
));

MainContent.displayName = 'MainContent';

export default MainContent;

import './globals.css';

import React from 'react';

// Root layout is required for `not-found.tsx` at the root level.
// HTML structure and locale context are provided by `app/[locale]/layout.tsx`.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

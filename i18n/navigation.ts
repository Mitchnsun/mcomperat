import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

// Locale-aware navigation helpers. Used by the language switcher to change the
// active locale while preserving the current pathname.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

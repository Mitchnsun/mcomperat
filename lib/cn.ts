import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge class names with clsx (conditional logic, falsy filtering) and
// tailwind-merge (resolves conflicting Tailwind utilities, last one wins).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

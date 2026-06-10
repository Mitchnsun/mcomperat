'use client';

import { createContext, useContext } from 'react';

// Shares the currently scroll-active experience id from the Layout down to the
// experience cards so they can render their active-state border.
const ActiveExperienceContext = createContext<string>('');

export const ActiveExperienceProvider = ActiveExperienceContext.Provider;

export function useActiveExperience(): string {
  return useContext(ActiveExperienceContext);
}

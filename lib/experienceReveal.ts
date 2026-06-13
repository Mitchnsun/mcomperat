'use client';

// Module-level bridge that lets Layout's sidebar click handler reveal an
// experience card that is currently hidden by either the tag filter or the
// "show more" overflow mechanism — both causing scrollToTarget to fail because
// getBoundingClientRect() returns zero for elements with display:none.
//
// Safe for client-side use: only one instance of this page runs in the browser.

// ── Filter state (registered by ResumeBody) ──────────────────────────────────

let _filteredOutIds: Set<string> = new Set();
let _clearFilters: () => void = () => {};

// ── Show-more overflow state (registered by ExperiencesSection) ──────────────

// Returns true when the card for `id` is hidden by the overflow clamp (display:none).
let _isOverflowHidden: (id: string) => boolean = () => false;
// Expand the list, i.e. call setShowAll(true).
let _revealOverflow: () => void = () => {};

// ── Public API ────────────────────────────────────────────────────────────────

export const experienceReveal = {
  // Called by ResumeBody on mount and whenever activeFilters changes.
  setFilteredOutIds: (ids: Set<string>) => {
    _filteredOutIds = ids;
  },
  // Called by ResumeBody on mount with a plain setActiveFilters([]) (no view-transition)
  // so Layout can drive it synchronously inside flushSync.
  setClearFilters: (fn: () => void) => {
    _clearFilters = fn;
  },
  // Called by ExperiencesSection whenever showAll or the experiences list changes.
  setOverflowState: (isHidden: (id: string) => boolean, reveal: () => void) => {
    _isOverflowHidden = isHidden;
    _revealOverflow = reveal;
  },
  // Called by Layout inside flushSync before scrollToTarget. Reveals the card
  // by clearing the filter and/or expanding the list as needed.
  reveal: (id: string) => {
    if (_filteredOutIds.has(id)) _clearFilters();
    if (_isOverflowHidden(id)) _revealOverflow();
  },
};

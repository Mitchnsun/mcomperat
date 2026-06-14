import '@testing-library/jest-dom';

if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
}

if (!globalThis.CSS) {
  Object.defineProperty(globalThis, 'CSS', {
    value: { escape: (value: string) => value } as unknown as typeof CSS,
    writable: true,
  });
} else if (!globalThis.CSS.escape) {
  Object.defineProperty(globalThis.CSS, 'escape', {
    value: (value: string) => value,
    writable: true,
  });
}

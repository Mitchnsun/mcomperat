import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
}

// Shared section heading used across the resume sections.
const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <h2 className="border-heading text-heading/80 mb-4 border-b pb-2 text-2xl font-medium tracking-widest uppercase print:mb-2 print:py-1 print:text-lg">
    {children}
  </h2>
);

export default SectionTitle;

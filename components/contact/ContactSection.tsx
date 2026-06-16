import React from 'react';

import GithubLogo from '@/components/assets/icons/github-logo';
import LinkedinLogo from '@/components/assets/icons/linkedin-logo';
import SectionTitle from '@/components/ui/SectionTitle';
import { pick } from '@/lib/localize';
import { type Lang, type Person } from '@/types';

interface ContactSectionProps {
  title: string;
  person: Person;
  lang: Lang;
  labels: { email: string; linkedin: string; github: string };
}

const linkClass =
  'border-border hover:border-accent focus-visible:ring-accent flex items-center gap-3 border-l-2 p-4 transition-colors focus:outline-none focus-visible:ring-2';

const ContactSection: React.FC<ContactSectionProps> = ({ title, person, lang, labels }) => (
  <section id="contact" className="scroll-mt-28 pb-4 print:pb-0">
    <SectionTitle>{title}</SectionTitle>

    <div className="grid gap-4 sm:grid-cols-3">
      <a href={`mailto:${person.email}`} className={linkClass}>
        <span aria-hidden="true" className="text-accent text-xl">
          @
        </span>
        <span className="min-w-0">
          <span className="text-body-muted block text-xs uppercase">{labels.email}</span>
          <span className="text-body block truncate text-sm">{person.email}</span>
        </span>
      </a>

      {person.link?.linkedin ? (
        <a href={pick(person.link.linkedin, lang)} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <span aria-hidden="true" className="text-accent">
            <LinkedinLogo />
          </span>
          <span className="min-w-0">
            <span className="text-body-muted block text-xs uppercase">{labels.linkedin}</span>
            <span className="text-body block truncate text-sm">
              {pick(person.link.linkedin, lang).replace(/^https?:\/\//, '')}
            </span>
          </span>
        </a>
      ) : null}

      {person.link?.github ? (
        <a href={person.link.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <span aria-hidden="true" className="text-accent">
            <GithubLogo />
          </span>
          <span className="min-w-0">
            <span className="text-body-muted block text-xs uppercase">{labels.github}</span>
            <span className="text-body block truncate text-sm">{person.link.github.replace(/^https?:\/\//, '')}</span>
          </span>
        </a>
      ) : null}
    </div>
  </section>
);

export default ContactSection;

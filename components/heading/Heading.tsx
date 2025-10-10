import Image from 'next/image';
import React from 'react';

import GithubLogo from '@/components/assets/icons/github-logo';
import { Card } from '@/components/card';
import { HeadingProps } from '@/types';

const Heading: React.FC<HeadingProps> = ({ person }) => (
  <header className="my-4 text-center lg:mx-6 lg:my-20 lg:text-right print:mx-auto print:my-2">
    <Card {...person} />
    <div className="mt-5 hidden items-center justify-end gap-4 lg:flex">
      {person.link?.github ? (
        <a
          id="Github"
          href={person.link.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${person.firstname ?? ''} ${person.lastname ?? ''}'s GitHub profile`}
        >
          <GithubLogo />
        </a>
      ) : null}
      {person.link?.linkedin ? (
        <a href={person.link.linkedin} target="_blank" rel="noopener noreferrer">
          <Image
            src="/LinkedInSquare.png"
            alt={`View ${person.firstname ?? ''} ${person.lastname ?? ''}'s profile on LinkedIn`}
            width={32}
            height={32}
          />
        </a>
      ) : null}
    </div>
  </header>
);

export default Heading;

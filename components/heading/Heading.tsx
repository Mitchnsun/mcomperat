import Image from 'next/image';
import React from 'react';

import { HeadingProps } from '../../types';
import GithubLogo from '../assets/icons/github-logo';
import Card from '../card/Card';

const Heading: React.FC<HeadingProps> = ({ person }) => (
  <>
    <header>
      <Card {...person} />
      <div>
        {person.link?.github ? (
          <a id="Github" href={person.link.github} target="_blank" rel="noopener noreferrer">
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
    <style jsx>
      {`
        header {
          margin: 20% 1.5em 0;
          text-align: right;
        }
        div {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin: 5% 0 0;
          text-align: right;
        }
        a {
          margin-left: 1rem;
        }

        @media (max-width: 830px) {
          header {
            text-align: center;
            top: auto;
            margin: 1em auto;
            position: static;
          }
          div {
            display: none;
          }
        }

        @media print {
          header {
            margin: 0.5em auto 0;
          }
        }
      `}
    </style>
  </>
);

export default Heading;

import React from 'react';
import Image from 'next/image';
import Card from '../card/Card';
import GithubLogo from '../../assets/icons/github-logo';

interface Person {
  firstname: string;
  lastname: string;
  title: string;
  birthday: string;
  email: string;
  link: {
    github: string;
    linkedin: string;
  };
}

const Heading = ({ person }: { person: Person }) => (
  <nav className="relative w-full text-center text-secondary bg-primary m-0 lg:fixed lg:top-0 lg:bottom-0 lg:w-[30%] lg:left-0 lg:text-right">
    <header className="py-4 lg:pt-[20%] lg:pb-0 lg:px-6">
      <Card {...person} />
      <div className="hidden justify-end items-center text-right lg:flex" style={{ margin: "5% 0 0" }}>
        {person.link?.github ? (
          <a id="Github" className="ml-4" href={person.link.github} target="_blank" rel="noopener noreferrer">
            <GithubLogo />
          </a>
        ) : null}
        {person.link?.linkedin ? (
          <a className="ml-4" href={person.link.linkedin} target="_blank" rel="noopener noreferrer">
            <Image src="/LinkedInSquare.png" alt={`View ${person.firstname} ${person.lastname}'s profile on LinkedIn`} width="44" height="44" />
          </a>
        ) : null}
      </div>
    </header>
  </nav>
);

export default Heading;

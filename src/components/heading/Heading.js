import React from 'react';
import PropTypes from 'prop-types';
import GithubLogo from '../../assets/icons/github-logo';
import LinkedInLogo from '../../assets/icons/LinkedInSquare.png';
import './Heading.css';

const propTypes = {
  person: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    title: PropTypes.string,
    birthday: PropTypes.string,
    email: PropTypes.string,
    link: PropTypes.shape({
      bitbucket: PropTypes.string,
      linkedin: PropTypes.string,
    }),
  }),
};

export default function Heading({ person }) {
  return (
    <header className="App-header">
      <hgroup>
        <h1 className="App-title">
          {person.firstname} {person.lastname}
        </h1>
        <h2 className="App-tagline">{person.title}</h2>
      </hgroup>
      <div className="sidebar-details">
        <p>{person.birthday}</p>
        <p>{person.email}</p>
      </div>
      <div className="social-container">
        {person.link.github ? (
          <a id="Github" href={person.link.github} target="_blank" rel="noopener noreferrer">
            <GithubLogo />
          </a>
        ) : null}
        {person.link.linkedin ? (
          <a href={person.link.linkedin} target="_blank" rel="noopener noreferrer">
            <img src={LinkedInLogo} alt={`View ${person.firstname} ${person.lastname}'s profile on LinkedIn`} />
          </a>
        ) : null}
      </div>
    </header>
  );
}

Heading.propTypes = propTypes;
Heading.defaultProps = { person: {} };

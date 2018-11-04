import React from 'react';
import PropTypes from 'prop-types';
import LinkedInLogo from '../../assets/img/LinkedInSquare.png';
import './Heading.css';

const propTypes = {
  person: {
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    title: PropTypes.string,
    birthday: PropTypes.string,
    email: PropTypes.string,
    link: {
      bitbucket: PropTypes.string,
      linkedin: PropTypes.string,
    },
  },
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
        {person.link.bitbucket ? (
          <a id="Bitbucket" href={person.link.bitbucket} target="_blank" rel="noopener noreferrer">
            <img
              src="data:image/png;base64,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"
              alt={`View ${person.firstname} ${person.lastname}'s Bitbucket Profile`}
            />
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

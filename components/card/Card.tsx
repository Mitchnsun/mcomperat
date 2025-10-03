'use client';

import React from 'react';

import { CardProps } from '../../types';

const Card: React.FC<CardProps> = ({ firstname, lastname, title, email }) => (
  <>
    <hgroup>
      <h1>
        {firstname} {lastname}
      </h1>
      <h2>{title}</h2>
    </hgroup>
    <div>
      <p>{email}</p>
    </div>
    <style jsx>
      {`
        h1 {
          font-size: 2em;
          margin: 0;
          text-transform: uppercase;
        }
        h2 {
          margin: 0;
          font-weight: 300;
          color: #8e8ed6;
        }
        div {
          margin: 5% 0 0;
          text-align: right;
        }

        @media (max-width: 830px) {
          div {
            text-align: center;
            top: auto;
            margin: 1em auto;
            position: static;
          }
        }

        @media print {
          h1 {
            font-size: 1.5em;
          }
          div {
            margin: 0.5em auto;
          }
        }
      `}
    </style>
  </>
);

export default Card;

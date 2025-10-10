import React from 'react';

import { CardProps } from '@/types';

const Card: React.FC<CardProps> = ({ firstname, lastname, title, email }) => (
  <>
    <hgroup>
      <h1 className="text-4xl font-bold uppercase print:text-2xl">
        {firstname} {lastname}
      </h1>
      <h2 className="text-brand text-2xl">{title}</h2>
    </hgroup>
    <p className="my-4">{email}</p>
  </>
);

export default Card;

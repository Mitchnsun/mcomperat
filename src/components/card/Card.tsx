import React from 'react';

interface CardProps {
  firstname: string;
  lastname: string;
  title: string;
  birthday: string;
  email: string;
}

const Card = ({ firstname, lastname, title, birthday, email }: CardProps) => (
  <>
    <hgroup>
      <h1 className="text-3xl text-white font-bold m-0 uppercase">
        {firstname} {lastname}
      </h1>
      <h2 className="text-2xl m-0 font-light">{title}</h2>
    </hgroup>
    <div className="my-auto mx-0 lg:m-0 lg:mt-[5%]">
      <p>{birthday}</p>
      <p>{email}</p>
    </div>
  </>
);

export default Card;

import React from 'react';

export default function PostExtra(props) {
  return (
    <section className={`Post ${props.print} compact`}>
      <header className="Post-header">
        <h2 className="Post-title">{props.title}</h2>
      </header>

      <div className="Post-description">
        {props.text}
        <ul>
          {props.list.map( (text, i) => { return <li key={`ExtraText${i}`}>{text}</li>})}
        </ul>
      </div>
    </section>
  );
}

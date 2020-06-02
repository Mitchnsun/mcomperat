import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function PostExtra({ print, title, text, list }) {
  return (
    <section className={`Post ${print} compact`}>
      <header className="Post-header">
        <h2 className="Post-title">{title}</h2>
      </header>

      <div className="Post-description">
        {text}
        <ul>
          {list.map((item) => (
            <li key={uuidv4()}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

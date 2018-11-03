import React from 'react';

export default function PostExtra({
  print, title, text, list,
}) {
  return (
    <section className={`Post ${print} compact`}>
      <header className="Post-header">
        <h2 className="Post-title">{title}</h2>
      </header>

      <div className="Post-description">
        {text}
        <ul>
          {list.map(item => <li key={item.toString()}>{item}</li>)}
        </ul>
      </div>
    </section>
  );
}

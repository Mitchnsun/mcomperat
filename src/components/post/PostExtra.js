import React from 'react';

export default function PostExtra(props) {
  return (
    <section class="Post">
      <header class="Post-header">
        <h2 class="Post-title">{props.title}</h2>
      </header>

      <div class="Post-description">
        {props.text}
        <ul>
          {props.list.map( text => { return <li>{text}</li>})}
        </ul>
      </div>
    </section>
  );
}

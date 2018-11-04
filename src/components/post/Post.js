import React from 'react';
import Tag from '../tag/Tag';

export default function Post({ title, company, city, country, context, start, end, tags, description }) {
  return (
    <section className="Post">
      <header className="Post-header">
        <h3 className="Post-title">{title}</h3>
        <p className="Post-meta">
          {company}, {city}, {country} {context ? ` - ${context}` : ''}
        </p>
        <p className="Post-meta Post-meta--era">
          {start} - {end}
        </p>
        <p className="Post-meta Post-meta--tags">
          {tags ? tags.map(tag => <Tag tag={tag.ref} name={tag.name} key={tag.toString()} />) : null}
        </p>
      </header>

      <div className="Post-description">
        {description.map(item => (
          <div key={item.toString()}>
            {item.text}
            {item.list ? (
              <ul>
                {item.list.map(text => (
                  <li key={text.toString()}>{text}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

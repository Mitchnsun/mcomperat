import React from 'react';
import Tag from '../tag/Tag';

export default function Post(props) {
  return (
    <section className="Post">
      <header className="Post-header">
        <h3 className="Post-title">{props.title}</h3>
        <p className="Post-meta">
          {props.company}, {props.city}, {props.country} {props.context ? ` - ${props.context}`: ''}
        </p>
        <p className="Post-meta Post-meta--era">
          {props.start} - {props.end}
        </p>
        <p className="Post-meta Post-meta--tags">
          {props.tags ?
            props.tags.map( (tag, i) => {
              return <Tag tag={tag.ref} name={tag.name} key={`Tag${i}`} />;
            })
            : null
          }
        </p>
      </header>

      <div className="Post-description">
        {props.description.map( (item, i) => {
          return (
            <div key={`PostDescription${i}`}>
              {item.text}
              {item.list ?
                <ul>
                  {item.list.map( (text, ind) => {
                    return <li key={`DescriptionText${ind}`}>{text}</li>;
                  })}
                </ul>
                : null
              }
            </div>
          );
        })}
      </div>
    </section>
  );
}

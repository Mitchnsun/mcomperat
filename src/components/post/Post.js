import React from 'react';
import Tag from '../tag/Tag';

export default function Post(props) {
  console.log(props);
  return (
    <section className="Post">
      <header className="Post-header">
        <h3 className="Post-title">{props.title}</h3>
        <p className="Post-meta">
          {props.company}, {props.city}, {props.country} {props.context ? ` - ${props.context}`: ''}
        </p>
        <p className="Post-meta era">
          {props.start} - {props.end}
        </p>
        <p className="Post-meta">
          {props.tags ?
            props.tags.map( tag => {
              return <Tag tag={tag.ref} name={tag.name} />;
            })
            : null
          }
        </p>
      </header>

      <div className="Post-description">
        {props.description.map( item => {
          return (
            <p>
              {item.text}
              {item.list ?
                <ul>
                  {item.list.map( text => {
                    return <li>{text}</li>;
                  })}
                </ul>
                : null
              }
            </p>
          );
        })}
      </div>
    </section>
  );
}

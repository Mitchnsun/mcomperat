import React from 'react';
import Post from './Post';
import './Post.css';

export default function PostList({ title, list }) {
  return (
    <div className="Posts">
      <h2 className="Posts-header">{title}</h2>
      {list.map( (post, i) => {return <Post key={`PostList${i}`} {...post} />;})}
    </div>
  );
}

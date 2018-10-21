import React from 'react';
import Post from '../post/Post';

export default function PostList({ title, list }) {
  return (
    <div className="Posts">
      <h2>{title}</h2>
      {list.map( post => {return <Post {...post} />;})}
    </div>
  );
}

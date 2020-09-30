import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Post from './Post';
import './Post.css';

const PostList = ({ title, list }) => (
  <div className="Posts">
    <h2 className="Posts-header">{title}</h2>
    {list.map((post) => (
      <Post {...post} key={uuidv4()} />
    ))}
  </div>
);

export default PostList;

import React, { Component } from 'react';

import Heading from './components/heading/Heading';
import PostList from './components/post-list/PostList';
import PostExtra from './components/post-extra/PostExtra';
import data from './assets/data/fr/data.json';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-sidebar">
          <Heading person={data.person} />
        </div>
        <div className="App-container">
          <PostList
            title={data.work.title}
            list={data.work.experiences}
          />
          <PostList
            title={data.education.title}
            list={data.education.schools}
          />
          <div className="posts">
            <h2 className="content-subhead">{data.extra.title}</h2>
            {data.extra.items.map( item => {
              return <PostExtra {...item} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

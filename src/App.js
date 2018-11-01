import React, { Component } from 'react';

import Heading from './components/heading/Heading';
import PostList from './components/post/PostList';
import PostExtra from './components/post/PostExtra';
import dataFR from './assets/data/fr/data.json';
import dataEN from './assets/data/en/data.json';
import logo from './logo.svg';
import './App.css';

const SUPPORTED_LANG = ['fr-FR', 'en-US'];
const DATAS = {
  'fr-FR': dataFR,
  'en-US': dataEN
};

class App extends Component {
  getData() {
    const navigatorLang = window.location.hash.replace('#','') || navigator.language || navigator.userLanguage;
    const lang = SUPPORTED_LANG.indexOf(navigatorLang) === -1 ? 'fr-FR' : navigatorLang;
    return DATAS[lang];
  }

  render() {
    const data = this.getData();

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
          <div className="Posts">
            <h2 className="Posts-header">{data.extra.title}</h2>
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

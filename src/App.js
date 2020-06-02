import React, { PureComponent } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Heading from './components/heading/Heading';
import PostList from './components/post/PostList';
import PostExtra from './components/post/PostExtra';
import dataFR from './assets/data/fr/data.json';
import dataEN from './assets/data/en/data.json';
import './App.css';
import './print.css';

const SUPPORTED_LANG = ['fr-FR', 'en-US'];
const DATAS = {
  'fr-FR': dataFR,
  'en-US': dataEN,
};

class App extends PureComponent {
  getData() {
    this.navigatorLang = window.location.hash.replace('#', '') || navigator.language || navigator.userLanguage;
    const lang = SUPPORTED_LANG.indexOf(this.navigatorLang) === -1 ? 'fr-FR' : this.navigatorLang;
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
          <PostList title={data.work.title} list={data.work.experiences} />
          <PostList title={data.education.title} list={data.education.schools} />
          <div className="Posts">
            <h2 className="Posts-header">{data.extra.title}</h2>
            {data.extra.items.map((item) => (
              <PostExtra {...item} key={uuidv4()} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

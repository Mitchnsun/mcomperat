import React, { Component } from 'react';

import Heading from './components/heading/Heading';
import data from './assets/data/fr/data.json';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Heading person={data.person}/>
        <p className="App-container">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

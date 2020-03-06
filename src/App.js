import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import TvShowDetails from './TvShowDetails';

class App extends Component {
  render() {

    return (
      <div className="App">
          <TvShowDetails />
      </div>
    )
  }
}


export default App;

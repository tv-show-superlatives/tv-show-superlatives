import React, { Component } from 'react';
import './App.css';

import firebase from './firebase';
import TvShowDetails from './TvShowDetails';
import GeneralSearch from './GeneralSearch';


class App extends Component {
  render() {

    return (
      <div className="App">

          <TvShowDetails />
        <GeneralSearch />
      </div>
    )
  }
}


export default App;

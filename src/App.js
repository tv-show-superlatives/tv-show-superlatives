import React, { Component } from 'react';
import './App.css';
import GeneralSearch from './GeneralSearch';
import firebase from './firebase'

class App extends Component {
  render() {

    return (
      <div className="App">
        <GeneralSearch />
      </div>
    )
  }
}


export default App;

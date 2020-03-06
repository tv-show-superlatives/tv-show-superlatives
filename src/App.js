import React, { Component } from 'react';
import './App.css';
import GeneralSearch from './GeneralSearch';
import firebase from './firebase'

class App extends Component {
  constructor() {
    super();
    this.state = {
      tvShows: []
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      console.log(response.val())
    })
  }

  render() {

    return (
      <div className="App">
        <ul>
          {this.state.tvShows.map(tvShow => {
            return <li>{tvShow}</li>
          })}
        </ul>
        <GeneralSearch />
      </div>
    )
  }
}


export default App;

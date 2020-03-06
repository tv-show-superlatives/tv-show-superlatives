import React, { Component } from 'react';
import './App.css';
import GeneralSearch from './GeneralSearch';
import firebase from './firebase'

class App extends Component {
  constructor() {
    super();
    this.state = {
      tvShows: {}
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', response => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push(data[key])
        this.setState({
          tvShows: newState[0]
        })
      }
    })
  }

  render() {

    return (
      <div className="App">
        <ul>
          {/* {this.state.tvShows.map(tvShow => {
            return <li>{tvShow}</li>
          })} */}
        </ul>
        <GeneralSearch />
      </div>
    )
  }
}


export default App;

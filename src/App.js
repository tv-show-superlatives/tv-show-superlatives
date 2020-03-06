import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import StoreState from './StoreState';

class App extends Component {
  constructor(){
    super();

    this.state={
      favShows:[],
      userInput:''
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      const newState = [];
      const data = response.val();

      for(let key in data){
        newState.push(data[key])
      }
      this.setState({
        favShows:newState
      })
    })
  }
  render() {

    return (
      <div className="App">
        <StoreState />
      </div>
    )
  }
}


export default App;

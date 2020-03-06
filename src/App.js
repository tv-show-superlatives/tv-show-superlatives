import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import TvShowDetails from './TvShowDetails';
import GeneralSearch from './GeneralSearch';
import StoreState from './StoreState';

class App extends Component {
  constructor(){
    super();

    this.state={
      tvShows:[],
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
        tvShows:newState
      })
      console.log(response.val())
    })
  }
  render() {

    return (
      <div className="App">
        <TvShowDetails />
        <StoreState />
        <GeneralSearch />
      </div>
    )
  }
}


export default App;

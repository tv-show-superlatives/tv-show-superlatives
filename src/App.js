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
    console.log(dbRef)

    dbRef.on('value', (response) => {
      const newState = [];
      const data = response.val();

      for(let key in data){
        newState.push(data[key])
        
      }
      this.setState({
        tvShows:newState,
        userInput:''
      })
      
    })
  }
  render() {

    return (
      <div className="App">
        <StoreState />
        <TvShowDetails />
        <GeneralSearch />
      </div>
    )
  }
}


export default App;

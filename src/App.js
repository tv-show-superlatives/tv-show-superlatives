import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import StoreState from './StoreState';
import GeneralSearch from './GeneralSearch';

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
        <ul>
          {this.state.tvShows.map(tvShow => {
            return<li>{tvShow}</li>
          })}
        </ul>
        <StoreState />
        <GeneralSearch />
      </div>
    )
  }
}


export default App;

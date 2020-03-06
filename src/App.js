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
    dbRef.on('value', response => {
      const newState = [];
      const data = response.val();



      for (let key in data) {
        const shows = {
          key: key,
          ...data[key]
        };

        newState.push(shows)
        this.setState({
          tvShows: newState[0]
        })
      }
      console.log(this.state.tvShows)
    })
  }

  render() {

    return (
      <div className="App">
        <ul>
          {
            // this.state.tvShows.map(tvShow => {
            //   return <li>{tvShow}</li>
            // })
          }
        </ul>
        {/* <GeneralSearch /> */}
      </div>
    )
  }
}


export default App;

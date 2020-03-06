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

        newState.push(data[key])
        this.setState({
          tvShows: newState
        })
      }
    })
  }

  dummyData = () => {
    const dummyData = {
      owner: 'celeste',
      name: 'weekend soon thank god',
      shows: [
        {
          name: 'the best show',
          id: 10,
        },
        {
          name: 'a lesser show',
          id: 24,
        }
      ]
    };

    const dbRef = firebase.database().ref();
    dbRef.push(dummyData);
  }

  render() {
    return (
      <div className="App">
        <h1>test</h1>
        {/* <StoreState />
        <TvShowDetails />
      <GeneralSearch /> */}

      <button onClick={this.dummyData}>click for dummy data</button>

        {/* <ul>
          
            {this.state.tvShows.map(tvShow => {
              console.log(tvShow)
            })}
          
        </ul> */}
        {/* <GeneralSearch /> */}
      </div>
    )
  }
}


export default App;

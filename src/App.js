import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import TvShowDetails from './TvShowDetails';
import GeneralSearch from './GeneralSearch';
import StoreState from './StoreState';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

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
      <Router>
        <div className="App">
          <h1>Welcome</h1>
          <Link to="/" exact>Home</Link>
          <Link to="/GeneralSearch/">General Search</Link>
          <Route path="/GeneralSearch/" component={GeneralSearch}/>
          <Link to="/StoreState/">Store State</Link>
          <Route path="/StoreState/" component={StoreState}/>
          <Link to="/TvShowDetails/">TV Show Details</Link>
          <Route path="/TvShowDetails/" component={TvShowDetails}/>


          </div>
        </Router>
    )
  }
}


export default App;

import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import TvShowDetails from './TvShowDetails';
import GeneralSearch from './GeneralSearch';
import StoreState from './StoreState';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import AddListToFirebase from './AddListToFirebase'


class App extends Component {
  constructor(){
    super();

    this.state={
      tvShows:[],
      userInput:'',
      list: [],
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', response => {
      const newState = [];
      const newList = [];
      const data = response.val();


      for (let key in data) {
        const listInfo = data[key]
        const keys = key
        const listArray = data[key]
        newState.push(listInfo)
        newList.push(keys)
        console.log(data.key)
        this.setState({
          tvShows: newState,
          list: newList
        })
      }
    })
  }

  dummyData = () => {
    const dummyData = {
      owner: 'celeste',
      name: 'woohoo lists!!',
      shows: [
        {
          name: 'the best show',
          id: 10,
        },
        {
          name: 'a lesser show',
          id: 24,
        },
        {
          name: 'a different show',
          id: 135,
        }
      ]
    };

    
    const dbRef = firebase.database().ref();
    dbRef.push(dummyData);
  };
  
  addTvShow = () => {
    const addTvShow = {
      shows: [
        {
          name: 'a new show?',
          id: 302
        }
      ]
    };


    const dbRef = firebase.database().ref();
    // console.log(dbRef.val)
    // dbRef.push(addTvShow)
  };

  render() {
    return (
      <Router>
        <div className="App">
          <h1>Welcome</h1>
          <Link to="/">Home</Link>
          <Link to="/GeneralSearch/">General Search</Link>
          <Route path="/GeneralSearch/" component={GeneralSearch}/>
          <Link to="/StoreState/">Store State</Link>
          <Route path="/StoreState/" component={StoreState}/>
          <Link to="/TvShowDetails/">TV Show Details</Link>
          <Route path="/tvShows/:tvShowsID" component={TvShowDetails}/>
          <Route path="/" exact 
            render={ () => 
            <AddListToFirebase 
              tvShows={this.state.tvShows} 
              list={this.state.list}
              dummyData={this.dummyData} 
              addTvShow={this.addTvShow}
            />
            }/>
          

        </div>
      </Router>


    )
  }
}


export default App;

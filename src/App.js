import React, { Component } from 'react';
import firebase from './firebase';
import TvShowDetails from './TvShowDetails';
import GeneralSearch from './GeneralSearch';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import AddListToFirebase from './AddListToFirebase'
import '../src/index.css'
import NewListPage from './NewListPage';
import Nav from './Nav';
import NewListFirebase from './NewListFirebase';


class App extends Component {
  constructor(){
    super();
    this.state={
      tvShows:[],
      userInput:'',
      list: [],
      page: 1,
      newListPage: '',
      newListPageObj: '',
      currentListObj: {}

    }
  }



  addNewList = (userInput) => {
    const newList = {
        owner: '',
        name: userInput,
        shows: []
    };

    const dbRef = firebase.database().ref();
    const listKey = dbRef.push(newList)
    console.log('list key')
    listKey.on('value', response => {
      this.setState({
        newListPageObj: response.val()
      })
    })
    console.log(listKey.key)
    this.setState({
      newListPage: listKey.key,
      currentListObj: newList,

    })
}


handleChange = (e) => {
    this.setState({userInput:e.target.value})
    // console.log(e.target.value)
    
}



handleFormSubmit = (e) => {
    e.preventDefault();
    const userInput = this.state.userInput
    this.addNewList(userInput)
};


  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on('value', response => {
      const newState = [];
      const newList = [];
      const data = response.val();


      for (let key in data) {
        const listInfo = {
          key: key,
          info: data[key]
        }
        const keys = key
        const listArray = data[key]
        newState.push(listInfo)
        newList.push(keys)
        this.setState({
          tvShows: newState,
          list: newList
        })
      }
    })
  }


  render() {
    return (
			<Router basename="/tv-show-superlatives/">
				<div className="App">
					<div className="wrapper">
						<Nav
							newListStateObj={this.state.newListPageObj}
							newListPage={this.state.newListPage}
							currentListObj={this.state.currentListObj}
						/>
						<Route path="/tvShows/:tvShowsID" component={TvShowDetails} />
						<Route path="newList/" component={NewListFirebase} />
						<Route
							path="/"
							exact
							render={() => (
								<AddListToFirebase
									handleFormSubmit={this.handleFormSubmit}
									handleClick={this.handleClick}
									handleChange={this.handleChange}
									userInput={this.userInput}
									tvShows={this.state.tvShows}
									list={this.state.list}
									newListPage={this.state.newListPage}
									addTvShow={this.addTvShow}
									addNewList={this.addNewList}
								/>
							)}
						/>
						<footer>
							<p> &copy; 2020 Team Celeste, Lucas, Michael, and Blair</p>
						</footer>
					</div>
				</div>
			</Router>
		);
  }
}

export default App;

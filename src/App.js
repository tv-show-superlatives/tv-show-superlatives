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
    }
  }

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
        // console.log(listInfo.key, listInfo)
        const keys = key
        const listArray = data[key]
        newState.push(listInfo)
        newList.push(keys)
        // console.log(data.key)
        this.setState({
          tvShows: newState,
          list: newList
        })
      }
    })
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ userInput: '' })
  }

  render() {
    return (
			<Router basename="/tv-show-superlatives/">
				<div className="App">
					<div className="wrapper">
						<Nav />
            <Route path="/tvShows/:tvShowsID" component={TvShowDetails} />
            <Route path="newList/" component={NewListFirebase} />
            {/* <Route path="newList/:listKey" component={} /> */}
            <Route
              path="/"
              exact
              render={() => (
                <AddListToFirebase
                  handleClick={this.handleClick}
                  tvShows={this.state.tvShows}
                  list={this.state.list}
                  // dummyData={this.dummyData}
                  addTvShow={this.addTvShow}
                  addNewList={this.addNewList}
                />
              )}
            />
					</div>
				</div>
			</Router>
		);
  }
}

export default App;

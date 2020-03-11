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
      newListPage: ''
    }
  }

  addNewList = (userInput) => {
    const newList = {
        owner: '',
        name: userInput,
        shows: [
            {
                name: 'none',
                key: 0,
            }
        ]
    };

    const dbRef = firebase.database().ref();
    const listKey = dbRef.push(newList)
    console.log(listKey.key)
    this.setState({
      newListPage: listKey.key
    })
}

// addListToFirebase = (props) =>{
    // console.log(this.state.userInput)
    //     return (
    //         props.tvShows,
    //         props.dummyData  //also tried props.dummy=this.props.dummyData  
    // )
// }


handleChange = (e) => {
    this.setState({userInput:e.target.value})
    // console.log(e.target.value)
    
}



handleFormSubmit = (e) => {
    e.preventDefault();
    // this.setState({
    //     userInput: fuck off
    //     // tvShows:[]
    // })
    // this.addListToFirebase(this.state.userInput)
    // console.log(this.handleFormSubmit, "hello")
    const userInput = this.state.userInput
    this.addNewList(userInput)
    // this.setState({ userInput: '' })
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

    
  // handleClick = (e) => {
  //   e.preventDefault();
  // }

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
                  handleFormSubmit={this.handleFormSubmit}
                  handleClick={this.handleClick}
                  handleChange={this.handleChange}
                  userInput={this.userInput}
                  tvShows={this.state.tvShows}
                  list={this.state.list}
                  newListPage={this.state.newListPage}
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

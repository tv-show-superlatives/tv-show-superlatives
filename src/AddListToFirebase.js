import React, { Component } from 'react';
import firebase from "./firebase";
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';


class AddListToFirebase extends Component {

  constructor(props){
    super(props);
    this.state={
      tvShows:[],
      userInput:'',
      marginLeft:0
    }
  }

    
    render() {

        const tvShows = this.props.tvShows;
        const tvShowsCopy = [...tvShows]
      
        return(
          <div>
            {
              <Switch>
                <div>
                    <form 
                    className="searchForm" action="submit" onSubmit={this.props.handleFormSubmit}>
                        <label htmlFor="showSearch">new list title: </label>
                        <input
                            className="searchBar"
                            type="text"
                            id="showSearch"
                            onChange={this.props.handleChange}
                            value={this.props.userInput}
                        
                        />
                        <button className="addAList" type="submit">
                          <i class="fas fa-plus"></i>
                        </button>

                        {this.props.newListPage ? <Redirect to={`/newListPage/${this.props.newListPage}`} /> : null}
                    </form>
                </div>
            </Switch>
            }
            {/* {
              tvShowsCopy.reverse().map(list => {
                return (
                  <ul key={list.key}>{list.info.name}

                  {
                    (list.info.shows !== undefined) &&
                      
                      list.info.shows.filter(show => show.name !== 'none').map((show, index) => {
                        return <li key={show.key}>
                          {show.name}
                          <button onClick={() => {
                            const listKey = list.key;
                            let showListCopy;
                            const dbRef = firebase.database().ref().child(listKey + '/shows/' + index + '/')
                            
                            
                            dbRef.on('value', response => {
                              // console.log(response.val())
                              const showList = list.info.shows;
                              showListCopy = [...showList];
                              showListCopy.splice(index, 1)
                            })
                            // console.log(showListCopy)

									{list.info.shows !== undefined &&
										list.info.shows
											.filter(show => show.name !== "none")
											.map((show, index) => {
												return (
													<li key={show.key}>
														{show.name}
														<button
															onClick={() => {
																const listKey = list.key;
																let showListCopy;
																const dbRef = firebase
																	.database()
																	.ref()
																	.child(listKey + "/shows/" + index + "/");

																dbRef.on("value", response => {
																	// console.log(response.val())
																	const showList = list.info.shows;
																	showListCopy = [...showList];
																	showListCopy.splice(index, 1);
																});
																// console.log(showListCopy)

																const otherDbRef = firebase
																	.database()
																	.ref()
																	.child(listKey + "/shows/");
																otherDbRef.set(showListCopy);
															}}
														>
															remove
														</button>
													</li>
												);
											})}

									<button
										onClick={() => {
											const key = list.key;
											const dataToPush = {
												key: 1235,
												name: "bhlegnl?"
											};
											let prevListCopy;
											const dbRef = firebase
												.database()
												.ref()
												.child(key + "/shows");

                    }}>add to list</button>
                </ul>
                )
              })
            } */}
					</div>
				);
    }
}

export default AddListToFirebase
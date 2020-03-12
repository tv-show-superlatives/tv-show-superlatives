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
                            placeholder="Name your list!"
                        />
                        <button className="addAList" type="submit">
                          <i class="fas fa-plus"></i>
                        </button>

                        {this.props.newListPage ? <Redirect to={`/newListPage/${this.props.newListPage}`} /> : null}
                    </form>
                </div>
            </Switch>
            }

          </div>

        )
    }
}

export default AddListToFirebase
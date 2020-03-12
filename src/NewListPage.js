import React, { Component } from "react";
import axios from "axios";
import TvShowDetails from './TvShowDetails';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AddToListButton from './AddToListButton'
import UpVote from "./UpVote";

class NewListPage extends Component {
	constructor() {
		super();
		this.state = {
			tv: [],
			userSearchQuery: '',
			userInput: '',
			userTV: [],	
			searchedShows: [],
			upVoteArray: [],
		};
	}
	handleChange = (e) => {
		this.setState({userInput: e.target.value})
	}
	handleFormSubmit = (e) => {
		e.preventDefault();
		axios.get(`https://api.tvmaze.com/search/shows?q=${this.state.userInput}`).then(response => {
			const userTV = response.data;
			this.setState({
				userTV: userTV,
			})
		})
	}
	objectArray = (objectToPush) => {
		const stateToSet = [...this.state.upVoteArray];
		stateToSet.push(objectToPush);
		this.setState({
			upVoteArray: stateToSet
		})
		console.log(this.state.upVoteArray)
	}

	


	componentDidMount() {
	}
	
	render() {
		const hello = this.props.newListStateObj.shows
		return (
			<div>
				<div className="listPageTopFlex">
				<div className="listPageFlex">
				<h3>{this.props.newListStateObj.name}</h3>
					<h3>User's List Items</h3>
				</div>					
				<form
					className="searchForm"
					action="submit"
					onSubmit={this.handleFormSubmit}
					>
					<label htmlFor="listSearch"></label>
					<input
					className="listSearchBar"
					type="text"
					id="listSearch"
					onChange={this.handleChange}
					value={this.state.userInput}
					placeholder="search for a show"
					/>
					<button
						type="submit"
						className="listButton"
						onClick={this.handleClick}
					>
						<i className="fas fa-search"></i>
					</button>
				</form>
				</div>		
				<div className="listVsChoicesFlex">
					<div className="userList">
					{hello !== undefined &&
									<ul>

										{hello.map(show => {
											return (
											<UpVote 
												showName={show.name}
												upVoteArray={this.state.upVoteArray}
											/>
											)
										})} 
									</ul>
							}
					</div>
					<div className="userOptions">
						<ul>
							{
							this.state.userTV.map((show, index) => {
							return (
								<div key={index} className="searchResults">
									<Switch>
										<Link to={`/tvShows/${show.show.externals.tvrage}`}>
										{show.show.image === null ? <p>No Image!</p> : <img src={show.show.image.medium} alt={`A poster of ${show.show.name}`} title={`An image of ${show.show.name}`}/>} 
										</Link>
									</Switch>
									<AddToListButton 
										objectArray={this.objectArray}
										showName={show.show.name}
										showId={show.show.id}
										newListPage={this.props.newListPage}
										currentListObj={this.props.currentListObj}


									/>
								</div>
							)
							})
							}
						</ul>
					</div>
				</div>
			</div>
		);
    }
}

export default NewListPage;

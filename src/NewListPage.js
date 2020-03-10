import React, { Component } from "react";
import axios from "axios";
import TvShowDetails from './TvShowDetails';
import AddToListButton from './AddToListButton'

import {
	BrowserRouter as Router,
	Route,
	Link,
	NavLink
} from "react-router-dom";

class NewListPage extends Component {
	constructor() {
		super();
		this.state = {
			tv: [],
			userSearchQuery: '',
			userInput: '',
			userTV: [],	
			searchedShows: [],
		};
	}
	handleChange = (e) => {
		this.setState({userInput: e.target.value})
	}
	handleFormSubmit = (e) => {
		e.preventDefault();
		axios.get(`http://api.tvmaze.com/search/shows?q=${this.state.userInput}`).then(response => {
			const userTV = response.data;
			// const officialDescription = show.show.summary.replace(regex, "");
			this.setState({
				userTV: userTV,
			})
		})
	}  
	
	componentDidMount() {
	}
	
	render() {
		const regex = /(<([^>]+)>)/gi;
		return (
			<Router>
				<div>
					<div className="listPageFlex">
						<h1>LOGO</h1>
							<button className="listButton">cancel</button>
					</div>
					<div className="listPageFlex">
						<h2>New List</h2>
					</div>
					<div className="listPageFlex2">
						<h3>List Name</h3>
						<button className="listButton">Add to list</button>
					</div>
					<div className="listPageFlex3">
						<div className="listPageFlex4">
							<div className="listPageFlex">
								<h3>User's List Items</h3>
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
									<ul>
										<li>
											<img
											src={this.state.officialImage}
											alt={`A poster of ${this.state.tv.name}`}
											/>
										</li>
										<li>
											<img
											src={this.state.officialImage}
											alt={`A poster of ${this.state.tv.name}`}
											/>
										</li>
										<li>
											<img
											src={this.state.officialImage}
											alt={`A poster of ${this.state.tv.name}`}
											/>
										</li>
										<li>
											<img
											src={this.state.officialImage}
											alt={`A poster of ${this.state.tv.name}`}
											/>
										</li>
										<li>
											<img
											src={this.state.officialImage}
											alt={`A poster of ${this.state.tv.name}`}
											/>
										</li>
										<li>
											<img
											src={this.state.officialImage}
											alt={`A poster of ${this.state.tv.name}`}
											/>
										</li>
									</ul>
								</div>
								<div className="userOptions">
								<ul>
						{
							this.state.userTV.map((show, index) => {
								return (
									<div key={index} className="searchResults">
										<Link to={`/tvShows/${show.show.externals.tvrage}`}>
										{show.show.image === null ? <p>No Image!</p> : <img src={show.show.image.medium} alt={`A poster of ${show.show.name}`} title={`An image of ${show.show.name}`}/>} 
										<h3>{show.show.name}</h3>
										<p>{show.show.summary === null ? <p>No description available</p> : show.show.summary.replace(regex, "")}</p>
										<p>{show.show.rating.average === null ? <p>No Rating Available</p> : <p>Rating:{show.show.rating.average}/10</p>}</p>
										</Link>
										<AddToListButton />
                            			<Router>
                                			<Route path="/tvShow/:tvShowID" component={TvShowDetails}/>
                            			</Router>
									</div>
								)
							})
						}
					</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Router>
			);
    }
}

export default NewListPage;

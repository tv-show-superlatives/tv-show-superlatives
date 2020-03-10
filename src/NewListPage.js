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
	// userSearchFunction = () => {
	// 	axios.get(`http://api.tvmaze.com/search/shows?q=${this.state.userSearchQuery}`).then(response => {
	// 		const userTV = response.data;
	// 		this.setState({
	// 			userTV: userTV,
	// 		})
	// 	})
	// }
	handleChange = (e) => {
		this.setState({userInput: e.target.value})
	  }
	handleFormSubmit = (e) => {
		e.preventDefault();
		axios.get(`http://api.tvmaze.com/search/shows?q=${this.state.userInput}`).then(response => {
			const userTV = response.data;
			this.setState({
				userTV: userTV,
			})
		})
	}  
	
	
	
	
	componentDidMount() {
	}
	
	render() {
		
		console.log(this.state.userTV)
		return (
			<Router>
				<div className="listPageFlex">
					<h1>LOGO</h1>
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
								<div>
									<ul>
										{this.state.userTV.map((show, index) => {
											return (
												<div key={index} className="searchResults">
													<Link to={`/tvShows/${show.show.externals.tvrage}`}>
														<h3>{show.show.name}</h3>
														<img src={show.show.image.medium}
										title={`${show.show.name}`}
										alt={`${show.show.name}`}/>
													</Link>
													<AddToListButton />
													<Router>
														<Route
															path="/tvShow/:tvShowID"
															component={TvShowDetails}
														/>
													</Router>
												</div>
											);
										})}
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

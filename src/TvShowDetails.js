import React, { Component } from "react";
import axios from "axios";
import AddToListButton from './AddToListButton'
import {
	BrowserRouter as Router,
	Route,
	Link,
	NavLink
} from "react-router-dom";


class TvShowDetails extends Component {

	constructor() {
		super();
		this.state = {
			tv: []
		};
	}

	componentDidMount() {
		axios({
			url: `https://api.tvmaze.com/lookup/shows?language=English&tvrage=${this.props.match.params.tvShowsID}`,
			method: "GET"
		}).then(response => {
			const tv = response.data;
			const regex = /(<([^>]+)>)/gi;
			const officialDescription = response.data.summary.replace(regex, "");
			const genreName = response.data.genres[0];
			const officialRating = response.data.rating.average;
			const officialImage = response.data.image.medium;
			
			this.setState({
				tv: tv,
				officialDescription: officialDescription,
				genreName: genreName,
				officialRating: officialRating,
				officialImage: officialImage,
			});
		});
	}
	
	render() {
		console.log(this.state.tv.network)
		return (
			<div className="singleShow">
				<h2 className="showName">
					{this.state.tv.name == null || undefined ? (
						<p>N/A</p>
					) : (
						this.state.tv.name
					)}
				</h2>
				{this.state.officialImage == null || undefined ? (
					<p>N/A</p>
				) : (
					<img
						src={this.state.officialImage}
						alt={`A poster of ${this.state.tv.name}`}
						title={`${this.state.tv.name}`}
					/>
				)}
				<p>
					<span className="bolded">Description: </span>
					{this.state.officialDescription == null || undefined ? (
						<p>N/A</p>
					) : (
						this.state.officialDescription
					)}
				</p>
				<p>
					<span className="bolded">Rating: </span>
					{this.state.officialRating == null || undefined ? (
						<p>N/A</p>
					) : (
						this.state.officialRating
					)}
					/10
				</p>
				<p>
					<span className="bolded">Network: </span>
					{this.state.tv.network == null || undefined ? (
						<p>N/A</p>
					) : (
						this.state.tv.network.name
					)}
				</p>
				<p>
					<span className="bolded">Country: </span>
					{this.state.tv.network == null || undefined ? (
						<p>N/A</p>
					) : (
						this.state.tv.network.country.name
					)}
				</p>
				<p>
					<span className="bolded">Genre: </span>
					{this.state.genreName == null || undefined ? (
						<p>N/A</p>
					) : (
						this.state.genreName
					)}
				</p>
				<div className="buttonFlex">
					{/* <AddToListButton /> */}
					<Link to="/">
						<button className="detailsButton">New List</button>
					</Link>
					<Link to="/GeneralSearch/">
						<button className="detailsButton">Catalogue</button>
					</Link>
					<Link to="/NewListPage/">
						<button className="detailsButton">Your List</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default TvShowDetails;
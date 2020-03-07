import React, { Component } from "react";
import axios from "axios";
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
			url: `https://api.tvmaze.com/lookup/shows?tvrage=${this.props.match.params.tvShowsID}`,
			method: "GET"
		}).then(response => {
			const tv = response.data;
			const genreName = response.data.genres[0];
			const officialRating = response.data.rating.average;
			const officialNetwork = response.data.network.name;
			const officialCountry = response.data.network.country.name;
			const officialImage = response.data.image.medium;
			// console.log((response.data.summary).slice(3, -4))

			this.setState({
				tv: tv,
				genreName: genreName,
				officialRating: officialRating,
				officialNetwork: officialNetwork,
				officialCountry: officialCountry,
				officialImage: officialImage,
			});
		});
	}

	
	// /when component is true, show title, image, description, rating, network, country, genre, close button
	render() {
		if (
			this.state.officialNetwork === "" ||
			this.state.officialCountry === ""
		) {
			return (
				<div className="single-show">
					<h1>{this.state.tv.name}</h1>
					<img
						src={this.state.officialImage}
						alt={`A poster of ${this.state.tv.name}`}
					/>
					<p>Description: {this.state.tv.summary}</p>
					<p>Rating: {this.state.officialRating}</p>
					<p>Network unknown</p>
					<p>Country unknown</p>
					<p>Genre: {this.state.genreName}</p>
					<button>
						<Link to="/GeneralSearch/">Close Window</Link>
					</button>
				</div>
			);
			} else {
				return (
					<div className="single-show">
						<h1>{this.state.tv.name}</h1>
						<img
							src={this.state.officialImage}
							alt={`A poster of ${this.state.tv.name}`}
						/>
						<p>Description: {this.state.tv.summary}</p>
						<p>Rating: {this.state.officialRating}</p>
						<p>Network: {this.state.officialNetwork}</p>
						<p>Country: {this.state.officialCountry}</p>
						<p>Genre: {this.state.genreName}</p>
						<button>
							<Link to="/GeneralSearch/">Close Window</Link>
						</button>
					</div>
				);
			}
	}
}
		
export default TvShowDetails;
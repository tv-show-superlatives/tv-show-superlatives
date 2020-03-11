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
			url: `https://api.tvmaze.com/lookup/shows?language=English&tvrage=${this.props.match.params.tvShowsID}`,
			method: "GET"
		}).then(response => {
			const tv = response.data;
			const regex = /(<([^>]+)>)/gi;
			const officialDescription = response.data.summary.replace(regex, "");
			const genreName = response.data.genres[0];
			const officialRating = response.data.rating.average;
			// const officialNetworkCatch = response.data.network;
			// const officialNetwork = response.data.network.name;
			// const officialCountry = response.data.network.country.name;
			const officialImage = response.data.image.medium;
			
			this.setState({
				tv: tv,
				officialDescription: officialDescription,
				genreName: genreName,
				officialRating: officialRating,
				// officialNetworkCatch: officialNetworkCatch,
				// officialNetwork: officialNetwork,
				// officialCountry: officialCountry,
				officialImage: officialImage,
			});
		});
	}
	
	
	// /when component is true, show title, image, description, rating, network, country, genre, close button
	render() {
		console.log(this.state.tv.network)
		return (
			<div className="single-show">
						<h2 className="showName">{this.state.tv.name}</h2>
						<img
							src={this.state.officialImage}
							alt={`A poster of ${this.state.tv.name}`}
							title={`${this.state.tv.name}`}
							/>
						<p>
							<span className="bolded">Description: </span>
							{this.state.officialDescription}
						</p>
						<p>
							<span className="bolded">Rating:</span>{" "}
							{this.state.officialRating}/10
						</p>
						<p>
							<span className="bolded">Network:</span>{" "}
							{this.state.tv.network == null || undefined ? <p>N/A</p> : this.state.tv.network.name}
						</p>
						<p>
							<span className="bolded">Country:</span>{" "}
							{this.state.tv.network == null || undefined ? <p>N/A</p> : this.state.tv.network.country.name}
						</p>
						<p>
							<span className="bolded">Genre:</span> {this.state.genreName}
						</p>
						<button>
							<Route path="/addNewList:list" />
							Add To List
						</button>
						<Link to="/GeneralSearch/">
							<button>Close Window</button>
						</Link>
					</div>
				);
			}
	}

		
export default TvShowDetails;
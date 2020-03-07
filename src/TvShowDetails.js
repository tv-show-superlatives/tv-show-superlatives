import React, { Component } from "react";
import axios from "axios";


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
			this.setState({
                tv: tv,
            });
			console.log(tv);
			console.log(this.state.tv.name);
		});
	}
	
	// /when component is true, show title, image, description, rating, network, country, genre, close button
	render() {
		// if (
		// 	this.state.tv.network.name === "" ||
		// 	this.state.tv.network.country.name === ""
		// ) {
		// 	return (
		// 		<div className="single-show">
		// 			<h1>{this.state.tv.name}</h1>
		// 			<img
		// 				src={this.state.tv.image.medium}
		// 				alt={`A poster of ${this.state.tv.name}`}
		// 			/>
		// 			<p>{this.state.tv.summary}</p>
		// 			<p>{this.state.tv.rating.average}</p>
		// 			<p>{this.state.tv.genres}</p>
		// 			<button>Close</button>
		// 		</div>
		// 	);
		// 	} else {
				return (
					<div className="single-show">
						<h1>{this.state.tv.name}</h1>
						{/* <img
							src={this.state.tv.image.medium}
							alt={`A poster of ${this.state.tv.name}`}
						/> */}
						<p>{this.state.tv.summary}</p>
						{/* <p>{this.state.tv.rating.average}</p> */}
						{/* <p>{this.state.tv.network.name}</p>
						<p>{this.state.tv.network.country.name}</p> */}
						<p>{this.state.tv.genres}</p>
						<button>Close</button>
					</div>
				);
			}
	}
// }
		
export default TvShowDetails;
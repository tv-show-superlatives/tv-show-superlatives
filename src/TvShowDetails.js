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
		return (
			<div className="single-show">
                <div>
                    <h1>{this.state.tv.name}</h1>
				    <p>{this.state.tv.summary}</p>
				    <p>{this.state.tv.genres}</p>
                </div>
                <div className="single-show-poster">
                    {/* <img src={tvPoster} title="" alt=""/> */}
                </div>
				{/* <img
					src={this.state.tv.image.medium}
					alt={`A poster of ${this.state.tv.name}`}
				/> */}
				{/* <p>{this.state.tv.network.name}</p> */}
				{/* <p>{this.state.tv.rating.average}</p> */}
				{/* <p>{this.state.tv.network.country.name}</p> */}
				{/* 
				<button>Close</button> */}
			</div>
		);
	}
}
export default TvShowDetails;




// import React, { Component } from "react";
// import axios from 'axios';
// // import { Link } from "react-router-dom";

// class TvShowDetails extends Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			tv: {}
// 		}
//     }
    
// 	componentDidMount() {
//         axios({
//             url: `https://api.tvmaze.com/lookup/shows?tvrage=1`,
//             method: 'GET',
//         }).then(response => {
//             const tv = response.data;
//             this.setState({
//                 tv: tv,
//             })
//         })
//     }

//     // /when component is true, show title, image, description, rating, network, country, genre, close button

//     render() {
//         return (
//             <div class="showDetails">
//                 {/* <div key={show.id} className="details"> */}
//                 <h1>{this.state.show.name}</h1>
//                 {/* <img src={`this.state.show.image.medium`} alt={`A poster of ${this.state.show.name}`} />
//                 <p>{this.state.show.summary}</p>
//                 <p>{this.state.show.rating.average}</p>
//                 <p>{this.state.show.network.name}</p>
//                 <p>{this.state.show.network.country.name}</p>
//                 <p>{this.state.show.genres}</p>
//                 <button>Close</button>   */}
//             </div>
//         )
//     }
                
// }

// export default TvShowDetails;

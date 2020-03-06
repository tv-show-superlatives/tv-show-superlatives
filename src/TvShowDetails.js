import React, { Component } from "react";
import axios from 'axios';

class TvShowDetails extends Component {
	constructor() {
		super();
		this.state = {
			tv: []
		}
    }
    
	componentDidMount() {
        axios({
            url: `https://api.tvmaze.com/lookup/shows?tvrage=5325`,
            method: 'GET',
            
        }).then((response) => {
            const tv = response.data;
            this.setState({
                tv: tv,
            })
            console.log(tv);
            console.log(this.state.tv.name)
        })
    }

    // /when component is true, show title, image, description, rating, network, country, genre, close button

    render() {
        return (
           <div>
               <h1>{this.state.tv.name}</h1>
           </div>
        )
    }
}
    

export default TvShowDetails;

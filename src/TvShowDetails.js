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
            url: `https://api.tvmaze.com/shows?`,
            method: 'GET',
            params: {
                page: 'X',
                language: 'English',
            }
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
                {this.state.tv.map(show => {
                    if (show.network === null) {
                        console.log('gaaaaah')
                    } else {
                        return (
                            <div key={show.id} className="titles">
                                <p>{`${show.name}`}</p>
                                <img src={`${show.image.medium}`} alt={`A poster of ${show.name}`} />
                                <p>{`${show.summary}`}</p>
                                <p>{`${show.rating.average}`}</p>
                                <p>{`${show.network.name}`}</p>
                                <p>{`${show.network.country.name}`}</p>
                                <p>{`${show.genres}`}</p>
                                <button>Close</button>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
}
    

export default TvShowDetails;

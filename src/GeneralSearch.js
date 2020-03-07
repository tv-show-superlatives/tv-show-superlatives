import React, { Component } from 'react';
import axios from 'axios';
import TvShowDetails from './TvShowDetails';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class GeneralSearch extends Component {
    constructor(){
        super();
        this.state = {
            tv: [],
            topTen: [],
        }
    }
   
    componentDidMount() { 
        axios({
            url: `http://api.tvmaze.com/shows?`,
            method: 'GET',
            params: {
                page: 'X',
                language: 'English',
            }
        }).then(response => {
            const tv = response.data;
            this.setState({
            tv: tv,
        })
            console.log(tv)
            const avgRating = this.state.tv.map(show => {
                return show.rating.average
            })
            const network = this.state.tv.map(show => {
                if (show.network === null) {
                    console.log('no network error catch')
                } else {
                    return show.network.name
                }
            })
            const sortedTV = tv.sort(function(a, b) {
                if (a.rating.average === null) {
                    console.log('no user rating error catch')
                } else {
                    return a.rating.average - b.rating.average;
                }
            });
            const topTen = sortedTV.reverse().slice(0,40);
            this.setState({
                topTen: topTen,
            })

        })
    }

    render() {
        return (
            <div className="tv-catalogue">
                {this.state.topTen.map(show => {
                return (
                    <div key={show.id} className="tv-titles tv-poster">
                        <Link to={`/tvShows/${show.externals.tvrage}`}>
                        <img src={`${show.image.medium}`} title={`${show.name}`} alt={`${show.name}`}/>
                        </Link>
                        <Router>
                        <Route path="/tvShow/:tvShowID" component={TvShowDetails}/>

                        </Router>
                        
                        
                        {/* <h2>{`${show.name}`}</h2> */}
                        {/* <p>{`${show.summary}`}</p> */}
                        {/* <p>{`${show.genres[0]}`}</p>
                        <p>{`${show.network.name}`}</p>
                        <p>Average User Rating: {`${show.rating.average}`}</p> */}
                    </div>
                )
            })}
        </div>
    )
    }
}
export default GeneralSearch;
  
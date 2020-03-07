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
            hboShows: [],
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
            console.log(avgRating);
            const network = this.state.tv.map(show => {
                if (show.network === null) {
                    console.log('no network error catch')
                } else {
                    return show.network.name
                }
            })
            console.log(network)
            
            const tvShowImage = this.state.tv.map(show => {
                if (show.image.medium === null) {
                    console.log('no network error catch')
                } else {
                    return show.image.medium
                }
            })
            console.log(tvShowImage)
            const sortedTV = tv.sort(function(a, b) {
                if (a.rating.average === null) {
                    console.log('no user rating error catch')
                } else {
                    return a.rating.average - b.rating.average;
                }
            });
            const hboShows = this.state.tv.filter(show => {
                if (show.network === null) {
                    console.log('no network error catch')
                } else if (show.network.name === "HBO") {
                    return show.network.name
                }
            }).slice(0,10);
            this.setState({
                hboShows: hboShows,
            })
            console.log(hboShows)
            const topTen = sortedTV.reverse().slice(0,10);
            this.setState({
                topTen: topTen,
            })
        })
    }

    render() {
        return (
            <div className="tv-catalogue">
                <h2>Best Rated Shows on TV</h2>
                {this.state.topTen.map(show => {
                return (
                    <div key={show.id} className="tv-titles tv-poster">
                        <Link to={`/tvShows/${show.externals.tvrage}`}>
                        <img src={`${show.image.medium}`} title={`${show.name}`} alt={`${show.name}`}/>
                        </Link>
                        <Router>
                        <Route path="/tvShow/:tvShowID" component={TvShowDetails}/>
                        </Router>
                    </div>
                )
            })}
            <h2>HBO</h2>
                    {this.state.hboShows.map(show => {
                    return (
                        <div key={show.id} className="tv-titles tv-poster">
                            <Link to={`/tvShows/${show.externals.tvrage}`}>
                            <img src={`${show.image.medium}`} title={`${show.name}`} alt={`${show.name}`}/>
                            </Link>
                            <Router>
                            <Route path="/tvShow/:tvShowID" component={TvShowDetails}/>
                            </Router>
                    </div>
                )
            })}
        </div>
        )
    }
}
export default GeneralSearch;
  
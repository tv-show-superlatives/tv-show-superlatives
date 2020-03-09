import React, { Component } from 'react';
import axios from 'axios';
import TvShowDetails from './TvShowDetails';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class GeneralSearch extends Component {
    constructor(){
        super();
        this.state = {
            tv: [],
            sortedTV: [],
            topTen: [],
            comedyTen: [],
            hboShows: [],
            nbcShows: [],
        }
    }

    shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--){
            let j = Math.floor(Math.random()* (i + 1))
            let item = array[i]
            array[i] = array[j]
            array[j] = item
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
                    return false
                } else {
                    return show.network.name
                }
            })            
            const tvShowImage = this.state.tv.map(show => {
                if (show.image.medium === null) {
                    console.log('error handling')
                } else {
                    return show.image.medium
                }
            })
            const sortedTV = tv.sort(function(a, b) {
                if (a.rating.average === null) {
                    return false
                } else {
                    return a.rating.average - b.rating.average;
                }
            });
            const topTen = sortedTV.reverse().slice(0,10);
            this.setState({
                topTen: topTen,
            })
            const comedyTen = sortedTV.filter(show => {
                if (show.genres[0] === null) {
                    return false 
                } else if (show.genres[0] === "Comedy") {
                    return show.genres[0]
                }
            }).slice(0,10)
            this.setState({
                comedyTen: comedyTen,
            })
            const hboShows = sortedTV.filter(show => {
                if (show.network === null) {
                    return false
                } else if (show.network.name === "HBO") {
                    return show.network.name
                }
            }).slice(0,10)
            this.setState({
                hboShows: hboShows,
            });
            const nbcShows = sortedTV.filter(show => {
                if (show.network === null) {
                    return false
                } else if (show.network.name === "NBC") {
                    return show.network.name
                }
            }).slice(0,10);

            

            const shuffleTV = this.shuffle(sortedTV)
            console.log(sortedTV)
            console.log(shuffleTV)

            this.setState({
                nbcShows: nbcShows,
            });
            
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
            <h2>Comedy</h2>
                    {this.state.comedyTen.map(show => {
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
                    {this.state.nbcShows.map(show => {
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
  
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
            shuffleTV: [],
        }
    }
    shuffle = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    componentDidMount() { 
            axios.get(`http://api.tvmaze.com/shows?page=X&language=English`).then(response => {
                const tv = response.data;
                    this.setState({
                    tv: tv,
                });
                console.log(tv)
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
//////////////////userInput attachment to search field needs to be done
            let userInput = "France"
            const searchArray = tv.filter(show => {
                if (show.network === null) {
                    return false 
                } else if (show.network.name === userInput) {
                    return show.network.name
                }  else if (show.genres[0] === userInput) {
                    return show.genres[0]
                } else if (show.name === userInput) {
                    return show.name
                } else if (show.network.country.name === userInput) {
                    return show.network.country.name
                } 
            })
            console.log(searchArray)

            // const filtered = tv.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(keyword)));            
            
            // console.log(filtered);

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
            this.setState({
                nbcShows: nbcShows,
            });
            const shuffleTV = this.shuffle(tv).reverse().slice(0,10);
            this.setState({
                shuffleTV: shuffleTV,
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
            <h2>NBC</h2>
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
            <h2>TV Show Roulette!</h2>
                {this.state.shuffleTV.map(show => {
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
  
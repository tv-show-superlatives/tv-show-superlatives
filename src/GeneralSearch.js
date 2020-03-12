import React, { Component } from 'react';
import axios from 'axios';
import TvShowDetails from './TvShowDetails';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AddToListButton from './AddToListButton'


class GeneralSearch extends Component {
    constructor(){
        super();
        this.state = {
            tv: [],
            sortedTV: [],
            topTen: [],
            comedyTen: [],
            hboShows: [],
            dramaShows: [],
            shuffleTV: [],
            marginLeft:0,
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
        axios.get(`http://api.tvmaze.com/shows?page=X`).then(response => {
            const tv = response.data;
                this.setState({
                    tv: tv,
            });
            const sortedTV = tv.sort(function(a, b) {
                if (a.rating.average === null) {
                    return false
                } else {
                    return a.rating.average - b.rating.average;
                }
            });
            const topTen = sortedTV.reverse().slice(0,15);
                this.setState({
                    topTen: topTen,
            });
            const comedyTen = sortedTV.filter(show => {
                if (show.genres[0] === null) {
                    return false 
                } else if (show.genres[0] === "Comedy") {
                    return show.genres[0]
                }
            }).slice(0,15)
                this.setState({
                    comedyTen: comedyTen,
            });
            const hboShows = sortedTV.filter(show => {
                if (show.network === null) {
                    return false
                } else if (show.network.name === "HBO") {
                    return show.network.name
                }
            }).slice(0,15)
            this.setState({
                hboShows: hboShows,
            });
            const dramaShows = sortedTV.filter(show => {
                if (show.genres[0] === null) {
                    return false
                } else if (show.genres[0] === "Drama") {
                    return show.genres[0]
                }
            }).slice(0,10);
            this.setState({
                dramaShows: dramaShows,
            });
            const shuffleTV = this.shuffle(tv).reverse().slice(0,10);
            this.setState({
                shuffleTV: shuffleTV,
            });
        });
    }

    render() {
        return (    
            <div className="tvCatalogue">
                <h2>Best Rated Shows on TV</h2>
                <div className="showScroll">
                    {this.state.topTen.map(show => {
                        return (
                            <div key={show.id} className="tvTitles">
                                <Link to={`/tvShows/${show.externals.tvrage}`}>
                                <img src={`${show.image.medium}`} title={`${show.name}`} alt={`${show.name}`}/>
                                </Link>
                                <Link to={`/tvShows/${show.externals.tvrage}`}>
                                <button className="addToList">More Details</button>
                                </Link>
                                {/* <AddToListButton /> */}
                                <Router>
                                    <Route path="/tvShow/:tvShowID" component={TvShowDetails}/>
                                </Router>
                            </div>
                        )
                    })}
                </div>
                <h2>HBO</h2>
                <div className="showScroll">
                    {this.state.hboShows.map(show => {
                        return (
                            <div key={show.id} className="tvTitles">
                                <Link to={`/tvShows/${show.externals.tvrage}`}>
                                <img src={`${show.image.medium}`} title={`${show.name}`} alt={`${show.name}`}/>
                                </Link>
                                <Link to={`/tvShows/${show.externals.tvrage}`}>
                                <button className="addToList">More Details</button>
                                </Link>
                                {/* <AddToListButton /> */}
                                <Router>
                                    <Route path="/tvShow/:tvShowID" component={TvShowDetails}/>
                                </Router>
                            </div>
                        )
                    })}
                </div>    
                <h2>Comedy</h2>
                <div className="showScroll">
                    {this.state.comedyTen.map(show => {
                        return (
                            <div key={show.id} className="tvTitles">
                                <Link to={`/tvShows/${show.externals.tvrage}`}>
                                <img src={`${show.image.medium}`} title={`${show.name}`} alt={`${show.name}`}/>
                                </Link>
                                <Link to={`/tvShows/${show.externals.tvrage}`}>
                                <button className="addToList">More Details</button>
                                </Link>
                                {/* <AddToListButton /> */}
                                <Router>
                                    <Route path="/tvShow/:tvShowID" component={TvShowDetails}/>
                                </Router>
                            </div>
                        )
                    })}
                </div>
                <h2>Dramas</h2>
                <div className="showScroll">
                    {this.state.dramaShows.map(show => {
                        return (
                            <div key={show.id} className="tvTitles">  
                                <Link to={`/tvShows/${show.externals.tvrage}`}>
                                <img src={`${show.image.medium}`} title={`${show.name}`} alt={`${show.name}`}/>
                                </Link>
                                <Link to={`/tvShows/${show.externals.tvrage}`}>
                                <button className="addToList">More Details</button>
                                </Link>
                                {/* <AddToListButton /> */}
                                <Router>
                                    <Route path="/tvShow/:tvShowID" component={TvShowDetails}/>
                                </Router>
                            </div>
                        )
                    })}
                </div>
                <h2>TV Show Roulette!</h2>
                <div className="showScroll">
                    {this.state.shuffleTV.map(show => {
                        return (
                            <div key={show.id} className="tvTitles">
                                <Link to={`/tvShows/${show.externals.tvrage}`}>
                                <img src={`${show.image.medium}`} title={`${show.name}`} alt={`${show.name}`}/>
                                </Link>
                                <Link to={`/tvShows/${show.externals.tvrage}`}>
                                <button className="addToList">More Details</button>
                                </Link>
                                {/* <AddToListButton /> */}
                                <Router>
                                    <Route path="/tvShow/:tvShowID" component={TvShowDetails}/>
                                </Router>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default GeneralSearch;
  
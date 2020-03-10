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
            foodShows: [],
            shuffleTV: [],
            marginLeft:0,
            count: 0,
        }
        
    }
    shuffle = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    handleClick = () => {
        this.setState({
          count: this.state.count + 1
        });
    }    
    
    componentDidMount() { 
<<<<<<< HEAD
    axios.get(`http://api.tvmaze.com/shows?page=1`).then(response => {
=======
        axios.get(`https://api.tvmaze.com/shows?page=2`).then(response => {
>>>>>>> master
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
            const foodShows = sortedTV.filter(show => {
                if (show.genres[0] === null) {
                    return false
                } else if (show.genres[0] === "Food") {
                    return show.genres[0]
                }
            }).slice(0,10);
            this.setState({
                foodShows: foodShows,
            });
            const shuffleTV = this.shuffle(tv).reverse().slice(0,10);
            this.setState({
                shuffleTV: shuffleTV,
            })
            
        });
    }

    render() {
        return (    
        <div className="tv-catalogue">
            <p>I am currently on page number: {this.state.count}</p>
        <button onClick={this.handleClick}>Gimme More</button>
            <h2>Best Rated Shows on TV</h2>
            <div className="showScroll">
                {this.state.topTen.map(show => {
                    return (
                        <div key={show.id} className="tv-titles tv-poster">
                            <Link to={`/tvShows/${show.externals.tvrage}`}>
                            <img src={`${show.image.medium}`} title={`${show.name}`} alt={`${show.name}`}/>
                            </Link>
                            <AddToListButton />
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
                        <div key={show.id} className="tv-titles tv-poster">
                            <Link to={`/tvShows/${show.externals.tvrage}`}>
                            <img src={`${show.image.medium}`} title={`${show.name}`} alt={`${show.name}`}/>
                            </Link>
                            <AddToListButton />
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
                        <div key={show.id} className="tv-titles tv-poster">
                            <Link to={`/tvShows/${show.externals.tvrage}`}>
                            <img src={`${show.image.medium}`} title={`${show.name}`} alt={`${show.name}`}/>
                            </Link>
                            <AddToListButton />
                            <Router>
                                <Route path="/tvShow/:tvShowID" component={TvShowDetails}/>
                            </Router>
                        </div>
                    )
                })}
            </div>
            <h2>Food shows</h2>
            <div className="showScroll">
                {this.state.foodShows.map(show => {
                    return (
                        <div key={show.id} className="tv-titles tv-poster">  
                            <Link to={`/tvShows/${show.externals.tvrage}`}>
                            <img src={`${show.image.medium}`} title={`${show.name}`} alt={`${show.name}`}/>
                            </Link>
                            <AddToListButton />
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
                        <div key={show.id} className="tv-titles tv-poster">
                            <Link to={`/tvShows/${show.externals.tvrage}`}>
                            <img src={`${show.image.medium}`} title={`${show.name}`} alt={`${show.name}`}/>
                            </Link>
                            <AddToListButton />
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
  
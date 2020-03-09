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
    /////USER SEARCH FUNCTION 
    // array = [
    //     { name:"string 1", value:"this", other: "that" },
    //     { name:"string 2", value:"this", other: "that" }
    // ];
    // search = (nameKey, myArray) => {
    //     for (let i = 0; i < tv.length; i++) {
    //         if (myArray[i].name === nameKey) {
    //             return myArray[i];
    //         }
    //     }
    // }

//  resultObject = search("string 1", array);

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
                
                {/* <form action="">
                    <input type="text" placeholder="Search.."></input>
                    <button onClick={searchFunc}>SEARCH!</button>
                </form> */}


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
  
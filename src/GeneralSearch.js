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
            
        });
    }



//--------------------- HERE IS THE ARROW BUTTON SCROLLER CRAP------------------------------------//


    //     var scrollDuration = 300;

    //     const leftPaddle = document.getElementsByClassName('left-paddle');
    //     var rightPaddle = document.getElementsByClassName('right-paddle');

    //     var itemsLength = ('.item').length;
    //     var itemSize = ('.item').outerWidth(true);

    //     var paddleMargin = 20;

    //     var getMenuWrapperSize = function () {
    //         return ('.menu-wrapper').outerWidth();
    //     }
    //     var menuWrapperSize = getMenuWrapperSize();

    //     (window).on('resize', function () {
    //         menuWrapperSize = getMenuWrapperSize();
    //     });

    //     var menuVisibleSize = menuWrapperSize;


    //     var getMenuSize = function () {
    //         return itemsLength * itemSize;
    //     };
    //     var menuSize = getMenuSize();

    //     var menuInvisibleSize = menuSize - menuWrapperSize;

    //     // get how much have we scrolled to the left
    //     var getMenuPosition = function () {
    //         return ('.menu').scrollLeft();
    //     };

    //     // finally, what happens when we are actually scrolling the menu
    //     ('.menu').on('scroll', function () {

    //         // get how much of menu is invisible
    //         menuInvisibleSize = menuSize - menuWrapperSize;
    //         // get how much have we scrolled so far
    //         var menuPosition = getMenuPosition();

    //         var menuEndOffset = menuInvisibleSize - paddleMargin;

    //         // show & hide the paddles 
    //         // depending on scroll position
    //         if (menuPosition <= paddleMargin) {
    //             (leftPaddle).addClass('hidden');
    //             (rightPaddle).removeClass('hidden');
    //         } else if (menuPosition < menuEndOffset) {
    //             // show both paddles in the middle
    //             (leftPaddle).removeClass('hidden');
    //             (rightPaddle).removeClass('hidden');
    //         } else if (menuPosition >= menuEndOffset) {
    //             (leftPaddle).removeClass('hidden');
    //             (rightPaddle).addClass('hidden');
    //         }

    //         // print important values
    //         ('#print-wrapper-size span').text(menuWrapperSize);
    //         ('#print-menu-size span').text(menuSize);
    //         ('#print-menu-invisible-size span').text(menuInvisibleSize);
    //         ('#print-menu-position span').text(menuPosition);

    //     });

    //     // scroll to left
    //     (rightPaddle).on('click', function () {
    //         ('.menu').animate({ scrollLeft: menuInvisibleSize }, scrollDuration);
    //     });

    //     // scroll to right
    //     (leftPaddle).on('click', function () {
    //         ('.menu').animate({ scrollLeft: '0' }, scrollDuration);
    //     });
    // }





    render() {
        return (    
        <div className="tv-catalogue">
            <h2>Best Rated Shows on TV</h2>
            <div className="showScroll">
                {this.state.topTen.map(show => {
                    return (
                        <div key={show.id} className="tv-titles tv-poster">
                            <Link to={`/tvShows/${show.externals.tvrage}`}>
                            <img src={`${show.image.medium}`} title={`${show.name}`} alt={`${show.name}`}/>
                            </Link>
                            <AddToListButton 
                                // key={this.key} 
                                // title={this.title}
                            />
                            <Router>
                                <Route path="/tvShow/:tvShowID" component={TvShowDetails}/>
                            </Router>
                        </div>
                    )
                })}
            </div>
            <div class="paddles">
                <button class="left-paddle paddle hidden"></button>
                <button class="right-paddle paddle"></button>
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
            <h2>NBC</h2>
            <div className="showScroll">
                {this.state.nbcShows.map(show => {
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
  
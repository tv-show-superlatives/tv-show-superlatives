import React, { Component } from 'react';
import firebase from "./firebase";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class AddToListButton extends Component {
    constructor(){
        super();
        this.state = {
            shows:[],
        }
        
    }

    render() {
        return (
            <button className="addToList" onClick=
                {
                    this.state.shows.map((show, index) => {
                        return (
                            <div key={index} className="searchResults">
                                <Switch>
                                    <Link
                                        to={`/shows/${show.show.externals.tvrage}`}
                                    >
                                        {show.show.image === null ? (
                                            <p>No Image!</p>
                                        ) : (
                                                <img
                                                    src={show.show.image.medium}
                                                    alt={`A poster of ${show.show.name}`}
                                                    title={`An image of ${show.show.name}`}
                                                />
                                            )}
                                    </Link>
                                </Switch>
                            </div>
                        );
                    })
                }>
                add to list</button>
        )
    }
}

export default AddToListButton;
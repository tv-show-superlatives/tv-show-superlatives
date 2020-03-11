import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class AddToListButton extends Component {
    constructor(){
        super();
        this.state = {

        }
        
    }

    render() {
        return (
            <button className="addToList" onClick=
                {
                    this.state.userTV.map((show, index) => {
                        return (
                            <div key={index} className="searchResults">
                                <Switch>
                                    <Link
                                        to={`/tvShows/${show.show.externals.tvrage}`}
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
                                <AddToListButton />
                            </div>
                        );
                    })
                }>
                add to list</button>
        )
    }
}

export default AddToListButton;
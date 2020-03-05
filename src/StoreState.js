import React, { Component } from 'react';
import './App.css';

class StoreState extends Component {
    constructor(){
        super();
        this.setState={
            favMovies:[],
            userInput:'',
        }
    }


    handleChange = (e) => {
        this.setState({userInput:e.target.value})
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
    }

    // componentDidMount() {
    //     const dbRef=firebase.database().ref();
    // }

    render() {
        return (
            <div>
                {this.state.shows.map((show) => {
                    return (
                        <li>
                            <p>{show}</p>
                        </li>
                    )
                })}
            </div>
        );
    }
}

export default StoreState;
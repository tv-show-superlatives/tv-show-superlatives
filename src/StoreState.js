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

    componentDidMount() {
        const dbRef=firebase.database().ref();
    }

    render() {
        return (
            <div>
                <h1>hi</h1>
            </div>
        );
    }
}

export default StoreState;
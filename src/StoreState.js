import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';

class StoreState extends Component {
    constructor(){
        super();
        this.state={
            favShows:[],
            userInput:'',
        }
    }
    
    handleChange = (e) => {
        this.setState({userInput:e.target.value})
        // console.log(this.handleChange, "hi")
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.handleFormSubmit, "hello")
        const dbRef=firebase.database().ref()

        dbRef.push(this.state.userInput);

        this.setState={
            userInput:'',
            favShows:[]
        }
    }

    // componentDidMount() {
    //     const dbRef=firebase.database().ref();
    //     dbRef.on('value', (response) => {
    //         console.log(response.val())
    //     })
    // }  
    

    render() {
        return (
            <div>
                <form action="submit" onSubmit={this.handleFormSubmit}>
                    <label htmlFor="showSearch">Search for what you want to watch </label>
                    <input
                        type="text"
                        id="showSearch"
                        onChange={this.handleChange}
                        value={this.state.userInput}
                        placeholder = 'ie. Larry David/ Comedy / HBO'
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
        );
    }
}

export default StoreState;
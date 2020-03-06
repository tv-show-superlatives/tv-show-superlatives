import React, { Component } from 'react';

import './App.css';

class StoreState extends Component {
    constructor(){
        super();
        this.state={
            tvShows:[],
            userInput:'',
        }
    }
    

    // search(term) {
    //     this.setState({ term });
    // }
    

    handleChange = (e) => {
        this.setState({userInput:e.target.value})
        console.log(e.target.value)
        
    }
    

    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.handleFormSubmit, "hello")

        this.setState({
            userInput:'',
            tvShows:[]
        })
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
                <form className="searchForm" action="submit" onSubmit={this.handleFormSubmit}>
                    <label htmlFor="showSearch">Search for what you want to watch </label>
                    <input
                        className="searchBar"
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
import React, { Component } from 'react';
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
        // console.log(this.handleChange)
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

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
                {/* {this.state.shows.map((show) => {
                    return (
                        <li>
                            <p>{show}hihi</p>
                        </li>
                    )
                })} */}
            </div>
        );
    }
}

export default StoreState;
import React, { Component } from 'react';
import firebase from './firebase'
import './App.css';
import NewListPage from './NewListPage'
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';
import AddListToFirebase from './AddListToFirebase';



class StoreState extends Component {
    constructor(props) {
        super(props);
        this.state={
            tvShows:[],
            userInput:'',
            newListPage: ''
        }
        
    }

    addNewList = (userInput) => {
        const newList = {
            owner: '',
            name: userInput,
            shows: [
                {
                    name: 'none',
                    key: 0,
                }
            ]
        };

        const dbRef = firebase.database().ref();
        const generatedKey = dbRef.push(newList);

        console.log(generatedKey.key)

        this.setState({
            newListPage: generatedKey.key
        })
    }
    
    // addListToFirebase = (props) =>{
        // console.log(this.state.userInput)
        //     return (
        //         props.tvShows,
        //         props.dummyData  //also tried props.dummy=this.props.dummyData  
        // )
    // }
    

    handleChange = (e) => {
        this.setState({userInput:e.target.value})
        // console.log(e.target.value)
        
        
    }
    
    

    handleFormSubmit = (e) => {
        e.preventDefault();
        // this.setState({
        //     userInput: fuck off
        //     // tvShows:[]
        // })
        // this.addListToFirebase(this.state.userInput)
        // console.log(this.handleFormSubmit, "hello")
        const userInput = this.state.userInput
        this.addNewList(userInput)
        
    };

   
        
    render() {
        return (
            <Switch>
                <div>
                    <form 
                    className="searchForm" action="submit" onSubmit={this.handleFormSubmit}>
                        <label htmlFor="showSearch">new list title: </label>
                        <input
                            className="searchBar"
                            type="text"
                            id="showSearch"
                            onChange={this.handleChange}
                            value={this.state.userInput}
                        
                        />
                        {/* <Link to="/NewListPage"> */}
                        {/* <Redirect /> */}
                        {/* {console.log(this.props.history)} */}
                        <button type="submit" onClick={this.handleClick} >
                            +
                            {/* <Redirect to="/NewListPage" push /> */}
                            {/* <Route path="/NewListPage/" component={NewListPage} /> */}
                        </button>

                        
                    </form>
                    

                    {this.state.newListPage ? <Redirect to={`/NewListPage/${this.state.newListPage}`} /> : null}
                </div>
            </Switch>
        );
    }
}

export default StoreState;
import React, { Component } from 'react';
import firebase from './firebase'
import './App.css';
import AddListToFirebase from './AddListToFirebase';



class StoreState extends Component {
    constructor(props){
        super(props);
        this.state={
            tvShows:[],
            userInput:'',
        }
        
    }

    addNewList = (userInput) => {
        const newList = {
            owner: '',
            name: userInput,
            shows: [
                {
                    key: 12,
                    name: ""
                }
            ]
        };

        const dbRef = firebase.database().ref();
        dbRef.push(newList)
    }
    
    addListToFirebase = (props) =>{
        console.log(this.state.userInput)
        //     return (
        //         props.tvShows,
        //         props.dummyData  //also tried props.dummy=this.props.dummyData  
        // )
    }

    // search(term) {
    //     this.setState({ term });
    // }
    

    handleChange = (e) => {
        this.setState({userInput:e.target.value})
        // console.log(e.target.value)
        
    }
    
    

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addListToFirebase(this.state.userInput)
        // console.log(this.handleFormSubmit, "hello")
        const userInput = this.state.userInput
        this.addNewList(userInput)
        this.setState({
            userInput:'',
            // tvShows:[]
        })
    }

    // componentDidMount() {
    //     const dbRef=firebase.database().ref();
    //     dbRef.on('value', (response) => {
    //         console.log(response.val())
    //     })
    // }  
    

    // handleClick=(e)=>{
    //     e.preventDefault();
    //     // const dbRef = firebase.database().ref();
    //     // dbRef.push(this.state.userInput);
    //     this.setState({userInput:''})
    //     console.log("clicked")
    // }

        
    render() {
        // console.log(this.state.userInput)
        return (
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
                        placeholder = 'ie. Larry David/ Comedy / HBO'
                    />
                    <button type="submit" onClick={this.handleClick}>Search</button>
                    {/* <AddListToFirebase 
                        type="submit" 
                        onClick={this.handleClick}
                        tvShows={this.state.tvShows}
                        // dummyData={this.state.dummyData}
                        addNewList={this.addNewList}
                        onSubmit={this.handleFormSubmit}/> */}
                </form>
            </div>
        );
    }
}

export default StoreState;
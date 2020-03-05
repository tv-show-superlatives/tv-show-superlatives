import React, { Component } from 'react';
import axios from 'axios';

class GeneralSearch extends Component {
    constructor(){
        super();
        this.state = {
            tv: []
        }
    }
   
    componentDidMount() {
        axios({
            url: `http://api.tvmaze.com/search/shows/`,
            method: 'GET',
            params: {
                language: 'English',
            }
        }).then(response => {
            const tv = response.data;
            this.setState({
            })
            console.log(tv)
        })
    }

    render() {
  
      return (
        <div>
            <p>dfdfd</p>
        </div>
      )
    }
  }
  
  
  export default GeneralSearch;
  
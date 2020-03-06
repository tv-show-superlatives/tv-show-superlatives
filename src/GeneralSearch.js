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
            url: `http://api.tvmaze.com/shows?`,
            method: 'GET',
            params: {
                page: 'X',
                language: 'English',
            }
        }).then(response => {
            const tv = response.data;
            this.setState({
            tv: tv,
            })
            console.log(tv)
            console.log(this.state.tv.name);
        })
    }

    render() {
        return (
            <div>
                {this.state.tv.map(show => {
                return (
                    <div key={show.id} className="tv-titles">
                        <h2>{`${show.name}`}</h2>
                        {/* <p>{`${show.summary}`}</p> */}
                        <p>{`${show.genres}`}</p>
                        {/* <p>{`${show.network.name}`}</p> */}
                        <p>Average Rating: {`${show.rating.average}`}</p>
                    

                        
                        <img src={`${show.image.medium}`} alt=""/>
                    </div>
                )
            })}
        </div>
      )
    }

    
  }
  
  
  export default GeneralSearch;
  
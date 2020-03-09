import React, { Component } from 'react';

class AddListToFirebase extends Component {
  constructor(props){
    super(props);
    this.state={
      tvShows:[],
      userInput:''
    }
    
  }
  


    render() {
        return(
          <div>
            <div>
            <button onClick={this.props.dummyData}>add list</button>
          </div>
            {
              this.props.tvShows.reverse().map(list => {
                return (
                  <ul key={list.key}>{list.info.name}
                  
                  {
                    list.info.shows.map(show => {
                      return <li key={show.id}>{show.name}</li>
                    })
                  }
                  <button onClick={this.props.addTvShow}>add to tv show</button>
                </ul>
                )
              })
            }

          </div>

        )
    }
}

export default AddListToFirebase
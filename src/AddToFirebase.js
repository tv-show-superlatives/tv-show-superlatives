import React, { Component } from 'react';


class AddToFirebase extends Component {
  

    render() {
        return(
          <div>
            <div>
            {/* <button onClick={this.props.dummyData}>click for dummy data</button> */}
          </div>
            {
              this.props.tvShows.map(list => {
                return (
                <ul key={list.id}>{list.name}
                  {
                    list.shows.map(show => {
                      return <li key={show.id}>{show.name}</li>
                    })
                  }
                </ul>
                )
              })
            }

          </div>

        )
    }
}

export default AddToFirebase
import React, { Component } from 'react';
import firebase from "./firebase"

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
            {/* <button className="badButton">add list</button> */}
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
                  <button onClick={() => {

                    const key = list.key
                    const dbRef = firebase.database().ref().child(key + '/shows')

                    dbRef.on('value', response => {
                      const prevList = response.val();
                      console.log(prevList)
                      const prevListCopy = [...prevList]
                      console.log(prevListCopy)
                      prevListCopy
                    })
                    console.log(dbRef)

                    // dbRef.update({
                    //   shows: 'a new show',
                    //   id: 2013
                    // })

                    }}>add to tv show</button>
                </ul>
                )
              })
            }

          </div>

        )
    }
}

export default AddListToFirebase
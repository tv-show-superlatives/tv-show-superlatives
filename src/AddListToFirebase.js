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
            {
              this.props.tvShows.reverse().map(list => {
                return (
                  <ul key={list.key}>{list.info.name}
                  
                  <button onClick={() => {
                    const key = list.key
                    console.log(key)
                    const dbRef = firebase.database().ref().child(key + '/')
                  }}>
                    why
                  </button>

                  {
                    list.info.shows.map(show => {
                      return <li key={show.id}>
                        {show.name}
                        {/* <button onClick={this.removeShow}>remove</button> */}
                        </li>
                    })
                  }
                  <button onClick={() => {

                    const key = list.key
                    const dataToPush = {
                      id: 1235,
                      name: 'bhlegnl?'
                    }
                    let prevListCopy;
                    const dbRef = firebase.database().ref().child(key + '/shows')

                    dbRef.on('value', response => {
                      const prevList = response.val();
                      prevListCopy = [...prevList];
                      prevListCopy.push(dataToPush);
                    })
                    
                    dbRef.update(prevListCopy);
                    

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
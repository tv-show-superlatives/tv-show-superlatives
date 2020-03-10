import React, { Component } from 'react';
import firebase from "./firebase";
import StoreState from "./StoreState"


class AddListToFirebase extends Component {

  constructor(props){
    super(props);
    this.state={
      tvShows:[],
      userInput:'',
      marginLeft:0
    }
  }

    
    render() {
        return(
          <div>
            <StoreState />
            {
              this.props.tvShows.reverse().map(list => {
                return (
                  <ul key={list.key}>{list.info.name}
                  
                  <button onClick={() => {
                    const key = list.key
                    // console.log(key)
                    const dbRef = firebase.database().ref().child(key + '/')
                    dbRef.remove()
                  }}>
                    remove
                  </button>

              
                  
                  {console.log(list.info.shows)}
                  {
                    (list.info.shows !== undefined) &&
                      list.info.shows.map(show => {
                        return <li key={show.key}>
                          {show.name}
                          <button onClick={() => {
                            const key = show.key
                            const listKey = list.key
                            // console.log(key)
                            // console.log(list.key)
                            const dbRef = firebase.database().ref().child(listKey + '/shows/' + key + '/')
                            // console.log(dbRef.key)
                            // dbRef.remove()
                          }}>remove</button>
                          </li>
                      })
                    }
                  
                  <button onClick={() => {

                    const key = list.key
                    const dataToPush = {
                      key: 1235,
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
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

              
                  
                  {/* {console.log(list.info.shows.length)} */}
                  {
                    (list.info.shows !== undefined) &&
                      list.info.shows.map((show, index) => {
                        return <li key={show.key}>
                          {show.name}
                          <button onClick={() => {
                            // const key = show.key
                            const listKey = list.key;
                            let showListCopy;
                            // console.log(show)
                            const dbRef = firebase.database().ref().child(listKey + '/shows/' + index + '/')
                              // const dbRef = firebase.database.ref()
                              // console.log(dbRef)
                              // console.log(key)

                              
                            dbRef.on('value', response => {
                              console.log(list.info.shows);
                              console.log(index);
                              const showList = list.info.shows;
                              showListCopy = [...showList];
                              console.log(showListCopy)
                              showListCopy.splice(index, 1)
                              console.log(showListCopy)
                              console.log(response)
                            })
                            console.log(showListCopy)
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
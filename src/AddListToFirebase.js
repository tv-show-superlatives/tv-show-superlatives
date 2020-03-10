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
                    const dbRef = firebase.database().ref().child(key + '/')
                    dbRef.remove()
                  }}>
                    remove list
                  </button>

              
                  
                  {
                    (list.info.shows !== undefined) &&
                      
                      list.info.shows.filter(show => show.name !== 'none').map((show, index) => {
                        return <li key={show.key}>
                          {show.name}
                          <button onClick={() => {
                            const listKey = list.key;
                            let showListCopy;
                            const dbRef = firebase.database().ref().child(listKey + '/shows/' + index + '/')
                            
                            
                            dbRef.on('value', response => {
                              console.log(response.val())
                              const showList = list.info.shows;
                              showListCopy = [...showList];
                              showListCopy.splice(index, 1)
                            })
                            console.log(showListCopy)


                            const otherDbRef = firebase.database().ref().child(listKey +   '/shows/')
                            otherDbRef.set(showListCopy)
                            
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
                    

                    }}>add to list</button>
                </ul>
                )
              })
            }

          </div>

        )
    }
}

export default AddListToFirebase
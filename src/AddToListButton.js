import React, { Component } from 'react';
import firebase from 'firebase';

class AddToListButton extends Component {
    handleClick = () => {
        const dbRef = firebase.database().ref(this.props.newListPage);
        
        const showToAdd = {
            name: this.props.showName,
            key: this.props.showId,
        }

        if (this.props.currentListObj.shows === undefined) {
            this.props.currentListObj.shows = []
            this.props.currentListObj.shows.push(showToAdd)
            console.log('current show added', this.props.currentListObj)
            dbRef.set(this.props.currentListObj)
        } else {
            this.props.currentListObj.shows.push(showToAdd)
            console.log('current show added', this.props.currentListObj)
            dbRef.set(this.props.currentListObj)
        }
    }

    render() {
        return (
            <button 
            onClick={this.handleClick}
            className="addToList">
                add to list
            </button>
        )
    }
}

export default AddToListButton;
import React, { Component } from "react";


class UpVote extends Component {
    constructor() {
		super();
		this.state = {
			count: 0,
		};
    }

    handleClickUpVote = () => {
	    this.setState({
            count: this.state.count + 1
        }, () => {
            const dataToBePushed = {
                count: this.state.count,
                name: this.props.showName
            }
            // this.props.objectArray(dataToBePushed);
        })
        

        }
        
        render() {
            return (
                <li>
					<button onClick={this.handleClickUpVote}>Up Vote    </button>
					<img
					src={this.state.officialImage}
					alt={`${this.props.showName}`}
					/>
				</li>
            )
        }


}







export default UpVote;
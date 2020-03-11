import React, { Component } from "react";
import axios from "axios";
import {
	BrowserRouter as Router,
	Route,
	Link,
	NavLink
} from "react-router-dom";
import TvShowDetails from "./TvShowDetails";
import GeneralSearch from "./GeneralSearch";
import NewListPage from "./NewListPage";

class Nav extends Component {
	constructor(){
	super();

	this.state={
		tvShows:[],
		userInput:'',
		list: [],
    	}
	}

	render() {
    	return (
			<div>
				<div>
				<Link to="/"><h1>TV PARTY</h1></Link>
					
				</div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/GeneralSearch/">General Search</Link>
						</li>
						{/* <li>
							<Link to="/NewListPage/">New List</Link>
						</li> */}
					</ul>
				</nav>
				<Route path="/GeneralSearch/" component={GeneralSearch} />
				<Route path="/NewListPage/" component={NewListPage} />
			</div>
		);
	}
}  

export default Nav;
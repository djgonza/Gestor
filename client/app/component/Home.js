import React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import Document from './Document';

export default class Home extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			user: global.user
		}
	}

	render () {

		return <div>

			<NavBar></NavBar>
			<SideBar></SideBar>
			<Document></Document>

		</div>;

	}

}
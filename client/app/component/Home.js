import React from 'react';
import Immutable from 'immutable';
import SideBar from './Sidebar/SideBar';
import Wrapper from './Wrapper/Wrapper';

export default class Home extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render () {

		return (<div className="row">

			<SideBar></SideBar>
			<Wrapper></Wrapper>

		</div>)

	}

}
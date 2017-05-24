import React from 'react';

export default class DroopDownFields extends React.Component {
	
	constructor(props) {
		super(props);

	}

	render () {

		return (<div className="col s12">
			<a data-activates='dropdownFields' className='dropdown-button waves-effect waves-light btn col s12 blue'><i className="material-icons right">keyboard_arrow_down</i> Campos</a>
			<ul id="dropdownFields" className='dropdown-content'>
				<li><a>one</a></li>
				<li><a>two</a></li>
				<li className="divider"></li>
				<li><a>three</a></li>
				<li><a><i className="material-icons blue">view_module</i>four</a></li>
				<li><a><i className="material-icons blue">cloud</i>five</a></li>
			</ul>
		</div>)

	}

}
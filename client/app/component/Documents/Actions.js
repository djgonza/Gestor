import React from 'react';

export default class Actions extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			confirmRemove: false
		}

		this.aStyle = {
			marginRight: '1rem',
			zIndex: 998
		};
		this.divStyle = {
			marginTop: '1rem'
		};

		this.showFields = this.showFields.bind(this);

	}

	showFields () {
		this.props.showFields(true);
	}

	render () {

		return (
			<div className="row" style={this.divStyle}>
				<a onClick={this.props.delete} className="btn-floating red" style={this.aStyle}>
					<i className="material-icons">delete</i>
				</a>
				<a onClick={this.showData} className="btn-floating purple" style={this.aStyle}>
					<i className="material-icons">assessment</i>
				</a>
				<a onClick={this.showView} className="btn-floating teal" style={this.aStyle}>
					<i className="material-icons">description</i>
				</a>
				<a onClick={this.showFields} className="btn-floating green" style={this.aStyle}>
					<i className="material-icons">receipt</i>
				</a>
			</div>
		)

	}

	
}
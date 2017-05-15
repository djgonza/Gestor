import React from 'react';
import Actions from './Actions';
import Fields from './Fields/Fields';

export default class Document extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			actions: false,
			fields: false
		}

		this.showActions = this.showActions.bind(this);
		this.delete = this.delete.bind(this);
		this.showFields = this.showFields.bind(this);

	}

	showActions (e) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			actions: !this.state.actions
		});
	}

	showFields (status) {
		this.setState({
			fields: status
		});
	}

	delete () {
		$.ajax({
			method: "DELETE",
			url: "http://localhost:5000/document",
			headers: {
				token: localStorage.getItem('token')
			},
			data: {
				id: this.props.id
			}
		})
		.done((res) => {

			this.props.delete(this.props.id);

		})
		.fail(function(xhr, status, error) {
			console.log(xhr.status);
			console.log(status);
			console.log(error);
		});
	}

	edit () {

	}

	render () {

		return (
			<li onClick={this.showActions} className="collection-item avatar">
				<i className="material-icons circle">folder</i>
				<span className="title">{this.props.name}</span>
				<a className="secondary-content"><i className="material-icons">send</i></a>
				{
					this.state.actions ? <Actions showFields={this.showFields} delete={this.delete} ></Actions> : null
				}
				{
					this.state.fields ? <Fields showFields={this.showFields} id={this.props.id}></Fields> : null
				}
			</li>)

	}

	
}
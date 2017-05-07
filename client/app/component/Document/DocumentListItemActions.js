import React from 'react';
import Confirm from './../common/Confirm';

export default class DocumentListItemActions extends React.Component {
	
	constructor(props) {

		super(props);
		this.state = {
			deleteConfirm: false,

		}

		this.aStyle = {
			marginRight: '1rem',
			zIndex: 998
		};

		this.divStyle = {
			marginTop: '1rem'
		};

		this.actionDelete = this.actionDelete.bind(this);
		this.edit = this.edit.bind(this);
		this.showSchema = this.showSchema.bind(this);
		this.showView = this.showView.bind(this);
		this.showData = this.showData.bind(this);

		this.setDeleteConfirm = this.setDeleteConfirm.bind(this);
		this.deleteFinal = this.deleteFinal.bind(this);

	}

	deleteFinal (confirm) {
		if(confirm){
			this.props.delete();
		}
		this.setDeleteConfirm(false);
	}

	/* Getters and Setters */
	setDeleteConfirm (status) {
		this.setState({
			deleteConfirm: status
		});
	}

	/* Actions */
	actionDelete (e) {
		e.preventDefault();
		e.stopPropagation();
		this.setDeleteConfirm(true);
	}

	edit (e) {
		e.preventDefault();
		e.stopPropagation();
	}

	showSchema (e) {
		e.preventDefault();
		e.stopPropagation();
	}

	showView (e) {
		e.preventDefault();
		e.stopPropagation();
	}

	showData (e) {
		e.preventDefault();
		e.stopPropagation();
	}

	render () {

		return (<div className="row" style={this.divStyle}>
			<a onClick={this.actionDelete} className="btn-floating red" style={this.aStyle}>
				<i className="material-icons">delete</i>
			</a>
			<a onClick={this.edit} className="btn-floating blue" style={this.aStyle}>
				<i className="material-icons">mode_edit</i>
			</a>
			<a onClick={this.showData} className="btn-floating purple" style={this.aStyle}>
				<i className="material-icons">assessment</i>
			</a>
			<a onClick={this.showView} className="btn-floating teal" style={this.aStyle}>
				<i className="material-icons">description</i>
			</a>
			<a onClick={this.showSchema} className="btn-floating green" style={this.aStyle}>
				<i className="material-icons">receipt</i>
			</a>
			{
				this.state.deleteConfirm ? <Confirm msg={`¿Desea eliminar el documento ${this.props.name}?`} confirm={this.deleteFinal}></Confirm> : null
			}
		</div>)


	}

}
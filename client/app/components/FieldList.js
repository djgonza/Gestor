import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Field from './Field';
import Modal from './Modal'
import CreateField from './../Actions/Create/CreateField';
import ForceUpdateState from './../Actions/ForceUpdateState';

class FieldList extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			createField: false,
			editField: false
		}

		this.editField = this.editField.bind(this);
		this.editedField = this.editedField.bind(this);
		this.createdField = this.createdField.bind(this);
		this.removeField = this.removeField.bind(this);

	}

	editField (fieldId) {
		this.setState({
			editField: {
				data: this.props.fields.get(fieldId),
				id: fieldId
			}
		});
	}

	editedField (returnedInputs) {
		console.log('edited field', returnedInputs);
	}

	createdField (returnedInputs) {
		CreateField({
			name: returnedInputs[0].value,
			type: returnedInputs[1].value
		}, this.props.bookIndex);
		ForceUpdateState();
	}

	removeField (fieldId) {
		console.log('removeField ->', fieldId);
	}

	mountModalEditField () {

		let name = {
			type: 'text', 
			value: this.state.editField.data.name, 
			name: 'name',
			label: 'Nombre'
		}

		let type = {
			type: 'select',
			value: this.state.editField.data.type,
			name: 'type',
			label: 'Selecciona un tipo',
			options: [
				{name: 'Time', value: 'time'},
				{name: 'Numero', value: 'number'},
				{name: 'Texto', value: 'text'}
			]
		}

		let inputs = [name, type];

		return (<Modal 
			header='Editar Campo'
			close={() => {this.setState({editField: false})}} 
			save={this.editedField} 
			inputs={inputs} />);

	}

	mountModalCreateField () {
		
		let name = {
			type: 'text', 
			value: '', 
			name: 'name',
			label: 'Nombre'
		}

		let type = {
			type: 'select',
			value: 'time',
			name: 'type',
			label: 'Selecciona un tipo',
			options: [
				{name: 'Time', value: 'time'},
				{name: 'Numero', value: 'number'},
				{name: 'Texto', value: 'text'}
			]
		}

		let inputs = [name, type];

		return (<Modal 
			header='Nuevo Campo'
			close={() => {this.setState({createField: false})}} 
			save={this.createdField} 
			inputs={inputs} />);
	}

	mountField (field, key) {
		return <Field 
				key={key} 
				id={key}
				name={field.name}
				type={field.type}
				editField={this.editField} />
	}

	mountAllFields () {

		if(this.props.fields) {
			
			return this.props.fields.map ((field, key) => {
				return this.mountField (field, key);
			});

		}

	}

	render () {

		if(!this.props.fields){
			return null;
		}

		return (<div className="row">
			{ this.state.editField ? this.mountModalEditField() : null }
			{ this.state.createField ? this.mountModalCreateField() : null }
			<a onClick={() => {this.setState({createField: true})}} className="waves-effect waves-light btn col s12">
				<i className="material-icons right">note_add</i>
				Campos
			</a>
			<ul className="collection">
				{ this.mountAllFields() }
			</ul>
		</div>);

	}

}

const mapStateToProps = (state) => {
	let fields = null;
	let bookIndex = state.selectedBook ? state.selectedBook.bookIndex : null;
	if(state.selectedBook){
		fields = state.books.get(state.selectedBook.bookIndex).fields;
	}
	return {
		fields,
		bookIndex  
	}
}

export default connect(mapStateToProps)(FieldList);

import React from 'react';
import Immutable from 'immutable';

export default class FieldList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			documentId: this.props.documentId,
			fields: Immutable.List(),
			create: false,
			remove: false,
			edit: false
		}

		this.addField = this.addField.bind(this);

	}

	loadFields (documentId, cb) {
		
		let self = this;

		$.ajax({
			method: "GET",
			url: `http://localhost:5000/document/${documentId}/fields`,
			headers: {
				token: localStorage.getItem('token')
			}
		})
		.done((res, status, xhr) => {

			if(xhr.status != 200) {
				console.log('err fields');
			}

			cb(res.fields);

		})
		.fail(function(xhr, status, error) {
			
		});

	}

	addField (field) {
		//TODO: send field to server and update state
		this.setState({
			fields: this.state.fields.push(field)
		});
	}

	removeField (id) {
		//TODO
	}

	editField (id, newField) {

	}

	componentWillReceiveProps(nextProps) {
		
		let self = this;

		this.loadFields(nextProps.documentId, (fields) => {
			this.setState({
				documentId: nextProps.documentId,
				fields: fields
			});
		});

	}

	componentDidMount() {

		let self = this;

		this.loadFields(this.state.documentId, (fields) => {
			fields.map((field) => {
				self.setState({
					fields: self.state.fields.push(field)
				});
			});
		})

	}

	render () {

		return (<div>

			<DropdownFields create={() => { this.setState({create: true})}}></DropdownFields>
			<ul className="collection" style={{'margin': '0'}}>
			{
				this.state.fields.map((field, key) => {
					return <li key={key} id={key} className="collection-item">{field.name}</li>
				})
			}
			</ul>
			{
				this.state.create ? <ModalFields addField={this.addField} close={() => {this.setState({create: false})}}></ModalFields> : null
			}
		</div>);

	}

}


class DropdownFields extends React.Component {
	
	constructor(props) {

		super(props);

	}

	render () {

		return (<div className="col s12">

			<a className='dropdown-button' data-activates='fieldsListDropdown'>
				<label>Fields</label>
				<i className="material-icons">keyboard_arrow_down</i>
			</a>
			<ul id='fieldsListDropdown' className='dropdown-content'>
				<li>
					<a onClick={this.props.create}>
						<i className="material-icons">note_add</i> 
						Field
					</a>
				</li>
				<li className="divider"></li>
			</ul>

		</div>);

	}

}


class ModalFields extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			type: ''
		}

		this.close = this.close.bind(this);
		this.save = this.save.bind(this);
		this.validate = this.validate.bind(this);
		this.handleChange = this.handleChange.bind(this);

	}

	validate () {
		if(this.state.name == ''){
			return false;
		}

		if(this.state.type == ''){
			return false;
		}

		return true;
	}

	save () {

		console.log('save');

		let self = this;

		if(!self.validate()){
			return false;
		}

		self.props.addField (self.state);
		self.close();

		/*$.ajax({
			method: "POST",
			url: "http://localhost:5000/document/field",
			headers: {
				token: localStorage.getItem('token')
			},
			data: {
				document: '',
				name: self.state.name,
				type: self.state.type
			}
		})
		.done((res) => {
			self.props.addField (res);
			self.close();

		})
		.fail(function(xhr, status, error) {
			
		});*/

	}

	componentDidMount() {

		$(this.modal).modal({
			dismissible: false,
			opacity: .5,
			inDuration: 300,
			outDuration: 200,
			startingTop: '4%',
			endingTop: '10%',
			ready: function(modal, trigger) { 
				
			},
			complete: function() { 
				
			}
		}).modal('open');

		$(this.select).on('change', this.handleChange).material_select();

	}

	handleChange(e) {
		console.log('change', e.target.name);
		this.setState({[e.target.name]: e.target.value});
	}

	close () {
		$(this.modal).modal('close');
		this.props.close();
	}

	render () {

		return (<div ref={(modal) => {this.modal = modal}} className="modal modal-fixed-footer">
			<div className="modal-content">
				<div className="input-field col s12">
					<input type="text" name="name" className="validate" onChange={this.handleChange} value={this.state.name} />
					<label>Nombre</label>
				</div>
				<div className="input-field col s12">
					<select value={this.state.type} name="type" ref={(select) => {this.select = select}}>
						<option value="" disabled>Selecciona un tipo</option>
						<option value="date">Fecha</option>
						<option value="number">Numero</option>
						<option value="string">Texto</option>
					</select>
					<label>Tipo</label>
				</div>
			</div>
			<div className="modal-footer">
				<a onClick={this.close} className="modal-action waves-effect waves-green btn-flat red">Cerrar</a>
				<a onClick={this.save} className="modal-action waves-effect waves-green btn-flat green">Guardar</a>
			</div>
		</div>);

	}

}
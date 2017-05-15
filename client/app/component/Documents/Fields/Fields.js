import React from 'react';
import Immutable from 'immutable';

export default class Fields extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			fields: Immutable.List()
		}

		this.addField = this.addField.bind(this);
		this.removeField = this.removeField.bind(this);
		this.updateField = this.updateField.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.save = this.save.bind(this);

		this.addBtnStyle = {
			position: 'absolute',
		    top: '2%',
		    right: '2%',
		}
	}

	componentDidMount() {

		let self = this;

		$(self.modal)
		.modal({
			dismissible: false, 
			opacity: .5, 
			inDuration: 300, 
			outDuration: 200, 
			startingTop: '4%', 
			endingTop: '10%'
		})
		.modal('open');

		$.ajax({
			method: "GET",
			url: "http://localhost:5000/fields",
			headers: {
				token: localStorage.getItem('token'),
				id: self.props.id
			}
		})
		.done((res) => {

			res.fields.map((field) => {
				self.setState({
					fields: self.state.fields.push(field)
				});
			});

			self.state.fields.map((field) => {console.log(field)});

		})
		.fail(function(xhr, status, error) {
			
		});

	}

	save () {

		let self = this;

		$.ajax({
			method: "POST",
			url: "http://localhost:5000/fields",
			headers: {
				token: localStorage.getItem('token')
			},
			data: {
				id: this.props.id,
				fields: this.state.fields
			}
		})
		.done((res) => {

			self.closeModal ();

		})
		.fail(function(xhr, status, error) {
			
		});
	}

	addField (e) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			fields: this.state.fields.push({
				name: '',
				type: ''
			})
		});

		$('select').material_select();

	}

	removeField (i) {
		this.setState({
			fields: this.state.fields.delete(i)
		});
	}

	updateField (i, newName, newType) {
		console.log('update', i, newName, newType);
		/*this.setState({
			fields: this.state.fields.set(i, newField)
		})*/
	}

	closeModal () {
		$(this.modal).modal('close');
		this.props.showFields(false);
	}

	render () {

		let fields = this.state.fields.map((field, i) => {
			return (<div className="row" key={i}>
				<div className="input-field col s5">
					<label>Nombre</label>
					<input value={field.value} onChange={(e) => {this.updateField(i, e.target.value, null)}} type="text" className="validate" />
				</div>
				<div className="input-field col s5">
	          		<select 
	          			value={field.type} 
	          			ref={(select) => {$(select).on('change', (e) => {this.updateField(i, null, e.target.value) }).material_select()}}>
							<option value="" disabled>Seleccione un tipo</option>
							<option value="1">Option 1</option>
							<option value="2">Option 2</option>
							<option value="3">Option 3</option>
					</select>
					<label>Tipo</label>
				</div>
				<div className="col s2">
					<a onClick={() => {this.removeField(i)}} className="btn-floating waves-effect waves-light red">
						<i className="material-icons">remove</i>
					</a>
				</div>
			</div>)		
		});

		return (<div ref={(modal) => {this.modal = modal}} className="modal modal-fixed-footer">
			<div className="modal-content">
				<h4>Schema</h4>
				<a onClick={this.addField} style={this.addBtnStyle}  className="btn-floating btn-large waves-effect waves-light green right">
					<i className="material-icons">add</i>
				</a>
				<div className="row">
					{fields}
				</div>
			</div>
			<div className="modal-footer">
				<a onClick={this.save} className="modal-action waves-effect waves-green btn-flat ">Guardar</a>
				<a onClick={this.closeModal} className="modal-action waves-effect waves-green btn-flat modal-close">Salir</a>
			</div>
		</div>)

	}

}
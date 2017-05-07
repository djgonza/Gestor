import React from 'react';

export default class Create extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			type: 0
		}
		this.handleChange = this.handleChange.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.save = this.save.bind(this);
	}

	componentDidMount() {
		$(this.modal)
		.modal({
			dismissible: false, 
			opacity: .5, 
			inDuration: 300, 
			outDuration: 200, 
			startingTop: '4%', 
			endingTop: '10%'
		})
		.modal('open');

		$(this.select)
		.on('change', (e) => {
			this.handleChange(e);
		})
		.material_select();
	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	closeModal () {
		$(this.modal).modal('close');
		this.props.show(false);
	}

	save () {

		let self = this;

		$.ajax({
			method: "POST",
			url: "http://localhost:5000/document",
			headers: {
				token: localStorage.getItem('token')
			},
			data: this.state
		})
		.done((res) => {
			self.props.addDocument(res);
			self.closeModal();
		})
		.fail(function(xhr, status, error) {
			console.log(xhr, status, error);
		});
	}

	render () {

		return <div ref={(modal) => {this.modal = modal}} className="modal modal-fixed-footer">
			<div className="modal-content">
				<h4>Nuevo Documento</h4>
				<div className="row">
					<div className="input-field col s12">
						<input type="text" name="name" className="validate" onChange={this.handleChange} value={this.state.name} />
						<label>Nombre</label>
					</div>
					<div className="input-field col s12">
						<select ref={(select) => {this.select = select}} name="type" value={this.state.type}>
							<option value="0" disabled>Choose your option</option>
							<option value="1">Tabla</option>
							<option value="2">Option 2</option>
							<option value="3">Option 3</option>
						</select>
						<label>Tipo</label>
					</div>
				</div>
			</div>
			<div className="modal-footer">
				<a onClick={this.save} className="modal-action waves-effect waves-green btn-flat ">Guardar</a>
				<a onClick={this.closeModal} className="modal-action waves-effect waves-green btn-flat modal-close">Salir</a>
			</div>
		</div>;

	}

}
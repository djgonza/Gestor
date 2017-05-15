import React from 'react';

export default class GeneralActions extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			create: false
		}

		this.showCreate = this.showCreate.bind(this);

	}

	showCreate () {
		this.setState({
			create: true
		});
	}

	render () {

		return (<div>
			<div className="fixed-action-btn horizontal click-to-toggle">
				
				<a className="btn-floating btn-large red">
					<i className="material-icons">menu</i>
				</a>
				<ul>
					<li><a onClick={this.showCreate} className="btn-floating red"><i className="material-icons">insert_chart</i></a></li>
					<li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
					<li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
					<li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
				</ul>
				
			</div>
			{ 
				this.state.create ? <Create addDocument={this.props.addDocument} show={() =>{this.setState({create: false})}}></Create> : null
			}
			</div>)
	}
	
}

class Create extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			name: ''
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

	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	closeModal () {
		$(this.modal).modal('close');
		this.props.show(false);
	}

	validate () {

		if(this.state.name == ""){
			return false;
		}

		return true;

	}

	save () {

		let self = this;

		if(this.validate()){

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
				</div>
			</div>
			<div className="modal-footer">
				<a onClick={this.save} className="modal-action waves-effect waves-green btn-flat ">Guardar</a>
				<a onClick={this.closeModal} className="modal-action waves-effect waves-green btn-flat modal-close">Salir</a>
			</div>
		</div>;

	}

}


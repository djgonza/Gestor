import React from 'react';
import Immutable from 'immutable';

export default class DocumentList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			documents: Immutable.List(),
			selected: null,
			create: false,
			remove: false,
			edit: false
		}

		this.clickElement = this.clickElement.bind(this);

	}

	addDocument (document) {
		//TODO
	}

	removeDocument (id) {
		//TODO
	}

	editDocument (id, newDocument) {

	}

	clickElement (e){

		let id = e.target.id;

		e.preventDefault();
		e.stopPropagation();
		this.setState({
			active: id
		});
		this.props.selectedDocument(this.state.documents.get(id)._id);

	}

	componentDidMount() {

		let self = this;

		$.ajax({
			method: "GET",
			url: "http://localhost:5000/documents/names",
			headers: {
				token: localStorage.getItem('token')
			}
		})
		.done((res, status, xhr) => {

			if(xhr.status != 200) {
				console.log('err documents');
			}

			res.map((document) => {
				self.setState({
					documents: self.state.documents.push(document)
				});
			});

		})
		.fail(function(xhr, status, error) {
			
		});

	}

	render () {

		return (<ul className="collection" style={{'margin': '0'}}>
			{
				this.state.documents.map((document, key) => {
					return <li 
						key={key} 
						id={key} 
						onClick={this.clickElement} 
						className={
							this.state.active == key ?
								"collection-item active light-blue darken-4" 
								: 
								"collection-item"
							}
						>
							{document.name}
						</li>
				})
			}
			</ul>);

	}

}

class ModalDocument extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: ''
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

		return true;
	}

	save () {

		console.log('save');

		let self = this;

		if(!self.validate()){
			return false;
		}

		self.props.action (this.state);
		self.close();

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

	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	close () {
		$(this.modal).modal('close');
		this.props.close();
	}

	render () {

		//<a class="waves-effect waves-light btn" href="#modal1">Modal</a>

		return (<div ref={(modal) => {this.modal = modal}} className="modal">
			<div className="modal-content">
				<div className="input-field col s12">
					<input type="text" name="name" className="validate" onChange={this.handleChange} value={this.state.name} />
					<label>Nombre</label>
				</div>
			</div>
			<div className="modal-footer">
				<a onClick={this.close} className="modal-action waves-effect waves-green btn-flat red">Cerrar</a>
				<a onClick={this.save} className="modal-action waves-effect waves-green btn-flat green">Guardar</a>
			</div>
		</div>);

	}
}

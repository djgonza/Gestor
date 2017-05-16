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
		this.addDocument = this.addDocument.bind(this);

	}

	addDocument (document) {
		this.setState({
			documents: this.state.documents.push(document);
		});
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

		/* Dropdown */
		$(this.dropdownDocumentList).dropdown({
			inDuration: 300,
			outDuration: 225,
			constrainWidth: false, 
			hover: false, 
			gutter: 0, 
			belowOrigin: false, 
			alignment: 'left',
			stopPropagation: true 
		});

	}

	render () {

		return (<div>
			<a ref={(dropdownDocumentList) => {this.dropdownDocumentList = dropdownDocumentList}} 
			className='dropdown-button btn' 
			data-activates='dropdownDocumentList'>
				Documentos
			</a>
			<ul id='dropdownDocumentList' className='dropdown-content'>
				<li>
					<a onClick={() => {this.setState({create: true})}}>
						<i className="material-icons">create_new_folder</i>
						Documento
					</a>
				</li>
			</ul>
			<ul className="collection" style={{'margin': '0'}}>
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
			</ul>
			{
				this.state.create ? <CreateDocument close={() => {this.setState({create: false})}} add={(document) => {this.addDocument(document)}}></CreateDocument> : null
			}
			</div>);

	}

}

class CreateDocument extends React.Component {

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
			//MSG error!
			return false;
		}

		$.ajax({
			method: "POST",
			url: "http://localhost:5000/documents",
			headers: {
				token: localStorage.getItem('token')
			},
			data: this.state
		})
		.done((res, status, xhr) => {

			if(xhr.status != 200) {
				console.log('err documents');
			}

			self.props.add ({name: res.name, _id: res._id});
			self.close();

		})
		.fail(function(xhr, status, error) {
			
		});

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

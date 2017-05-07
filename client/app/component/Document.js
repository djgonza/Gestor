import React from 'react';
import Immutable from 'immutable';
import DocumentActions from './Document/DocumentActions';
import DocumentList from './Document/DocumentList';

export default class Document extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			documents: Immutable.List()
		}

		this.addDocument = this.addDocument.bind(this);
		this.deleteDocument = this.deleteDocument.bind(this);
		this.getAllDocuments = this.getAllDocuments.bind(this);

	}

	componentDidMount() {
		this.getAllDocuments();
	}

	getAllDocuments () {
		$.ajax({
			method: "GET",
			url: "http://localhost:5000/document",
			headers: {
				token: localStorage.getItem('token')
			}
		})
		.done((res) => {

			let self = this;

			//Añadimos los documentos nuevos
			res.map((document) => {
				self.addDocument(document);
			});

		})
		.fail(function(xhr, status, error) {
			
		});
	}

	addDocument (newDocument) {

		//Actualizamos el state con el nuevo documento
		this.setState({
			documents: this.state.documents.push(newDocument)
		});
	}

	deleteDocument (id) {

		$.ajax({
			method: "DELETE",
			url: "http://localhost:5000/document",
			headers: {
				token: localStorage.getItem('token')
			},
			data: {
				id: id
			}
		})
		.done((res) => {

			console.log('res delete', res);

			var index = this.state.documents.findIndex((doc, i) => {
				return doc._id === id
			});
			this.setState({
				documents: this.state.documents.delete(index)
			});

		})
		.fail(function(xhr, status, error) {
			console.log(xhr.status);
			console.log(status);
			console.log(error);
		});

	}

	render () {

		return <div className="row">

		<h2>Documentos</h2>

		<DocumentActions addDocument={this.addDocument}></DocumentActions>
		<DocumentList deleteDocument={this.deleteDocument} documents={this.state.documents}></DocumentList>

		</div>;

	}

}
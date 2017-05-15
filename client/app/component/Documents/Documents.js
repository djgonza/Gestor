import React from 'react';
import Immutable from 'immutable';
import Document from './Document';
import GeneralActions from './GeneralActions';

export default class Documents extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			documents: Immutable.List(),
			create: false
		}

		this.removeDocument = this.removeDocument.bind(this);
		this.addDocument = this.addDocument.bind(this);

	}

	componentDidMount() {
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

	addDocument (document) {
		this.setState({
			documents: this.state.documents.push(document)
		});
	}

	removeDocument (id) {
		var index = this.state.documents.findIndex((doc, i) => {
			return doc._id === id
		});
		this.setState({
			documents: this.state.documents.delete(index)
		});
	}

	editDocument (id, newDocument) {

	}

	render () {

		return (<div>
			<ul className="collection">
				{
					this.state.documents.map((document, key) => {
						return <Document delete={this.removeDocument} key={key} name={document.name} id={document._id}></Document>
					})
				}
			</ul>
			<GeneralActions addDocument={this.addDocument}></GeneralActions>
		</div>)

	}

	
}
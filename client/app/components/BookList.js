import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Book from './Book';
import Modal from './Modal';
import CreateBook from './../Actions/Create/CreateBook';
import EditBook from './../Actions/Edit/EditBook';
import RemoveBook from './../Actions/Remove/RemoveBook';

import CreateField from './../Actions/Create/CreateField';

class BookList extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			createBook: false,
			editBook: false
		}

		this.editBook = this.editBook.bind(this);
		this.editedBook = this.editedBook.bind(this);
		this.createdBook = this.createdBook.bind(this);
		this.removeBook = this.removeBook.bind(this);

		//TEMPORAL
		CreateBook({
			fields: Immutable.List(),
			pages: Immutable.List(),
			name: "Primer Libro"
		});

		CreateBook({
			fields: Immutable.List(),
			pages: Immutable.List(),
			name: "Segundo Libro"
		});

		CreateBook({
			fields: Immutable.List(),
			pages: Immutable.List(),
			name: "Tercer Libro"
		});

		CreateField({
			name: 'Field 1',
			type: 'String'
		}, 0);

		CreateField({
			name: 'Field 2',
			type: 'Date'
		}, 0);

	}

	editBook (bookId) {
		this.setState({
			editBook: {
				data: this.props.books.get(bookId),
				id: bookId
			}
		});
	}

	removeBook (bookId) {
		if(confirm("¿Eliminar el libro?")) RemoveBook(bookId);
	}

	mountModalEditBook () {
		
		let inputs = [{
			type: 'text', 
			value: this.state.editBook.data.name, 
			name: 'name'
		}];

		return (<Modal 
			close={() => {this.setState({editBook: false})}} 
			save={this.editedBook} 
			inputs={inputs} />);
	}

	editedBook (returnedInputs) {
		
		let newBook = {
			name: returnedInputs[0].value,
			fields: this.state.editBook.data.fields,
			pages: this.state.editBook.data.pages
		}

		EditBook(newBook, this.state.editBook.id);

	}

	mountModalCreateBook () {
		
		let inputs = [{
			type: 'text', 
			value: '', 
			name: 'name',
			label: 'Nombre del libro'
		}];

		return (<Modal 
			close={() => {this.setState({createBook: false})}} 
			save={this.createdBook} 
			inputs={inputs} />);
	}

	createdBook (returnedInputs) {

		CreateBook({
			fields: Immutable.List(),
			pages: Immutable.List(),
			name: returnedInputs[0].value
		});

	}

	mountBook (book, key) {
		return <Book 
			key={key} 
			id={key}
			name={book.name}
			fields={book.fields}
			pages={book.pages}
			editBook={this.editBook}
			removeBook={this.removeBook}>
		</Book>
	}

	mountAllBook () {
		return this.props.books.map((book, key) => {
			return this.mountBook(book, key)
		});
	}

	render () {

		return (<div className="row">
			{ this.state.editBook ? this.mountModalEditBook() : null }
			{ this.state.createBook ? this.mountModalCreateBook() : null }
			<a onClick={() => {this.setState({createBook: true})}} className="btn btn-primary col-12">
				<i className="material-icons right">note_add</i>
				Libros
			</a>
			<ul className="list-group col-12">
				{ this.mountAllBook() }	
			</ul>
		</div>);

	}

}

const mapStateToProps = (state) => {
	return {
		books: state.books
	}
}

export default connect(mapStateToProps)(BookList);

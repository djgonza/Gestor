import React from 'react';
import { connect } from 'react-redux';
import Book from './Book';


import Immutable from 'immutable';
import CreateBook from './../Actions/Create/CreateBook';
import CreateField from './../Actions/Create/CreateField';

class BookList extends React.Component {
	
	constructor(props) {
		super(props);

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

	render () {

		return (<ul className="collection">
			
			{
				this.props.books.map((book, key) => {
					return <Book 
							key={key} 
							id={key}
							name={book.name}
							fields={book.fields}
							pages={book.pages}>
						   </Book>
				})
			}

		</ul>);

	}

}

const mapStateToProps = (state) => {
	return {
		books: state.books
	}
}

export default connect(mapStateToProps)(BookList);



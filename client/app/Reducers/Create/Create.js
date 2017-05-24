import Immutable from 'immutable';
import CreateBook from './CreateBook';
import CreateField from './CreateField';
import CreatePage from './CreatePage';

const Create = (books = Immutable.List(), action) => {

	switch (action.type) {

		case 'CREATE_BOOK': 
			return CreateBook(books, action);
		break;

		case 'CREATE_FIELD': 
			let newFields = CreateField(books.get(action.data.bookIndex).fields, action);
			books.get(action.data.bookIndex).fields = newFields;
			return books;
		break;

		case 'CREATE_PAGE': 
			let newPages = CreatePage(books.get(action.data.bookIndex).pages, action);
			books.get(action.data.bookIndex).pages = newPages;
			return books;
		break;

		default:
			return books;
	}

}

export default Create;
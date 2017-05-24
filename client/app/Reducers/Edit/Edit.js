import Immutable from 'immutable';
import EditBook from './EditBook';
import EditField from './EditField';
import EditPage from './EditPage';

const Edit = (books = Immutable.List(), action) => {

	switch (action.type) {

		case 'EDIT_BOOK': 
			return EditBook(books, action);
		break;

		case 'EDIT_FIELD': 
			let newFields = EditField(books.get(action.data.bookIndex).fields, action);
			books.get(action.data.bookIndex).fields = newFields;
			return newFields;
		break;

		case 'EDIT_PAGE': 
			let newPages = EditPage(books.get(action.data.bookIndex).page, action);
			books.get(action.data.bookIndex).page = newPages;
			return newPages;
		break;

		default:
			return books;
	}

}

export default Edit;
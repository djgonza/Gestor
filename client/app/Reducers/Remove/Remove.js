import Immutable from 'immutable';
import RemoveBook from './RemoveBook';
import RemoveField from './RemoveField';
import RemovePage from './RemovePage';

const Remove = (books = Immutable.List(), action) => {

	switch (action.type) {

		case 'REMOVE_BOOK': 
			return RemoveBook(books, action);
		break;

		case 'REMOVE_FIELD': 
			let newFields = RemoveField(books.get(action.data.bookIndex).fields, action);
			books.get(action.data.bookIndex).fields = newFields;
			return newFields;
		break;

		case 'REMOVE_PAGE': 
			let newPages = RemovePage(books.get(action.data.bookIndex).page, action);
			books.get(action.data.bookIndex).page = newPages;
			return newPages;
		break;

		default:
			return books;
	}

}

export default Remove;
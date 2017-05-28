import Immutable from 'immutable';

const EditBook = (books = Immutable.List(), action) => {

	if(action.type === 'EDIT_BOOK'){
		return books = books.update(action.data.bookIndex, (oldBook) => action.data.newBook);
	}

	return books;

}

export default EditBook;
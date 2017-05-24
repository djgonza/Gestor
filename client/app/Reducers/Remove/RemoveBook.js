import Immutable from 'immutable';

const RemoveBooks = (books = Immutable.List(), action) => {

	if(action.type === 'REMOVE_BOOK'){
		return books.remove(action.data.bookIndex);
	}

	return books;

}

export default RemoveBooks;
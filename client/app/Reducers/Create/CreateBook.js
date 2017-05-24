import Immutable from 'immutable';

const CreateBook = (books = Immutable.List(), action) => {

	if(action.type === 'CREATE_BOOK'){
		return books.push(action.data.book);
	}

	return books;

}

export default CreateBook;
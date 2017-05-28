import GlobalStore from './../../GlobalStore';

const EditBook = (newBook, bookIndex) => {
	GlobalStore.dispatch({
		type: 'EDIT_BOOK',
		data: {
			newBook: newBook,
			bookIndex: bookIndex
		}
	});
}

export default EditBook;
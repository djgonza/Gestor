import GlobalStore from './../../GlobalStore';

const EditBook = (book, bookIndex) => {
	GlobalStore.dispatch({
		type: 'EDIT_BOOK',
		data: {
			book: book,
			bookIndex: bookIndex
		}
	});
}

export default EditBook;
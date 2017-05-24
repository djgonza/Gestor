import GlobalStore from './../../GlobalStore';

const CreateBook = (book) => {
	GlobalStore.dispatch({
		type: 'CREATE_BOOK',
		data: {
			book: book
		}
	});
}

export default CreateBook;
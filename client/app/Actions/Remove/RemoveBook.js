import GlobalStore from './../../GlobalStore';

const RemoveBook = (bookIndex) => {
	GlobalStore.dispatch({
		type: 'REMOVE_BOOK',
		data: {
			bookIndex: bookIndex
		}
	});
}

export default RemoveBook;
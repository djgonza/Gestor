import GlobalStore from './../../GlobalStore';

const SelectBook = (bookIndex) => {
	GlobalStore.dispatch({
		type: 'SELECT_BOOK',
		data: {
			bookIndex: bookIndex
		}
	});
}

export default SelectBook;
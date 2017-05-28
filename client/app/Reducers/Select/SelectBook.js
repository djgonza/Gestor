const SelectBook = (selectedBook = null, action) => {

	if(action.type === 'SELECT_BOOK'){
		return {
			bookIndex: action.data.bookIndex
		}
	}

	return selectedBook;

}

export default SelectBook;
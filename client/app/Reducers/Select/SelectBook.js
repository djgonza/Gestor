const SelectBook = (selectedBook = null, action) => {

	console.log('selected book', selectedBook);//////////

	if(action.type === 'SELECT_BOOK'){
		return {
			bookIndex: action.data.bookIndex
		}
	}

	return selectedBook;

}

export default SelectBook;
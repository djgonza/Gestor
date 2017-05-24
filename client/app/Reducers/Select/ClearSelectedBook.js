const ClearSelectedBook = (selectedBook = null, action) => {

	if(action.type === 'CLEAR_SELECTED_BOOK'){
		return null;
	}

	return selectedBook;

}

export default ClearSelectedBook;
const SelectPage = (selectedPage = null, action) => {

	if(action.type === 'SELECT_PAGE'){
		return {
			pageIndex: action.data.pageIndex,
			bookIndex: action.data.bookIndex
		}
	}

	return selectedPage;

}

export default SelectPage;
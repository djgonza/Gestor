const ClearSelectedPage = (selectedPage = null, action) => {

	if(action.type === 'CLEAR_SELECTED_PAGE'){
		return null
	}

	return selectedPage;

}

export default ClearSelectedPage;
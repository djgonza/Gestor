const ClearSelectedField = (selectedField = null, action) => {

	if(action.type === 'CLEAR_SELECTED_FIELD'){
		return null
	}

	return selectedField;

}

export default ClearSelectedField;
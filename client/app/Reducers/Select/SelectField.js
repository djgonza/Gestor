const SelectField = (selectedField = null, action) => {

	if(action.type === 'SELECT_FIELD'){
		return {
			fieldIndex: action.data.fieldIndex,
			bookIndex: action.data.bookIndex
		}
	}

	return selectedField;

}

export default SelectField;
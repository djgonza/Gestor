import GlobalStore from './../../GlobalStore';

const SelectField = (fieldIndex, bookIndex) => {
	GlobalStore.dispatch({
		type: 'SELECT_FIELD',
		data: {
			fieldIndex: fieldIndex,
			bookIndex: bookIndex
		}
	});
}

export default SelectField;
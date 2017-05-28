import GlobalStore from './../../GlobalStore';

const EditField = (newField, fieldIndex, bookIndex) => {
	GlobalStore.dispatch({
		type: 'EDIT_FIELD',
		data: {
			newField: newField,
			fieldIndex: fieldIndex,
			bookIndex: bookIndex
		}
	});
}

export default EditField;
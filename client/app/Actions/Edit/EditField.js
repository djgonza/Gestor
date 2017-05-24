import GlobalStore from './../../GlobalStore';

const EditField = (field, fieldIndex, bookIndex) => {
	GlobalStore.dispatch({
		type: 'EDIT_FIELD',
		data: {
			field: field,
			fieldIndex: fieldIndex,
			bookIndex: bookIndex
		}
	});
}

export default EditField;
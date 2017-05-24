import GlobalStore from './../../GlobalStore';

const CreateField = (field, bookIndex) => {
	GlobalStore.dispatch({
		type: 'CREATE_FIELD',
		data: {
			field: field,
			bookIndex: bookIndex
		}
	});
}

export default CreateField;
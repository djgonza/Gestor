import GlobalStore from './../../GlobalStore';

const RemoveField = (fieldIndex, bookIndex) => {
	GlobalStore.dispatch({
		type: 'REMOVE_FIELD',
		data: {
			fieldIndex: fieldIndex,
			bookIndex: bookIndex
		}
	});
}

export default RemoveField;
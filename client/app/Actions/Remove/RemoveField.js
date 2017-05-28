import GlobalStore from './../../GlobalStore';
import ClearSelectedField from './../Select/ClearSelectedField';

const RemoveField = (fieldIndex, bookIndex) => {

	ClearSelectedField();
	
	GlobalStore.dispatch({
		type: 'REMOVE_FIELD',
		data: {
			fieldIndex: fieldIndex,
			bookIndex: bookIndex
		}
	});
}

export default RemoveField;
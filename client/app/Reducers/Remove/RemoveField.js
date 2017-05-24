import Immutable from 'immutable';

const RemoveField = (fields = Immutable.List(), action) => {

	if(action.type === 'REMOVE_FIELD'){
		return fields.remove(action.data.fieldIndex);
	}

	return fields;

}

export default RemoveField;
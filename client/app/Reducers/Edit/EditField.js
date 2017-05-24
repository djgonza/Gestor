import Immutable from 'immutable';

const EditField = (fields = Immutable.List(), action) => {

	if(action.type === 'EDIT_FIELD'){
		return fields.update(action.data.fieldIndex, (field) => action.data.newField);
	}

	return fields;

}

export default EditField;
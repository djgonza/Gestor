import Immutable from 'immutable';

const CreateField = (fields = Immutable.List(), action) => {

	if(action.type === 'CREATE_FIELD'){
		return fields.push(action.data.field);
	}

	return fields;

}

export default CreateField;
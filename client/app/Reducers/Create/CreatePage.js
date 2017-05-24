import Immutable from 'immutable';

const CreatePage = (pages = Immutable.List(), action) => {

	if(action.type === 'CREATE_PAGE'){
		return pages.push(action.data.page);
	}

	return pages;

}

export default CreatePage;
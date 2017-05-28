import Immutable from 'immutable';

const EditPage = (pages = Immutable.List(), action) => {

	if(action.type === 'EDIT_PAGE'){
		return pages.update(action.data.pageIndex, (field) => action.data.newPage);
	}

	return pages;

}

export default EditPage;
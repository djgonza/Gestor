import Immutable from 'immutable';

const RemovePage = (pages = Immutable.List(), action) => {

	if(action.type === 'REMOVE_PAGE'){
		return pages.remove(action.data.pageIndex);
	}

	return pages;

}

export default RemovePage;
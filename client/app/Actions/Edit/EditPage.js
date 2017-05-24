import GlobalStore from './../../GlobalStore';

const EditPage = (page, pageIndex, bookIndex) => {
	GlobalStore.dispatch({
		type: 'EDIT_PAGE',
		data: {
			page: page,
			pageIndex: pageIndex,
			bookIndex: bookIndex
		}
	});
}

export default EditPage;
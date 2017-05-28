import GlobalStore from './../../GlobalStore';

const EditPage = (newPage, pageIndex, bookIndex) => {
	GlobalStore.dispatch({
		type: 'EDIT_PAGE',
		data: {
			newPage: newPage,
			pageIndex: pageIndex,
			bookIndex: bookIndex
		}
	});
}

export default EditPage;
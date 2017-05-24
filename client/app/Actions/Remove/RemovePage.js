import GlobalStore from './../../GlobalStore';

const RemovePage = (pageIndex, bookIndex) => {
	GlobalStore.dispatch({
		type: 'REMOVE_FIELD',
		data: {
			pageIndex: pageIndex,
			bookIndex: bookIndex
		}
	});
}

export default RemovePage;
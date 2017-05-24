import GlobalStore from './../../GlobalStore';

const SelectPage = (pageIndex, bookIndex) => {
	GlobalStore.dispatch({
		type: 'SELECT_PAGE',
		data: {
			pageIndex: pageIndex,
			bookIndex: bookIndex
		}
	});
}

export default SelectPage;
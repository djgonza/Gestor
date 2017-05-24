import GlobalStore from './../../GlobalStore';

const ClearSelectedBook = () => {
	GlobalStore.dispatch({
		type: 'CLEAR_SELECTED_BOOK'
	});
}

export default ClearSelectedBook;
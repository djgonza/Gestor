import GlobalStore from './../../GlobalStore';

const ClearSelectedPage = () => {
	GlobalStore.dispatch({
		type: 'CLEAR_SELECTED_PAGE'
	});
}

export default ClearSelectedPage;
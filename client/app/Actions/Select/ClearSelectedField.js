import GlobalStore from './../../GlobalStore';

const ClearSelectedField = () => {
	GlobalStore.dispatch({
		type: 'CLEAR_SELECTED_FIELD'
	});
}

export default ClearSelectedField;
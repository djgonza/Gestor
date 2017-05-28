import GlobalStore from './../../GlobalStore';
import ClearSelectedField from './ClearSelectedField';
import ClearSelectedPage from './ClearSelectedPage';

const ClearSelectedBook = () => {

	ClearSelectedField();
	ClearSelectedPage();

	GlobalStore.dispatch({
		type: 'CLEAR_SELECTED_BOOK'
	});
}

export default ClearSelectedBook;
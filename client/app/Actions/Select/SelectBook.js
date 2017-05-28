import GlobalStore from './../../GlobalStore';
import ClearSelectedField from './ClearSelectedField';
import ClearSelectedPage from './ClearSelectedPage';

const SelectBook = (bookIndex) => {

	ClearSelectedField();
	ClearSelectedPage();

	GlobalStore.dispatch({
		type: 'SELECT_BOOK',
		data: {
			bookIndex: bookIndex
		}
	});
}

export default SelectBook;
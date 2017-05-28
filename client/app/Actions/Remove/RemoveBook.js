import GlobalStore from './../../GlobalStore';
import ClearSelectedBook from './../Select/ClearSelectedBook';
import ClearSelectedField from './../Select/ClearSelectedField';
import ClearSelectedPage from './../Select/ClearSelectedPage';

const RemoveBook = (bookIndex) => {

	ClearSelectedBook();
	ClearSelectedField();
	ClearSelectedPage();

	GlobalStore.dispatch({
		type: 'REMOVE_BOOK',
		data: {
			bookIndex: bookIndex
		}
	});
}

export default RemoveBook;
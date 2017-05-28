import { combineReducers } from 'redux';
import Immutable from 'immutable';
import Create from './Create/Create';
import Edit from './Edit/Edit';
import Remove from './Remove/Remove';
import SelectBook from './Select/SelectBook';
import SelectField from './Select/SelectField';
import SelectPage from './Select/SelectPage';
import ClearSelectedBook from './Select/ClearSelectedBook';
import ClearSelectedField from './Select/ClearSelectedField';
import ClearSelectedPage from './Select/ClearSelectedPage';

const RootReducer = combineReducers({

	books: (books = Immutable.List(), action) => {
		
		switch (action.type) {

			case 'CREATE_BOOK':
			case 'CREATE_FIELD':
			case 'CREATE_PAGE':
				return Create (books, action).splice(0, -1);
			break;

			case 'EDIT_BOOK':
			case 'EDIT_FIELD':
			case 'EDIT_PAGE':
				return Edit (books, action);
			break;

			case 'REMOVE_BOOK':
			case 'REMOVE_FIELD':
			case 'REMOVE_PAGE':
				return Remove (books, action);
			break;

			default: 
				return books;

		}

	},
	selectedBook: (selectedBook = null, action) => { 
		if(action.type === 'SELECT_BOOK') {
			return SelectBook (selectedBook = null, action);
		}
		if(action.type === 'CLEAR_SELECTED_BOOK') {
			return ClearSelectedBook (selectedBook = null, action);
		}
		return selectedBook;
	},
	selectedField: (selectedField = null, action) => { 
		if(action.type === 'SELECT_FIELD'){
			return SelectField (selectedField = null, action);
		}
		if(action.type === 'CLEAR_SELECTED_FIELD') {
			return ClearSelectedField (selectedField = null, action);
		}
		return selectedField;
	},
	selectedPage: (selectedPage = null, action) => { 
		if(action.type === 'SELECT_PAGE') {
			return SelectPage (selectedPage = null, action)
		}
		if(action.type === 'CLEAR_SELECTED_PAGE') {
			return ClearSelectedPage (selectedPage = null, action);
		}
		return selectedPage;
	},
	control: (status = true, action) => {
		if(action.type === 'UPDATE_STATE'){
			return new Boolean(true);
		}
		return status;
	}

});

export default RootReducer;
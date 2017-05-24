import { createStore } from 'redux';
import RootReducer from './Reducers/RootReducer';


//TODO: load library from server

const store = createStore(RootReducer);

export default store;

let unsubscribe = store.subscribe(() => {
	console.log('store', store.getState());
});

/*Actions.createBook({
	name: 'Mi primer libro',
	pages: Immutable.List(),
	fields: Immutable.List()
});

Actions.createBook({
	name: 'Mi segundo libro',
	pages: Immutable.List(),
	fields: Immutable.List()
});

Actions.createField ({
	name: 'Mi primer Field',
	type: 'DATE'
}, 0);

Actions.createField ({
	name: 'Mi segundo Field',
	type: 'NUMBER'
}, 1);

Actions.editField ({
	name: 'Mi primer Field editado',
	type: 'NUMBER'
}, 0, 1);

Actions.editField ({
	name: 'Mi segundo Field editado',
	type: 'NUMBER'
}, 1, 1);

Actions.removeField (1, 1);*/









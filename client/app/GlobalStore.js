import { createStore } from 'redux';
import RootReducer from './Reducers/RootReducer';

const store = createStore(RootReducer);

export default store;

let unsubscribe = store.subscribe(() => {
	console.log('store', store.getState());
});









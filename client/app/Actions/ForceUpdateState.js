import GlobalStore from './../GlobalStore';

const ForceUpdateState = () => {
	GlobalStore.dispatch({
		type: 'UPDATE_STATE'
	});
}

export default ForceUpdateState;
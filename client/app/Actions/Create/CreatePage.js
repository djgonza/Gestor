import GlobalStore from './../../GlobalStore';

const CreatePage = (page, bookIndex) => {
	GlobalStore.dispatch({
		type: 'CREATE_PAGE',
		data: {
			page: page,
			bookIndex: bookIndex
		}
	});
}

export default CreatePage;
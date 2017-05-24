import React from 'react';
import { connect } from 'react-redux';
import FieldList from './FieldList';

class SelectedBook extends React.Component {
	
	constructor(props) {
		super(props);

	}

	render () {

		return (<FieldList fields={this.props.fields}></FieldList>);

	}

}

const mapStateToProps = (state) => {
	return {
		fields: state.selectedBook ? state.books.get(state.selectedBook.bookIndex).fields : []
	}
}

export default connect(mapStateToProps)(SelectedBook);




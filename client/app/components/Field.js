import React from 'react';
import { connect } from 'react-redux';
import SelectField from './../Actions/Select/SelectField';

class Field extends React.Component {
	
	constructor(props) {
		super(props);

		this.selectField = this.selectField.bind(this);

	}

	selectField (e) {
		e.preventDefault();
		e.stopPropagation();
		SelectField (this.props.id, this.props.selectedBook.bookIndex);
	}

	render () {

		let classNames = 'collection-item';
		if(this.props.selectedField && this.props.selectedField.fieldIndex == this.props.id) {
			classNames += ' active';
		}
		
		return (<li className={classNames} onClick={this.selectField}>{this.props.name}</li>);

	}

}

const mapStateToProps = (state) => {
	return {
		selectedField: state.selectedField,
		selectedBook: state.selectedBook
	}
}

export default connect(mapStateToProps)(Field);
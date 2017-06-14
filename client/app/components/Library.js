import React from 'react';
import { connect } from 'react-redux';
import BookList from './BookList';
import FieldList from './FieldList';

class Library extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render () {

		return (<div className="row">
			<div className="col-3">
				<BookList />
				<FieldList />
			</div>
			<div className="col-9">
				
			</div>
		</div>)

	}

}


const mapStateToProps = (state) => {
	return {
		state: state
	}
}

export default connect(mapStateToProps)(Library);






import React from 'react';
import { connect } from 'react-redux';
import BookList from './BookList';
import SelectedBook from './SelectedBook';
import DroopDownBooks from './DroopDownBooks';
import DroopDownFields from './DroopDownFields';

class Library extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render () {

		return (<div className="row">
			<div className="col s3">
				<DroopDownBooks />
				<BookList />
				{
					this.props.state.selectedBook ? <DroopDownFields /> : null
				}
				{
					this.props.state.selectedBook ? <SelectedBook /> : null
				}
			</div>
			<div className="col s9">
				
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






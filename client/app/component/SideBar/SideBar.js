import React from 'react';
import Immutable from 'immutable';
import DocumentList from './DocumentList';
import FieldList from './FieldList';

export default class SideBar extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			selected: null
		}

	}

	render () {

		//<a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>

		return (<div className="col s2">

			<DocumentList selectedDocument={(id) => {this.setState({selected: id})}}></DocumentList>	
			{
				this.state.selected ? <FieldList documentId={this.state.selected}></FieldList> : null
			}
			
		</div>);

	}

}
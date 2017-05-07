import React from 'react';
import DocumentListItem from './DocumentListItem';

export default class DocumentList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render () {

		return (<ul className="collection">
		{
			this.props.documents.map((doc, key) => {
				return <DocumentListItem deleteDocument={this.props.deleteDocument} key={key} id={doc._id} name={doc.name} type={doc.type}></DocumentListItem>
			})
		}
		</ul>)

	}

}
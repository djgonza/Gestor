import React from 'react';
import DocumentListItemActions from './DocumentListItemActions';

export default class DocumentListItem extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			showActions: false
		}

		this.click = this.click.bind(this);
		this.delete = this.delete.bind(this);
	}

	click (e) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			showActions: !this.state.showActions
		});
	}

	delete () {
		this.props.deleteDocument(this.props.id);
	}

	render () {

		return (
			<li onClick={this.click} className="collection-item avatar">
				<i className="material-icons circle">folder</i>
				<span className="title">{this.props.name}</span>
				<p>{this.props.type}</p>
				<a className="secondary-content"><i className="material-icons">send</i></a>
				{
					this.state.showActions ? <DocumentListItemActions {...this.props} delete={this.delete}></DocumentListItemActions> : null
				}
			</li>)


	}

}
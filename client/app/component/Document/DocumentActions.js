import React from 'react';
import Create from './actions/Create';

export default class DocumentActions extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			showCreate: false
		}
		this.showCreate = this.showCreate.bind(this);
	}

	showCreate (status) {
		this.setState({
			showCreate: status
		});
	}

	render () {

		return (<div>
			<div className="fixed-action-btn horizontal click-to-toggle">
				<a className="btn-floating btn-large red">
					<i className="material-icons">menu</i>
				</a>
				<ul>
					<li><a onClick={() => {this.showCreate(true)}} className="btn-floating red"><i className="material-icons">insert_chart</i></a></li>
					<li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
					<li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
					<li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
				</ul>
			</div>
			{
				this.state.showCreate ? <Create addDocument={this.props.addDocument} show={this.showCreate}></Create> : null
			}
		</div>)

	}

}
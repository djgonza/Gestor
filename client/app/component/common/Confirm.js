import React from 'react';

export default class Confirm extends React.Component {
	
	constructor(props) {
		super(props);

		this.confirm = this.confirm.bind(this);
		this.refuse = this.refuse.bind(this);

	}

	componentDidMount() {
		$(this.modal).modal({
			dismissible: false, 
			opacity: .5, 
			inDuration: 300, 
			outDuration: 200, 
			startingTop: '4%', 
			endingTop: '10%', 
			complete: () => {} 
		}).modal('open');
	}

	refuse () {
		$(this.modal).modal('close');
		this.props.confirm(false);
	}

	confirm () {
		$(this.modal).modal('close');
		this.props.confirm(true);
	}

	render () {

		return (
			<div className="modal" ref={(modal) => {this.modal = modal}}>
				<div className="modal-content">
				<h4>{this.props.msg}</h4>
				</div>
				<div className="modal-footer">
					<a onClick={this.confirm} className="btn btn-floating waves-effect waves-light red">
						<i className="material-icons">delete_forever</i>
					</a>
					<a onClick={this.refuse} className="btn btn-floating waves-effect waves-light green">
						<i className="material-icons">cancel</i>
					</a>
				</div>
			</div>)

	}

}
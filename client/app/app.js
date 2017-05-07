import React from 'react';
import ReactDOM from 'react-dom';
import Router from './component/Router';

class App extends React.Component {
	
	constructor(props) {

		super(props);
		this.navigate = this.navigate.bind(this);

	}

	navigate (component) {
		this.setState({section: component});
	}

	render(){
		return <div>
		<Router navigate={this.navigate}></Router>
		{this.state ? this.state.section : null}
		</div>;
	}
}


ReactDOM.render(
	<App></App>,
	document.getElementById('app')
	);
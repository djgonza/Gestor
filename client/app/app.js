import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Router from './components/Router';
import GlobalStore from './GlobalStore';

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
	<Provider store={GlobalStore}>
		<App />	
	</Provider>,
	document.getElementById('app')
	);
	
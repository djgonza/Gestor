import React from 'react';
import Page from 'page';
import NotFound from './NotFound';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import Home from './Home';

function isLoged (ctx, next) {

	//Comprobamos si tenemos token
	if(!localStorage.getItem('token')) {
		Page.redirect('/login');
		return;
	}

	//Comprovamos que el token no a expirado
	$.ajax({
		method: "GET",
		url: "http://localhost:5000/validateToken",
		headers: {
			token: localStorage.getItem('token')
		}
	})
	.done(function(res) {
		//Token espirado
		if(res.status != 200) {
			Page.redirect('/login');
			return;
		}
	})
	.fail(function(xhr, status, error) {
		Page.redirect('/login');
	});

	next();

}

export default class Router extends React.Component {
	
	constructor(props) {

		super(props);

	}

	componentWillMount() {

		let self = this;

		Page('/', () => {
			self.props.navigate(<Landing></Landing>);
		});
		Page('/login', () => {
			self.props.navigate(<Login></Login>);
		});
		Page('/register', () => {
			self.props.navigate(<Register></Register>);
		});
		Page('/home', isLoged, () => {
			self.props.navigate(<Home></Home>);
		});
		Page('/home/*', isLoged, () => {
			self.props.navigate(<Home></Home>);
		});
		Page('/*', () => {
			self.props.navigate(<NotFound></NotFound>);
		});
		Page();

	}

	render () {
		return (null);
	}

}
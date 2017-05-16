import React from 'react';
import Page from 'page';

export default class Login extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			password: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.login = this.login.bind(this);
	}

	login () {

		$.ajax({
			method: "POST",
			url: "http://localhost:5000/login",
			data: this.state
		})
		.done(function(res) {
			localStorage.setItem('token', res);
			Page.redirect('/home');
		})
		.fail(function(xhr, status, error) {
			console.log('fail', xhr, status, error);
		});

	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	render () {

		return <div className="container">

		<h1>Login</h1>

		<div className="row">

		<div className="input-field col s12">
		<i className="material-icons prefix">account_circle</i>
		<input type="text" className="validate" name="name" value={this.state.name} onChange={this.handleChange} />
		<label>Nombre</label>
		</div>

		<div className="input-field col s12">
		<i className="material-icons prefix">lock_open</i>
		<input type="text" className="validate" name="password" value={this.state.password} onChange={this.handleChange} />
		<label>Contraseña</label>
		</div>

		<button className="btn waves-effect waves-light col s6 offset-s6" onClick={this.login}>Acceder</button>

		</div>
		<div className="row">

		<a className="btn waves-effect waves-light col s6 offset-s6" href="/register">Registrar</a>

		</div>

		</div>;

	}

}
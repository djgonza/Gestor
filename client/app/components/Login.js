import React from 'react';
import Page from 'page';

export default class Login extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			password: '',
			msg: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.login = this.login.bind(this);
	}

	login () {

		let self = this;

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
			self.setState({
				msg: true
			});
		});

	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	render () {

		let styles = {
			width: '50%',
    		marginLeft: '25%',
    		marginTop: '2%'
		}

		return <div className="card" style={styles}>

			<div className="card-header">
				Login
			</div>

			<div className="card-block">

				{
					this.state.msg ? <div className="alert alert-warning">Nombre o Contraseña incorrecto!</div> : null
				}

				<div className="form-group">
					<label>Nombre</label>
					<input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChange} />
				</div>

				<div className="form-group">
					<label>Contraseña</label>
					<input type="text" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
				</div>

				<div className="btn-group d-flex justify-content-end">
					<button className="btn btn-primary" onClick={this.login}>Acceder</button>
					<a className="btn btn-primary" href="/register">Registrar</a>
				</div>

			</div>

		</div>;

	}

}
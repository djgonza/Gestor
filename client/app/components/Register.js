import React from 'react';
import Page from 'page';

export default class Register extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			secondName: '',
			password: '',
			repassword: '',
			email: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.register = this.register.bind(this);
	}

	register () {

		console.log(this.state);

		$.ajax({
			method: "POST",
			url: "http://localhost:5000/user",
			data: this.state
		})
		.done(function(res) {
			console.log("Data Saved: " + res);
			Page.redirect('/login');
		})
		.fail(function(xhr, status, error) {
			console.log('error');
		});

	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	render () {
		return <div className="row">

			<div className="col s12 m6">

				<div className="row">

					<h1>Registro</h1>

					<div className="input-field col s12">
						<i className="material-icons prefix">account_circle</i>
						<input type="text" className="validate" name="name" value={this.state.name} onChange={this.handleChange} />
						<label>Nombre</label>
					</div>

					<div className="input-field col s12">
						<i className="material-icons prefix">account_circle</i>
						<input type="text" className="validate" name="secondName" value={this.state.secondName} onChange={this.handleChange} />
						<label>Apellidos</label>
					</div>

					<div className="input-field col s12">
						<i className="material-icons prefix">email</i>
						<input type="text" className="validate" name="email" value={this.state.email} onChange={this.handleChange} />
						<label>Email</label>
					</div>

					<div className="input-field col s12">
						<i className="material-icons prefix">lock_open</i>
						<input type="text" className="validate" name="password" value={this.state.password} onChange={this.handleChange} />
						<label>Contraseña</label>
					</div>

					<div className="input-field col s12">
						<i className="material-icons prefix">lock_open</i>
						<input type="text" className="validate" name="repassword" value={this.state.repassword} onChange={this.handleChange} />
						<label>Repita la Contraseña</label>
					</div>

					<button className="btn waves-effect waves-light col s6 offset-s6" onClick={this.register}>Registrar</button>

				</div>

				<div className="row">
					<a className="btn waves-effect waves-light col s6 offset-s6" href="/login">Acceder</a>
				</div>

			</div>

			<div className="col m6 hide-on-small-only">
				 <img className="responsive-img" src="http://placehold.it/350x150" />
			</div>

		</div>;
	}

}
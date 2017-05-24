import React from 'react';


export default class DroopDownBooks extends React.Component {
	
	constructor(props) {
		super(props);

	}

	render () {

		return (<div className="col s12">
			<a data-activates='dropdownBooks' className='dropdown-button waves-effect waves-light btn col s12 blue'><i className="material-icons right">keyboard_arrow_down</i> Libros</a>
			<ul id="dropdownBooks" className='dropdown-content'>
			<li><a>Nuevo Libro</a></li>
			<li><a>two</a></li>
			<li className="divider"></li>
			<li><a>three</a></li>
			<li><a><i className="material-icons blue">view_module</i>four</a></li>
			<li><a><i className="material-icons blue">cloud</i>five</a></li>
			</ul>
			{ status }
			</div>)

	}

}

class CreateBook extends React.Component {
	
	constructor(props) {
		
		super(props);

		this.state = {
			name: ""
		}


	}

	componentDidMount() {
		
		$(this.modal).modal({
			dismissible: false, 
			opacity: .5,
			inDuration: 300,
			outDuration: 200,
			startingTop: '4%',
			endingTop: '10%',
		}).modal('open');

	}

	save () {
		console.log('save');
		//Creamos el libro

	}

	render () {

		return (<div ref={ modal => this.modal = modal } className="modal">
			<div className="modal-content">
			<h4>Nuevo Libro</h4>
				<div className="row">
					<div className="input-field col s6">
						<input onChange={value => this.setState({name: value})} placeholder="Nombre del libro..." type="text" className="validate" />
						<label>Nombre</label>
					</div>
				</div>	
			</div>
			<div className="modal-footer">
				<a onClik={() => { this.save() }} className="modal-action waves-effect waves-green btn-flat">Guardar</a>
				<a className="modal-action waves-effect waves-green btn-flat">Cancelar</a>
			</div>
		</div>);

	}

	
}









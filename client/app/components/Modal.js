import React from 'react';
import Immutable from 'immutable';

export default class Modal extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			inputs: Immutable.List()
		}

		this.handleChange = this.handleChange.bind(this);
		this.close = this.close.bind(this);
		this.save = this.save.bind(this);
		this.mountInput = this.mountInput.bind(this);
		this.mountBody = this.mountBody.bind(this);

		this.inputsRefs = [];

	}

	handleChange(e) {

		let newValue = Object.assign(
			this.state.inputs.get(e.target.dataset.id),
			{ value: e.target.value }
		);

		let newState = {
			inputs: this.state.inputs.set(e.target.dataset.id, newValue)
		}

		this.setState(newState);
	}

	componentWillMount() {

		let stateInputs = this.state.inputs;

		this.props.inputs.map(input => {

			let mapedInput = {
				name: input.name,
				value: input.value,
				type: input.type,
				label: input.label,
				options: input.options
			}

			stateInputs = stateInputs.push(mapedInput);

		});

		this.setState({
			inputs: stateInputs
		});

	}

	componentDidMount() {

		//Montamos los inputs
		this.inputsRefs.map(input => {
			switch(input.type){
				case 'select-one':
					$(input).change(this.handleChange).material_select();
				break;
			}
		});

		//Montamos el modal
		$(this.modal).modal({
			dismissible: false, 
			opacity: .5, 
			inDuration: 300, 
			outDuration: 200, 
			startingTop: '4%', 
			endingTop: '10%' 
		}).modal('open');

	}

	validate () {
		return true;
	}

	save () {

		if(!this.validate()){
			return;
		}
		this.close ();
		this.props.save(this.state.inputs.toArray());

	}

	close () {
		$(this.modal).modal('close');
		this.props.close();
	}

	mountInput (name, value, type, label, key) {
		return (<div key={key} className="input-field col s6 offset-s3">
			<input 
			onChange={this.handleChange} 
			value={value}
			data-id={key}
			data-type={type}
			type={type}
			name={name} 
			className="validate"/>
			{
				label ? <label className="active">{label}</label> : null
			}
		</div>);
	}

	mountSelect (name, value, type, label, options, key) {
		
		let mountedOptions = options.map((option, optionKey) => {
			return (<option key={optionKey} value={option.value}>{option.name}</option>);
		});

		return (<div key={key} className="input-field col s6 offset-s3">
			<select 
				onChange={this.handleChange} 
				name={name}
				value={value}
				data-id={key}
				data-type={type}
				ref={select => {this.inputsRefs.push(select)}}>
				{ mountedOptions }
			</select>
			{
				label ? <label >{label}</label> : null
			}
		</div>);

	}

	mountCheck () {

	}

	mountBody () {

		let self = this;

		return this.state.inputs.map((input, key) => {
			switch (input.type) {
				case 'text': 
					return self.mountInput(
						input.name, 
						input.value, 
						input.type, 
						(input.label || null),
						key);
				break;
				case 'select':
					return self.mountSelect(
						input.name, 
						input.value, 
						input.type, 
						(input.label || null),
						input.options,
						key);
				break;
			}
			 
		});

	}

	render () {

		return (<div ref={(modal) => {this.modal = modal}} className="modal bottom-sheet">
			<div className="modal-content row">
				<h4>{this.props.header}</h4>
				{ this.mountBody () }
			</div>
			<div className="modal-footer">
				<a onClick={this.save} className="modal-action waves-effect waves-green btn-flat">Guardar</a>
				<a onClick={this.close} className="modal-action waves-effect waves-green btn-flat">Cancelar</a>
			</div>
		</div>);

	}

}



import React from 'react';
import { connect } from 'react-redux';
import ContextMenu from './ContextMenu';
import SelectField from './../Actions/Select/SelectField';

class Field extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			showContextMenu: false
		}

		this.selectField = this.selectField.bind(this);
		this.removeField = this.removeField.bind(this);
		this.editField = this.editField.bind(this);
		this.contextMenu = this.contextMenu.bind(this);
		this.click = this.click.bind(this);
		this.setContextMenu = this.setContextMenu.bind(this);

	}

	contextMenu (e) {

		if(this.element !== e.target){
			this.setContextMenu(false);
			return;
		}

		e.preventDefault();
		let x = (e.pageX - $(e.target).offset().left);
		let y = (e.pageY );

		this.selectField(e);
		this.setContextMenu(true, x, y);

	}

	click (e) {
		
		this.setContextMenu(false);

		if(this.element !== e.target){
			return;
		}

		this.selectField(e);

	}

	setContextMenu (status, x, y) {
		
		if(status){
			this.setState({
				showContextMenu: {x, y}
			});
			return;
		}

		this.setState({
			showContextMenu: false
		});
		

	}

	componentDidMount() {
		window.addEventListener('contextmenu', this.contextMenu);
		window.addEventListener('click', this.click);
	}

	componentWillUnmount() {
		window.removeEventListener('contextmenu', this.contextMenu);
		window.removeEventListener('click', this.click);
	}

	selectField (e) {
		SelectField (this.props.id, this.props.selectedBook.bookIndex);
	}

	editField () {
		this.props.editField(this.props.id);
	}

	removeField () {
		this.props.removeField(this.props.id);
	}

	mountContextMenu () {

		if (!this.state.showContextMenu) return;

		let contextMenu = this.state.showContextMenu;
		let items = [];

		items.push({
			name: 'Editar',
			click: this.editField
		});

		items.push({
			name: 'Borrar',
			click: this.removeField
		});

		return (<ContextMenu 
			top={contextMenu.y} 
			left={contextMenu.x} 
			items={items} 
		/>);

	}

	render () {

		let classNames = 'collection-item';
		if(this.props.selectedField && this.props.selectedField.fieldIndex == this.props.id) {
			classNames += ' active';
		}
		
		return (<li
			ref={element => this.element = element} 
			className={classNames}>
				{ this.mountContextMenu() }
				{ this.props.name }
			</li>);

	}

}

const mapStateToProps = (state) => {
	return {
		selectedField: state.selectedField,
		selectedBook: state.selectedBook
	}
}

export default connect(mapStateToProps)(Field);
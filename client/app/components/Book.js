import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import ContextMenu from './ContextMenu';
import SelectBook from './../Actions/Select/SelectBook';

class Book extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			showContextMenu: false
		}

		this.selectBook = this.selectBook.bind(this);
		this.removeBook = this.removeBook.bind(this);
		this.editBook = this.editBook.bind(this);
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

		this.selectBook(e);
		this.setContextMenu(true, x, y);

	}

	click (e) {
		
		this.setContextMenu(false);

		if(this.element !== e.target){
			return;
		}

		this.selectBook(e);

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

	//Selecciona un libro
	selectBook (e) {
		SelectBook (this.props.id);
	}

	editBook () {
		this.props.editBook(this.props.id);
	}

	removeBook () {
		this.props.removeBook(this.props.id);
	}

	mountContextMenu () {

		if (!this.state.showContextMenu) return;

		let contextMenu = this.state.showContextMenu;
		let items = [];

		items.push({
			name: 'Editar',
			click: this.editBook
		});

		items.push({
			name: 'Borrar',
			click: this.removeBook
		});

		return (<ContextMenu 
			top={contextMenu.y} 
			left={contextMenu.x} 
			items={items} 
		/>);

	}

	render () {

		let classNames = 'collection-item';
		if(this.props.selectedBook && this.props.selectedBook.bookIndex == this.props.id) {
			classNames += ' active blue darken-1';
		}
		
		return (<li 
			ref={(element) => this.element = element} 
			className={classNames}>
				{ this.mountContextMenu() }
				{ this.props.name }
		</li>);

	}

}

//Inyecta el state global al las props del book
const mapStateToProps = (state) => {
	return {
		selectedBook: state.selectedBook
	}
}

export default connect(mapStateToProps)(Book);


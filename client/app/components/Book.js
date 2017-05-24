import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import SelectBook from './../Actions/Select/SelectBook';
import ClearSelectedBook from './../Actions/Select/ClearSelectedBook';
import RemoveBook from './../Actions/Remove/RemoveBook';

class Book extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			contextMenu: false,
			events: Immutable.List()
		}

		this.selectBook = this.selectBook.bind(this);
		this.contextMenu = this.contextMenu.bind(this);

	}

	componentDidMount() {
		let eventContextMenu = e => {
			this.contextMenu(e);
		}
		let eventClick = e => {
			this.contextMenu (e);
			this.selectBook (e);
		}
		window.addEventListener('contextmenu', eventContextMenu, false);
		window.addEventListener('click', eventClick, false);

		this.setState({
			events: this.state.events.insert(
				{
					type: 'contextmenu',
					func: eventContextMenu
				},{
					type: 'click',
					func: eventClick
				})
		});

	}

	selectBook (e) {

		if(this.element === e.target){
			e.preventDefault();
			SelectBook (this.props.id);
		}
	}

	componentWillUnmount() {
		//Destroy Events
		this.state.events.map(event => {
			window.removeEventListener(event.type, event.func, false);
		});
		ClearSelectedBook();
	}

	contextMenu (e) {

		if(this.element != e.target){
			this.setState({
				contextMenu: false
			});
			return;
		}

		if(e.type === 'contextmenu'){
			console.log(e);
			e.preventDefault();
			this.selectBook(e);
			this.setState({
				contextMenu: {
					offsetX: e.offsetX,
					offsetY: e.offsetY
				}
			});
			return;
		}

	}

	render () {

		let classNames = 'collection-item';
		if(this.props.selectedBook && this.props.selectedBook.bookIndex == this.props.id) {
			classNames += ' active blue darken-1';
		}
		
		return (<li ref={(element) => this.element = element} className={classNames}>
			{this.props.name}
			{
				this.state.contextMenu ? <ContextMenu remove={() => {this.setState({contextMenu: false})}} offsetX={this.state.contextMenu.offsetX} offsetY={this.state.contextMenu.offsetY} {...this.props}/> : null
			}
		</li>);

	}

}


const mapStateToProps = (state) => {
	return {
		selectedBook: state.selectedBook
	}
}

export default connect(mapStateToProps)(Book);


class ContextMenu extends React.Component {
	
	constructor(props) {
		super(props);

		this.style = {
			position: 'fixed',
			zIndex: 1000,
			left: this.props.offsetX,
			top: this.props.offsetY,
			color: 'black'
		}

		//this.remove = this.remove.bind(this);
		this.edit = this.edit.bind(this);

	}

	componentDidMount() {
		this.removeBtn.addEventListener('click', e => {
			this.remove (e);
		}, false);
		this.editBtn.addEventListener('click', e => {
			this.edit (e);
		}, false);
	}

	componentWillUnmount() {
		this.removeBtn.removeEventListener('click', e => {
			this.remove (e);
		}, false);
		this.editBtn.removeEventListener('click', e => {
			this.edit (e);
		}, false);
	}

	componentWillReceiveProps(nextProps) {
		this.style.left = this.props.offsetX;
		this.style.top = this.props.offsetY;
	}

	remove (e) {
		if(e.target === this.removeBtn){
			e.stopPropagation();
			console.log('remove', this.props.id);
			if(confirm(`¿Desea eliminar el libro ${this.props.name}?`)){
				this.props.remove();
				RemoveBook(this.props.id);
			}
		}
	}

	edit (e) {
		if(e.target === this.editBtn){
			e.stopPropagation();
			console.log('edit', this.props.id);
		}
	}

	render () {
		
		return(<ul className="collection" style={this.style}>
			<li ref={removeBtn => this.removeBtn = removeBtn} className='collection-item'>Eliminar</li>
			<li ref={editBtn => this.editBtn = editBtn} className='collection-item'>Editar</li>
		</ul>);

	}
}








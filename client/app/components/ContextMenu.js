import React from 'react';

export default class ContextMenu extends React.Component {
	
	constructor(props) {
		super(props);
	}

	mountList (items) {

		return items.map((item, key) => {

			return (<li 
				key={key}
				onClick={e => {
					item.click(e)
				}} 
				className='collection-item'>
					{item.name}
				</li>);

		});

	}

	render () {

		let styles = {
			position: 'fixed',
    		color: 'black',
    		top: `${this.props.top}px`,
    		left: `${this.props.left}px`,
    		zIndex: '10000'
		}

		return (<ul className="collection" style={styles}>
			{ this.mountList (this.props.items) }
		</ul>);

	}


}
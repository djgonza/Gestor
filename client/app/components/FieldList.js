import React from 'react';
import Field from './Field';

export default class FieldList extends React.Component {
	
	constructor(props) {
		super(props);

	}

	render () {

		return (<ul className="collection">
			
			{
				this.props.fields.size > 0 ? this.props.fields.map((field, key) => {
					return <Field 
							key={key} 
							id={key}
							name={field.name}
							type={field.type}>
						   </Field>
				}) : null
			}

		</ul>);

	}

}

import React from 'react';

export default class Home extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render () {

		return (<div className="col s10 row">

			<div className="col s12" style={{'padding': '0'}}>
				<nav className="light-blue accent-4" style={{'height': '50px', 'lineHeight': '50px'}}>
					<div className="nav-wrapper">
						<ul id="nav-mobile" className="left hide-on-med-and-down">
							<li><a>Sass</a></li>
							<li><a>Components</a></li>
							<li><a>JavaScript</a></li>
						</ul>
					</div>
				</nav>
			</div>
			<div className="col offset-s2 s10">
				
			</div>

		</div>)

	}

}
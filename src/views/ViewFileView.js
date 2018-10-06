import React, { Component } from 'react';
import '../App.css';

export default class ViewFileView extends Component {

	constructor(props) {
		super(props);
		this.state = {...props};
	}

	render() {
		const {
			state: {
				rows,
			},
			props: {
				onAccept
			}
		} = this;

		return (
			<div className='view-file-view'>
				{ rows.map((row, index) => <Row row={row} key={index} />) }
				<button onClick={onAccept} >Accept</button>
			</div>
		);
	}
}

function Row({row}) {
	return (
		<div className='row'>
			{ row.map((cell, index) => <input className='cell' value={cell} readOnly={true} key={index} /> ) }
		</div>
	);
}

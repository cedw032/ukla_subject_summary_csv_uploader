import React, { Component } from 'react';
import './App.css';
import SelectFileView from './views/SelectFileView';
import ViewFileView from './views/ViewFileView';
import AllReportsView from './views/AllReportsView';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			route: 'select_file',
		};
	}

	getActions() { 

		var t = this;

		return {
			showFile: (rows) => {
				t.setState({
					route: 'view_file',
					rows,
				});
			},

			showAllReports: () => {
				t.setState({route: 'all_reports'});
			}
		};
	};

	render() {

		if (window.File && window.FileReader && window.FileList && window.Blob) {
			return (
				<div className='app'>
					<Router state={this.state} actions={this.getActions()} />
				</div>
			);
		}

		return (
			<div className='error'>
				<span>App not supported by browser. Try Chrome.</span>
			</div>
		);
	}
}

function Router({state, actions}) {

	const {
		route,
		rows,
	} = state;

	return {
		'select_file': <SelectFileView onFileLoad={actions.showFile} />,
		'view_file': <ViewFileView rows={rows} onAccept={actions.showAllReports} />,
		'all_reports': <AllReportsView rows={rows} />
	}[route];
}



export default App;

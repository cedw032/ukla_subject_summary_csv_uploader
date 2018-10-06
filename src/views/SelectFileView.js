import React from 'react';
import Dropzone from '../components/Dropzone';

export default function SelectFileView({onFileLoad}){
	
	var getRows = (text) => {

		var isQuoted = false;
		text = text.split('').reduce((text, char) => {
			if (char === '"') {
				isQuoted = !isQuoted;
			}

			if (char === ',' && isQuoted) {
				return text + '__QUOTED_COMMA__';
			}

			return text + char;
		}, '');

		var rows = text.split('\r\n');
		rows = rows.map((row) => {
			return row.split(',').map((cell) => 
				cell.replace(/__QUOTED_COMMA__/g, ',')
					.replace(/^"|"$/g, '')
					.replace(/""/g, '"')
			);
		});

		const rowLength = rows.reduce((rowLength, row) => {
			return Math.max(rowLength, row.length);
		}, 0);

		rows = rows.filter((row) => {
			return row.length === rowLength;
		});

		return rows;
	};

	return (
		<div className='select-file-view'>
			<Dropzone onFileLoad={(text) => onFileLoad(getRows(text))} />
		</div>
	);
}
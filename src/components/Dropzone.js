import React from 'react';

export default function Dropzone({onFileLoad}) {
	return <div 
		className='dropzone' 

		onDragOver={(e) => {
			e.stopPropagation();
		    e.preventDefault();
		    e.dataTransfer.dropEffect = 'copy';	
		}} 

		onDrop={(e) => {
			e.stopPropagation();
	    	e.preventDefault();

	    	const files = e.dataTransfer.files;

	    	if (files.length) {
	    		var reader = new FileReader();

	    		reader.onload = (e) => {
	    			onFileLoad(e.currentTarget.result);
	    		};			

				reader.readAsText(files[0]);
	    	}
		}} />;
}
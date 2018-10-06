import React from 'react';
import logo from '../content/logo.png';

export default function Report(props) {
	return (
		<div className='report'>
			<ReportHeader {...props} />
			<div className='result-table'>
				<div key='header' className='row header'>
						<Cell><span>Subject</span></Cell>
						<Cell><span>Result %</span></Cell>
						<Cell><span>Class Average %</span></Cell>
					</div>
				{ Object.keys(props.resultsBySubject).map((subject, index) => 
					<div key={index} className='row'>
						<Cell className='text-left' ><span>{subject}</span></Cell>
						<Cell><span>{props.resultsBySubject[subject].student.toFixed(2) + '%'}</span></Cell>
						<Cell><span>{props.resultsBySubject[subject].average.toFixed(2) + '%'}</span></Cell>
					</div>
				)}
			</div> 
			<div className='comments-section'>
				{ props.comments.map((comment) => 
					<div className='comment'>
						<span>"{comment}"</span>
					</div>
				) }
			</div>
		</div> 
	);
}

function ReportHeader(props) {
	return (
		<div className='report-header'>
			<div className='report-header-bulk'>
				<ReportHeaderLeft {...props} />
				<ReportHeaderRight {...props}/>
			</div>
			<div className='report-card-header-text-image' />
		</div>
	);
};

function ReportHeaderLeft({name, year}) {
	return (
		<div className='report-header-left'>
			<div className='report-header-left-top'>
				<img src={logo} className='report-header-logo' />
				<Address />
			</div>
			<span className='text-left'><b>Madrasah Year:</b>{' ' + year}</span>
			<span>{name}</span>
		</div>
	);
}

function ReportHeaderRight({sid, studentYear, teacher1, teacher2}) {
	return (
		<div className='report-header-right'>
			<div className='row'>
				<Cell><span><b>Report Card</b></span></Cell>
			</div>
			<div className='row'>
				<Cell><span>Student ID</span></Cell>
				<Cell><span>{sid}</span></Cell>
				<Cell><span>Year</span></Cell>
				<Cell><span>{studentYear}</span></Cell>
			</div>
			<div className='row'>
				<Cell><span>Qur'āan Teacher</span></Cell>
				<Cell><span>{teacher1}</span></Cell>
			</div>
			<div className='row'>
				<Cell><span>Deen-ul-Islām Teacher</span></Cell>
				<Cell><span>{teacher2}</span></Cell>
			</div>
		</div>
	);
}

function Cell(props) {
	return (
		<div className={'cell' + ' ' + (props.className || '')} >{props.children}</div>
	);
}

function Address() {
	return (
		<div className='report-header-address'>
			<span><b>Madrasah Umar bin Khattab</b></span>
			<span>185-187 Stoddard Road</span>
			<span>Mount Roskill, 1041</span>
			<span>Auckland, New Zealand</span>
		</div>
	);
}
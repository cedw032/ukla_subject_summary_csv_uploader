import React from 'react';
import Report from '../components/Report';

export default function AllReportsView({rows}) {
	
	const [header1, header2, ...reportRows] = rows;

	const getPropsForReport = function(row, index) {

		return {
			name: getFieldValue('Name', row),
			year: getFieldValue('Year', row),
			studentYear: getFieldValue('Student Year', row),
			sid: getFieldValue('SID', row),
			teacher1: getFieldValue('Teacher 1', row),
			teacher2: getFieldValue('Teacher 2', row),
			resultsBySubject: getResultsBySubject(row),
			comments: getComments(row),
		};

	};

	const getComments = (row) => {
		const commentsStart = getFieldIndex('Comments');
		const comments = [];
		for (var i = commentsStart; row[i]; ++i) {
			comments.push(row[i]);
		}
		return comments;
	}

	var getResultsBySubject = (row) => {
		const subjects = getSubjects();
		const resultsBySubject = {};

		console.log('SUBJECTS', subjects);

		subjects.forEach((subject) => {
			resultsBySubject[subject] = {
				student: getStudentSubjectScore(subject, row),
				average: getClassAverageScore(subject),
			};
		});

		return resultsBySubject;
	}

	const getClassAverageScore = (subject) => {
		const sum = reportRows.reduce((sum, row) => {
			console.log('PRE SUM', sum);
			return sum + (+getStudentSubjectScore(subject, row));
		}, 0);

		console.log('SUM', sum);

		return sum / reportRows.length;
	}

	const getStudentSubjectScore = (subject, row) => {
		const rawScore = row[getSubjectIndex(subject)];
		console.log('TEST');
		console.log('RAW SCORE', rawScore);
		return +rawScore;
		//return ((+rawScore) / 10) * 100;
	}

	const getSubjectIndex = (subject) => {
		const subjectsStart = getFieldIndex('Subject');
		return header2.indexOf(subject, subjectsStart);
	}

	const getSubjects = () => {
		const subjectsStart = getFieldIndex('Subject');
		const subjectsEnd = getFieldIndex('Comments');

		console.log('subjects start', subjectsStart);
		console.log('subjects end', subjectsEnd);

		const subjects = [];

		for (var i = subjectsStart; i < subjectsEnd; ++i) {
			subjects.push(header2[i]);
		}

		return subjects;
	}

	var getFieldValue = (field, row) => {
		return row[getFieldIndex(field)];
	}

	var getFieldIndex = (field) => {
		return header1.indexOf(field);
	}

	return (
		<div className='all-reports-view' >
			{ reportRows.map((row, index) => [
				<Report {...getPropsForReport(row)} key={index} />,
				<footer />
			] ) }
			{/*<Report {...getPropsForReport(reportRows[0])} key={0} />*/}
		</div>
	);
}
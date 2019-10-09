import React from 'react';

export default function Question({ question }) {
	const { text, type, answers } = question;
	return (
		<div>
			<h1>{text}</h1>
			{type === 'radio' ? (
				answers.map(answer => <input type={type} value={answer} />)
			) : (
				<input type={type} />
			)}
		</div>
	);
}

import React, { useState } from 'react';
import Scoreboard from './Scoreboard';
import styled from 'styled-components';

export default props => {
	// const [state, setState] = useState({
	// 	question: 'When was JavaScript invented?',
	// 	choices: ['1998', '1997', '2006', '2015'],
	// 	answer: ['1997']
	// });

	const { shortUrl, question } = props;
	return (
		<GameContainer>
			{shortUrl && <h2>{shortUrl}</h2>}
			<form action='' method='post'>
				<h1>{question.question}</h1>
				{question.choices.map((e, i) => {
					return (
						<div key={i}>
							<input type='radio' name={e} id={`choice${i}`} key={i} />
							<label htmlFor={`choice${i}`}>{e}</label>
						</div>
					);
				})}
				<button type='submit'>Submit</button>
			</form>
		</GameContainer>
	);
};

const GameContainer = styled.div`
	display: flex;
	width: 100vw;
	height: 80vh;
	text-align: center;
	flex-direction: column;
	form {
		margin: auto;
		align-self: center;
	}
`;

import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import styled from 'styled-components';

export default function CreateGame(props) {
	const [game, setGame] = useState([]);
	const [question, setQuestion] = useState({
		question: '',
		answer: '',
		choices: []
	});
	const [choice, setChoice] = useState({
		value: ''
	});
	const fireBase = useContext(FirebaseContext);
	const handleChange = e => {
		setQuestion({ ...question, [e.target.name]: e.target.value });
	};
	const handleChoice = e => {
		setChoice({ ...choice, [e.target.name]: e.target.value });
	};
	const addChoice = e => {
		e.preventDefault();
		setQuestion({ ...question, choices: [...question.choices, choice] });
		setChoice({ value: '' });
	};
	const addToGame = e => {
		e.preventDefault();
		setGame([...game, question]);
		setQuestion({ question: '', choices: [], answer: '' });
		setChoice({ type: 'text', value: '' });
	};

	const submitGameToDB = () => {
		fireBase.database
			.collection('games')
			.doc('TechTrivia')
			.set({
				name: 'Tech Trivia',
				questions: [...game]
			});
	};
	return (
		<CreateGameContainer>
			<div className='question_form'>
				<div>
					<form onSubmit={addToGame} action=''>
						{Object.keys(question).map((field, i) => {
							if (field === 'choices') {
								return question[field].map((choice, i) => (
									<p key={i}>{choice.value}</p>
								));
							} else {
								return (
									<div key={i} style={{ textTransform: 'capitalize' }}>
										<label htmlFor={field + i}>{field}: </label>
										<input
											key={i}
											type='text'
											id={`${field}${i}`}
											name={field}
											value={question[field].value}
											onChange={handleChange}
										/>
									</div>
								);
							}
						})}
						<button type='submit'>Add Question</button>
					</form>
				</div>
				<div>
					{/* <select onChange={handleChoice} name='type' id=''>
					<option value='text'>Input</option>
					<option value='radio'>MutipleChoice</option>
				</select> */}
					<input
						type='text'
						name='value'
						onChange={handleChoice}
						value={choice.value}
					/>
					<button onClick={addChoice}>Add Choice</button>
				</div>
			</div>
			<div>
				{game.map((questionObj, i) => {
					const { question, answer, choices } = questionObj;
					return (
						<div key={i}>
							<h1>{question}</h1>
							<h1>{answer}</h1>
							{choices.map((choice, i) => (
								<p key={i}>{choice.value}</p>
							))}
						</div>
					);
				})}
				<button onClick={submitGameToDB}>Submit to DB</button>
			</div>
		</CreateGameContainer>
	);
}

const CreateGameContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	margin: auto;
	div {
		margin: 20px 0;
	}
	.question_form {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
`;

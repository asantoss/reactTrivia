import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import styled from 'styled-components';
// import Scoreboard from './Scoreboard';

export default function HostView({ room }) {
	const [game, setGame] = useState([]);
	const [roomName, setRoomName] = useState('');
	const [question, setQuestion] = useState({
		text: '',
		answer: '',
		choices: []
	});
	const [choice, setChoice] = useState('');
	const fireBase = useContext(FirebaseContext);
	const handleChange = e => {
		setQuestion({ ...question, [e.target.name]: e.target.value });
	};
	const handleChoice = e => {
		setChoice(e.target.value);
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

	const submitQuestionToDb = question => {
		const { id } = room;
		fireBase.database
			.collection('rooms')
			.doc(id)
			.update({
				currentQuestion: { ...question }
			});
	};
	return (
		<CreateGameContainer>
			<div className='question_form'>
				<div>
					<label htmlFor='question'>Question: </label>
					<input
						type='text'
						id='question'
						name='text'
						value={question.text}
						onChange={handleChange}
					/>
					<label htmlFor='answer'>Answer: </label>
					<input
						id='answer'
						name='answer'
						value={question.answer}
						onChange={handleChange}
					/>
					<button onClick={addToGame} type='submit'>
						Add Question
					</button>
				</div>
				<div>
					{question.choices.map(choice => {
						return <p>{choice}</p>;
					})}
					<label htmlFor='choice'>
						Choice {question.choices.length > 0 && question.choices.length + 1}
					</label>
					<input
						type='text'
						name='value'
						id='choice'
						onChange={handleChoice}
						value={choice.value}
					/>
					<button onClick={addChoice}>Add Choice</button>
				</div>
			</div>
			<div>
				{game.map((questionObj, i) => {
					const { text, choices } = questionObj;
					return (
						<div key={i}>
							<h1>{text}</h1>
							{choices.map((choice, i) => (
								<p key={i}>{choice}</p>
							))}
							<button onClick={() => submitQuestionToDb(questionObj)}>
								Submit to DB
							</button>
						</div>
					);
				})}
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

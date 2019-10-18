import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../firebase';
import styled from 'styled-components';
import Scoreboard from './Scoreboard';
import QuestionForm from './QuestionForm';
import QuestionCard from './QuestionCard';
import HostPanel from './HostPanel';

export default function HostView({ room, users, sendNewRoomName }) {
	const [game, setGame] = useState([]);
	// const [roomName, setRoomName] = useState('');
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const [choices, setChoices] = useState(['', '', '', '']);
	const [error, setError] = useState('');
	const [isFormHidden, setFormHidden] = useState(true);
	useEffect(() => {
		const { text, choices, answer } = room.currentQuestion;
		const questionData = {
			question: text,
			choices: choices,
			answer: answer
		};

		setGame(g => {
			const isInGame = g.some(e => e.question === questionData.question);
			return isInGame ? [...g] : [...g, questionData];
		});
	}, [setGame, room]);
	const fireBase = useContext(FirebaseContext);
	const handleChoice = (e, i) => {
		const newChoices = [...choices];
		newChoices[i] = e.target.value;
		setChoices([...newChoices]);
		setError('');
	};

	const addToGame = e => {
		e.preventDefault();
		if (game.some(e => e.question.toLowerCase() === question.toLowerCase())) {
			e.target.reset();
			return setError('Question is already created!');
		}
		setGame([...game, { question, choices, answer, isChoiceHidden: true }]);
		e.target.reset();
		setQuestion('');
		setChoices(['', '', '', '']);
		setAnswer('');
	};
	const submitQuestionToDb = questionObj => {
		const { id } = room;
		fireBase.database
			.collection('rooms')
			.doc(id)
			.update({
				currentQuestion: {
					text: questionObj.question,
					answer: questionObj.answer,
					choices: questionObj.choices
				}
			});
	};
	return (
		<CreateGameContainer {...{ isFormHidden }}>
			{error && <p>{error}</p>}
			<HostPanel
				{...{
					setFormHidden,
					isFormHidden,
					sendNewRoomName
				}}>
				<h1>{room.roomName}</h1>
			</HostPanel>
			<div className='question_form_container'>
				<QuestionForm
					{...{
						addToGame,
						question,
						choices,
						answer,
						setError,
						setGame,
						setAnswer,
						handleChoice,
						setQuestion
					}}
				/>
			</div>
			<div className='game_status_container'>
				<QuestionCard {...{ room, users, game, submitQuestionToDb, setGame }} />
				<div className='scoreboard_host'>
					<Scoreboard users={users} />
				</div>
			</div>
		</CreateGameContainer>
	);
}

const CreateGameContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	text-align: center;
	justify-content: space-between;
	flex-direction: column;
	padding: 10px;
	margin: auto 50px;
	.question_form_container {
		width: 100%;
		display: ${({ isFormHidden }) => (isFormHidden ? 'none' : 'block')};
		.question_form {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.Question {
				display: flex;
				justify-content: center;
				margin: 50px;
			}
			.question_choices {
				padding: 15px;
				display: flex;
			}
		}
	}
	.game_status_container {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		.scoreboard_host {
			width: 30%;
			/* display: flex;
		align-items: center; */
			margin: auto;
		}
		.card_container {
			flex-grow: 2;
		}
	}
`;

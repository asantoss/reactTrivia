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
		const { currentQuestion: questionData } = room;
		questionData.question &&
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
		if (
			game &&
			game.some(e => e.question.toLowerCase() === question.toLowerCase())
		) {
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
				currentQuestion: { ...questionObj }
			});
	};
	return (
		<CreateGameContainer {...{ isFormHidden }}>
			{error && <p>{error}</p>}
			<HostPanel
				{...{
					setFormHidden,
					isFormHidden,
					sendNewRoomName,
					room
				}}>
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
			</HostPanel>

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
	width: 85vw;
	margin: auto;
	.question_form_container {
		width: 100%;
		display: ${({ isFormHidden }) => (isFormHidden ? 'none' : 'block')};
		.question_form {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.Question {
				flex-direction: column;
			}
			.question_choices {
				padding: 15px;
				display: flex;
			}
		}
	}
	.game_status_container {
		display: flex;
		/* justify-content: flex-end; */
		flex-direction: row;
		align-items: center;
		width: 100%;
		.scoreboard_host {
			width: 60%;
			/* display: flex;
		align-items: center; */
			margin: auto;
		}
		.card_container {
			width: 50%;
			display: flex;
			flex-direction: column;
			height: 400px;
			flex-wrap: nowrap;
			overflow-x: auto;
			padding: 10px;
			align-items: center;
			background: rgba(0, 0, 0, 0.08)
		}
		@media (max-width: 768px) {
			display: flex;
			flex-direction: column;
			padding: 0;
			#roomname {
				font-size: 3.4rem;
			}
			.card_container {
				height: fit-content;
				width: 100%;
				padding: 15px
				flex-direction: row;
				-webkit-overflow-scrolling: touch;
				&::-webkit-scrollbar {
					display: none;
				}
			}
			.scoreboard_host {
				width: 100%;
			}
		}
	}
`;

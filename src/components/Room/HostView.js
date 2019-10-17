import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import styled from 'styled-components';
import Scoreboard from './Scoreboard';
import {
	TextField,
	Button,
	Container,
	Select,
	MenuItem,
	InputLabel,
	Card,
	Avatar,
	CardHeader,
	CardContent,
	Fab,
	ListItemText,
	ListItem,
	ListItemIcon,
	IconButton
} from '@material-ui/core';
import {
	SendSharp,
	Visibility,
	VisibilityOff,
	Star,
	Close
} from '@material-ui/icons';

export default function HostView({ room, users }) {
	const [game, setGame] = useState([]);
	const [roomName, setRoomName] = useState('');
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const [choices, setChoices] = useState(['', '', '', '']);
	const [error, setError] = useState('');
	const fireBase = useContext(FirebaseContext);
	const handleChoice = (e, i) => {
		const newChoices = [...choices];
		newChoices[i] = e.target.value;
		setChoices([...newChoices]);
		setError('');
	};
	const addToGame = e => {
		e.preventDefault();
		setGame([...game, { question, choices, answer, isChoiceHidden: true }]);
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
	const setNextHost = id => {
		const currentHost = users.filter(user => user.id === room.hostId);
		const currentHostIndex = users.indexOf(currentHost);
		const nextHost = users[currentHostIndex + 1];
		fireBase.database.collection('rooms').update({
			hostId: nextHost.id
		});
	};
	return (
		<CreateGameContainer>
			{error && <p>{error}</p>}
			<header>{room.roomName}</header>
			<div className='question_form'>
				<form action='' onSubmit={addToGame} method='post'>
					<div className='Question'>
						<HostInput
							id='question'
							width='large'
							onChange={e => {
								setQuestion(e.target.value);
								setError('');
							}}
							value={question.text}
							placeholder='Question'
							label='Question'
							name='question'
							margin='normal'
							required
						/>
					</div>
					<div>
						{choices.map((e, i) => {
							return (
								<HostInput
									label={`Choice ${i + 1}`}
									key={i}
									id={`choice${i}`}
									onChange={e => handleChoice(e, i)}
									defaultValue={choices[i] || ''}
									required
								/>
							);
						})}
					</div>
					{choices[0] && (
						<div className='question_choices'>
							<InputLabel htmlFor='answer'>Answer</InputLabel>
							<AnswerSelect
								defaultValue='Answer'
								value={answer || ''}
								placeholder='Answer'
								required
								onChange={e => {
									setAnswer(e.target.value);
									setError('');
								}}
								inputProps={{ name: 'answer', id: 'answer' }}>
								{choices.map((choice, i) => {
									return (
										<MenuItem
											key={i}
											style={{ textTransform: 'capitalize' }}
											value={choice}>
											{choice}
										</MenuItem>
									);
								})}
							</AnswerSelect>
						</div>
					)}
					<Button type='Submit' variant='contained' color='primary'>
						Add Question
					</Button>
				</form>
			</div>

			<div className='scoreboard_host'>
				<Scoreboard users={users} />
			</div>
			<div className='card_container'>
				{game.map((questionObj, i) => {
					const { question, choices } = questionObj;
					return (
						<QuestionCard key={i} isHidden={questionObj.isHidden}>
							<CardHeader
								className='question_card_header'
								avatar={<Avatar aria-label='question'>Q</Avatar>}
								action={
									<IconButton
										aria-label='remove'
										onClick={() => {
											setGame([...game.slice(0, i), ...game.slice(i + 1)]);
										}}>
										<Close />{' '}
									</IconButton>
								}
								title={question}
								subheader={`${choices.length} Choices`}
							/>
							<CardContent className='question_card_choices'>
								{choices.map((choice, i) => (
									<ListItem key={i}>
										{choice === questionObj.answer && (
											<ListItemIcon className='answer_icon'>
												<Star />
											</ListItemIcon>
										)}
										{choice}
									</ListItem>
								))}
							</CardContent>
							<Fab
								variant='extended'
								onClick={() => submitQuestionToDb(questionObj)}>
								Send to Users <SendSharp />
							</Fab>
							<Fab
								variant='extended'
								onClick={() =>
									setGame([
										...game.slice(0, i),
										{ ...questionObj, isHidden: !questionObj.isHidden },
										...game.slice(i + 1)
									])
								}>
								{questionObj.isHidden ? <Visibility /> : <VisibilityOff />}
							</Fab>
						</QuestionCard>
					);
				})}
			</div>
		</CreateGameContainer>
	);
}

const HostInput = styled(TextField)`
	width: ${({ width }) => (width === 'large' ? '300px' : '100px')};
	margin: 20px !important;
`;
const AnswerSelect = styled(Select)`
	width: 100px;
`;

const QuestionCard = styled(Card)`
	width: 350px;
	.question_card_choices {
		display: ${({ isHidden }) => (isHidden ? 'flex' : 'none')};
		justify-content: space-between;
		.answer_icon {
			min-width: 30px;
			color: red;
		}
	}
`;

const CreateGameContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	/* flex-direction: column; */
	padding: 10px;
	margin: auto 50px;
	.question_form {
		height: 50vh;
		width: 50%;
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
	.scoreboard_host {
		width: 50%;
		/* display: flex;
		align-items: center; */
		margin: auto;
	}
	.card_container {
		flex-grow: 2;
	}
`;

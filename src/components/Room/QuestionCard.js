import React, { useState } from 'react';
import styled from 'styled-components';
import {
	Visibility,
	VisibilityOff,
	Close,
	Star,
	Send
} from '@material-ui/icons';
import {
	Card,
	CardHeader,
	IconButton,
	CardContent,
	ListItem,
	ListItemIcon,
	Fab,
	Avatar
} from '@material-ui/core';

export default function QuestionCard({
	room,
	game,
	setGame,
	submitQuestionToDb
}) {
	return (
		<div className='card_container'>
			{game.map((questionObj, i) => {
				const { question, choices, isHidden } = questionObj;
				const isCurrentQuestion = room.currentQuestion.question === question;
				return (
					<QuestionCardElement key={i} ishidden={isHidden ? 1 : 0}>
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
							disabled={isCurrentQuestion ? true : false}
							onClick={() => submitQuestionToDb(questionObj)}>
							{isCurrentQuestion ? 'Sent' : 'Send'} <Send />
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
					</QuestionCardElement>
				);
			})}
		</div>
	);
}

const QuestionCardElement = styled(Card)`
	width: ${({ ishidden }) => (ishidden ? 'fit-content' : '325px')};
	margin: 15px;
	flex: 0 0 auto;
	.question_card_choices {
		display: ${({ ishidden }) => (ishidden ? 'flex' : 'none')};
		justify-content: space-between;
		.answer_icon {
			min-width: 30px;
			color: red;
		}
	}
	@media (max-width: 768px) {
		width: ${({ ishidden }) => (ishidden ? '300' : '205px')};
		margin: 10px;
	}
`;

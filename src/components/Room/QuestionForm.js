import React from 'react';
import styled from 'styled-components';
import {
	InputLabel,
	TextField,
	Select,
	MenuItem,
	Button
} from '@material-ui/core';

export default function QuestionForm({
	addToGame,
	question,
	choices,
	answer,
	setError,
	setQuestion,
	setAnswer,
	handleChoice
}) {
	return (
		<div className='question_form'>
			<form action='' onSubmit={addToGame} method='post'>
				<div className='Question'>
					<HostInput
						id='question'
						InputProps={{ disableUnderline: true }}
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
					{choices[0] && (
						<div>
							<InputLabel htmlFor='answer'>Answer</InputLabel>
							<AnswerSelect
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
				</div>
				<div>
					{choices.map((e, i) => {
						return (
							<HostInput
								label={`Choice ${i + 1}`}
								key={i}
								InputProps={{ disableUnderline: true }}
								id={`choice${i}`}
								onChange={e => handleChoice(e, i)}
								defaultValue={choices[i] || ''}
								required
							/>
						);
					})}
				</div>
				<Button type='submit' variant='contained' color='primary'>
					Add Question
				</Button>
			</form>
		</div>
	);
}

const HostInput = styled(TextField)`
	width: ${({ width }) => (width === 'large' ? '300px' : '100px')};
	margin: 20px !important;
	@media (max-width: 768px) {
		width: ${({ width }) => (width === 'large' ? '200px' : '75px')};
		margin: 10px;
	}
`;
const AnswerSelect = styled(Select)`
	width: 100px;
	@media (max-width: 768px) {
		width: 75px;
	}
`;

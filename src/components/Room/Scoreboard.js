import React from 'react';
import styled from 'styled-components';

export default function Scoreboard(props) {
	const users = [
		{
			name: 'Juanito',
			id: 768763242,
			score: 98
		},
		{
			name: 'Juanito',
			id: 768763242,
			score: 98
		},
		{
			name: 'Juanito',
			id: 768763242,
			score: 98
		},
		{
			name: 'Juanito',
			id: 768763242,
			score: 98
		},
		{
			name: 'Juanito',
			id: 768763242,
			score: 98
		},
		{
			name: 'Juanito',
			id: 768763242,
			score: 98
		},
		{
			name: 'Juanito',
			id: 768763242,
			score: 98
		},
		{
			name: 'Juanito',
			id: 768763242,
			score: 98
		},
		{
			name: 'Juanito',
			id: 768763242,
			score: 98
		}
	];
	return (
		<div>
			{users.map((user, i) => {
				const { name, score } = user;
				return (
					<div key={i}>
						<h1>{name}</h1>
						<h3>{score}</h3>
					</div>
				);
			})}
		</div>
	);
}

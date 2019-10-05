import React from 'react';

export default function Scoreboard({ users }) {
	return (
		<div>
			{users.map(user => {
				const { name, id, score } = user;
				return (
					<>
						<h1>{name}</h1>
						<span>{id}</span>
						<h3>{score}</h3>
					</>
				);
			})}
		</div>
	);
}

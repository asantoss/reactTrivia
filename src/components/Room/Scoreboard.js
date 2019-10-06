import React from 'react';

export default function Scoreboard({ users }) {
	return (
		<div>
			{users.map((user, i) => {
				const { name, id, score } = user;
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

import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

export default function Scoreboard(props) {
	// const usersHardcodedData = [
	// 	{
	// 		name: 'Juanito',
	// 		id: 768763241,
	// 		score: 95
	// 	},
	// 	{
	// 		name: 'Joetta',
	// 		id: 768763242,
	// 		score: 93
	// 	},
	// 	{
	// 		name: 'Alex',
	// 		id: 768763243,
	// 		score: 91
	// 	},
	// 	{
	// 		name: 'Ron',
	// 		id: 768763244,
	// 		score: 91
	// 	},
	// 	{
	// 		name: 'Tim',
	// 		id: 768763245,
	// 		score: 107
	// 	},
	// 	{
	// 		name: 'Renna',
	// 		id: 768763246,
	// 		score: 56
	// 	},
	// 	{
	// 		name: 'Anthony',
	// 		id: 768763247,
	// 		score: 106
	// 	},
	// 	{
	// 		name: 'Jordan',
	// 		id: 768763248,
	// 		score: 100
	// 	},
	// 	{
	// 		name: 'Jesus',
	// 		id: 768763249,
	// 		score: 96
	// 	}
	// ];
	//TODO: all the user are hardcoded, needs to be set up to where i can fetch them from
	//TODO: firebase

	const { users } = props;

	const Players = users
		.sort((a, b) => b.score - a.score)
		.map((userObj, id) => {
			const { name, score } = userObj;
			return (
				<TableTR>
					<TableTH>{1 + id}</TableTH>
					<TableTH>{name}</TableTH>
					<TableTH>{score}</TableTH>
				</TableTR>
			);
		});

	return (
		<ThemeProvider theme={theme}>
			<DivContainer>
				<Table id='socreboard' className='table striped'>
					<TableHead>
						<TableTR>
							<TableTH>Rank</TableTH>
							<TableTH>Username</TableTH>
							<TableTH>Score</TableTH>
						</TableTR>
					</TableHead>
					<tbody>{Players}</tbody>
				</Table>
			</DivContainer>
			{/* <button onClick={addUsers}>Add Users</button> */}
		</ThemeProvider>
	);
}

const theme = {
	// primary: "#edb51c",
	// secondary: "#43e838",
	background:
		'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
	color: 'white'
};

const DivContainer = styled.div`
	background: ${props => props.theme.background};
	background: ${props => props.theme.gradientBackground};
	margin: 0 auto;
	width: 100%;
	flex-basis: 35%;
	color: ${props => props.theme.color};
	box-shadow: 5px 5px #888888;
`;
const Table = styled.table`
	/* margin-top: 20px; */
`;

const TableHead = styled.thead`
	background: #111;
	color: #fff;
`;

const TableTR = styled.tr`
	text-align: center;

	&:nth-child(odd) {
		text-align: center;
	}
`;

const TableTH = styled.th`
	text-align: center;

	&:nth-child(odd) {
		text-align: center;
	}
`;

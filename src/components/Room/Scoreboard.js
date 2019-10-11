import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { FirebaseContext } from '../firebase';

export default function Scoreboard(props) {
	const usersHardcodedData = [
		{
			name: 'Juanito',
			id: 768763241,
			score: 95
		},
		{
			name: 'Joetta',
			id: 768763242,
			score: 93
		},
		{
			name: 'Alex',
			id: 768763243,
			score: 91
		},
		{
			name: 'Ron',
			id: 768763244,
			score: 91
		},
		{
			name: 'Tim',
			id: 768763245,
			score: 90
		},
		{
			name: 'Renna',
			id: 768763246,
			score: 56
		},
		{
			name: 'Anthony',
			id: 768763247,
			score: 106
		},
		{
			name: 'Jordan',
			id: 768763248,
			score: 100
		},
		{
			name: 'Jesus',
			id: 768763249,
			score: 96
		}
	];

	const fireBase = useContext(FirebaseContext);

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

	const addUsers = () => {
		// fireBase.doUpdateUser({
		// 	roomId: '38CXzxbp15uoeoGdvWoB',
		// 	userId: 768763249,
		// 	payload: { score: 35 }
		// });

		usersHardcodedData.forEach(name =>
			fireBase.doAddUserToRoom('UxtXPxyiyuzNLS2OMCjA', name)
		);
	};

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
			<button onClick={addUsers}>Add Users</button>
		</ThemeProvider>
	);
}

const theme = {
	background: 'linear-gradient(to left, rgba(255,0,0,0), rgba(255,0,0,1))',
	primary: '#edb51c',
	secondary: '#43e838'
};

const DivContainer = styled.div`
	background: ${props => props.theme.background};
	margin: 0 auto;
	width: 80%;
	/* border: 3px solid black; */
`;
const Table = styled.table`
	margin-top: 20px;
`;

const TableHead = styled.thead`
	background: #111;
	color: #fff;
`;

const TableTR = styled.tr`
	text-align: center;
	&:nth-child(odd) {
		text-align: center;
		/* background: linear-gradient(to left, rgba(255,0,0,0), rgba(255,0,0,1)) */
	}
`;

const TableTH = styled.th`
	text-align: center;

	&:nth-child(odd) {
		text-align: center;
		/* background: linear-gradient(to left, rgba(255,0,0,0), rgba(255,0,0,1)) */
	}
`;

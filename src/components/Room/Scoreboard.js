import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { FirebaseContext } from '../firebase';

export default function Scoreboard(props) {

	const fireBase = useContext(FirebaseContext);

	const { users } = props;

	const Players = users
		.sort((a, b) => b.score - a.score)
		.map((userObj, id) => {
			const { name, score } = userObj;
			return (
				<TableTR key={id}>
					<TableTH>{1 + id}</TableTH>
					<TableTH>{name}</TableTH>
					<TableTH>{score}</TableTH>
				</TableTR>
			);
		});

	return (
		<ThemeProvider theme={theme}>
			<DivContainer>
				<Table id='socreboard'>
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

	background: 'rgb(233,143,26)',
	background:
		'linear-gradient(0deg, rgba(233,143,26,0.9861878453038674) 1%, rgba(253,235,45,0.9108018207282913) 100%)',
	color: 'black'
};

const DivContainer = styled.div`
	background: ${props => props.theme.background};
	background: ${props => props.theme.gradientBackground};
	margin: 5vh auto;
	width: 100%;
	flex-basis: 35%;
	color: ${props => props.theme.color};
	box-shadow: 5px 5px #888888;
	border-radius: 12px;

		@media (max-width: 768px) {
    width: 80%;
		margin: 5vh auto;

  }

`;
const Table = styled.table`
	/* @media (max-width: 768px) {
    width: 80%;
		margin: 0 auto;

  } */
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

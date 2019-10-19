import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { FirebaseContext } from '../firebase';

export default function Landing(props) {
	const [CreateRoomName, setCreateRoomName] = useState('');
	const [roomId, setRoomId] = useState('');
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(null);
	const fireBase = useContext(FirebaseContext);
	const createRoom = () => {
		const { user } = props;
		const { isLoggedIn } = user;
		if (isLoggedIn) {
			fireBase
				.doCreateRoom(CreateRoomName, user)
				.then(res => {
					error !== null && setError(null);
					setRoomId(res);
					setRedirect(!redirect);
				})
				.catch(e => {
					setError('There was an error creating the room.');
				});
		} else {
			setError('You must be logged in to create a room.');
		}
	};
	const joinRoom = () => {
		setRoomId(roomId);
		setRedirect(!redirect);
	};
	return !redirect ? (
		<ThemeProvider theme={theme}>
			<div
				style={{
					height: '90vh',
					borderRadius: '10px',
					padding: '15px 5px'
				}}>
				{error && <p style={{ color: 'red' }}>{error}</p>}
				<H1>Join or Create a Room!</H1>
				<DivContainer>
					<DivInput>
						<Input
							onChange={e => setCreateRoomName(e.target.value)}
							type='text'
							placeholder='Create a Room'
							value={CreateRoomName}
						/>
						<Button onClick={createRoom}>Create</Button>
					</DivInput>
					<br />
					<DivInput>
						<Input
							onChange={e => setRoomId(e.target.value)}
							type='text'
							placeholder='Join a Room'
							value={roomId}
						/>
						<Button onClick={joinRoom}>Join </Button>
					</DivInput>
				</DivContainer>
			</div>
		</ThemeProvider>
	) : (
		<Redirect to={`/rooms/${roomId}`} />
	);
}

//! Styled Components

const DivContainer = styled.div`
	width: 30%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
const DivInput = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;

const theme = {
	primary: '#6495ED',
	secondary: '#9ACD32',
	font: 'sans-serif'
};

const H1 = styled.h1`
	font-size: 3rem;
	font-family: ${props => props.theme.font};
	color: darkgray;
`;

const Button = styled.button`
	text-transform: uppercase;
	font-size: 11px;
	font-weight: 600;
	font-family: ${props => props.theme.font};
	border: none;
	width: 20%;
	background: ${props => props.theme.primary};
	color: #fff;
	line-height: 0;
	padding: 0;
	border-radius: 20px;
	box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	-webkit-transition-duration: 0.4s;
	transition-duration: 0.4s;

	cursor: pointer;
	&:hover {
		background: ${props => props.theme.secondary};
	}
`;

const Input = styled.input`
	margin: 15px 0;
	padding: 15px 10px;
	width: 60%;
	outline: none;
	border: 1px solid #bbb;
	border-radius: 20px;
	display: inline-block;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	-webkit-transition: 0.2s ease all;
	-moz-transition: 0.2s ease all;
	-ms-transition: 0.2s ease all;
	-o-transition: 0.2s ease all;
	transition: 0.2s ease all;
	box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	-webkit-transition-duration: 0.4s;
	transition-duration: 0.4s;

	::placeholder {
		font-size: 15px;
		font-weight: 600;
	}

	&:focus {
		background: ${props => props.theme.primary};
	}
`;

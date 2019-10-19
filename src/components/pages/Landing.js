import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { FirebaseContext } from '../firebase';
import { useTransition, animated, useSpring } from 'react-spring'
import { device } from '../pages/Mediaqueries';
import Nav from '../NavBar/NavBar'

export default function Landing(props) {
	const [state, setstate] = useState('');
	const [roomId, setRoomId] = useState('');
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(null);
	const fireBase = useContext(FirebaseContext);
	const createRoom = () => {
		const { user } = props;
		const { isLoggedIn } = user;
		if (isLoggedIn) {
			fireBase
				.doCreateRoom(state, props.user)
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
		setRoomId(state);
		setRedirect(!redirect);
	};
	//! DEFINING SPRING ANIMATED HERE 
	const [props2, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))


	const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
	const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
	//!--------------------------------------------------------------------------------------------
	return !redirect ? (
		<ThemeProvider theme={theme}>
			<Background onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
				onMouseLeave={() => set({ xys: [0, 0, 1] })}
				style={{ transform: props2.xys.interpolate(trans) }}>
			</Background>
			<DivContainer >
				{error && <p style={{ color: 'red' }}>{error}</p>}
				<h1>Join or Create a Room!</h1>
				<DivInput>
					<Input
						onChange={e => setstate(e.target.value)}
						type='text'
						placeholder='Create a Room'
					/>
					<Button onClick={createRoom}>Create</Button>
				</DivInput>
				<br />
				<DivInput>
					<Input
						onChange={e => setstate(e.target.value)}
						type='text'
						placeholder='Join a Room'
					/>
					<Button onClick={joinRoom}>Join </Button>
				</DivInput>
			</DivContainer>
		</ThemeProvider>
	) : (
			<Redirect to={`/rooms/${roomId}`} />
		);
}

//! Styled Components
const Background = styled(animated.div)`
    
	width: 65ch;
	height: 45ch;
	background: pink;
	border-radius: 5px;
	background-image: url(https://gowestshore.com/wp-content/uploads/DD-Trivia-Illustration-98786-Preview.jpg);
	background-size: cover;
	background-position: center center;
	box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
	transition: box-shadow 0.5s;
	will-change: transform;
	border: 15px solid white;
	margin: 0 auto -25ch;
	max-width: 100%;
	height: 70vw;

	&:hover{
		box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
	}

	@media ${device.mobileL} {
		max-width: 425px;
		height: 45ch;
	}
`;

const DivContainer = styled.div`
	width: 30%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-top: 300px;
`;
const DivInput = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;

const theme = {
	primary: '#FF00FF',
	secondary: '#FFD700',
	font: 'sans-serif'
};



const Button = styled.button`
	text-transform: uppercase;
	font-size: 11px;
	font-weight: 600;
	font-family: ${props => props.theme.font};
	border: none;
	width: 100px;
	background: ${props => props.theme.primary};
	color: #FFD700;
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
	@media ${device.mobileL} {
		max-width: 500px;
		
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


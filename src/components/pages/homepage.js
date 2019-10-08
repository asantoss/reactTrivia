import React, { Component, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import {
	Form,
	Input,
	Button,
	StyledimgC,
	StyledImg,
	Container,
	Cancelbtn,
	Span
} from './form';
import { withFirebase } from '../firebase';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const [user, setUser] = useState('');
		const [password, setPassword] = useState('');

		const theme = {
			font: 'Arial'
		};
		return (
			<ThemeProvider theme={theme}>
				<Form action=' ' method=' '>
					<StyledimgC>
						<StyledImg src='triviaimg.png' alt='Trivia' />
					</StyledimgC>

					<Container>
						<label htmlFor='user'>
							<b>Username</b>
						</label>
						<Input
							type='text'
							placeholder='Enter Username'
							onchange={e => setUser(e.target.value)}
							value={user}
							required
						/>

						<label htmlFor='password'>
							<b>Password</b>
						</label>
						<Input
							type='password'
							placeholder='Enter Password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>

						<Button type='submit'>Login</Button>
						<label>
							<Input type='checkbox' checked='checked' name='remember' />{' '}
							Remember me
						</label>
					</Container>
					<Container>
						<Cancelbtn type='button'>Cancel</Cancelbtn>
						<Span class='psw'>
							Forgot <a href='#'>password?</a>{' '}
						</Span>
					</Container>
				</Form>
			</ThemeProvider>
		);
	}
}

export default Home;

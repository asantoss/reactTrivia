import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { Form, Input, Button, StyledimgC, StyledImg, Container } from './form';
import { withFirebase } from '../firebase';
import { firestore } from 'firebase';

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			displayName: ''
		};
	}

	handleSignUp = e => {
		const { email, password, displayName } = this.state;
		e.preventDefault();
		this.props.fireBase
			.doCreateUserWithEmailAndPassword(email, password)
			.then(() => {
				return this.props.fireBase.doUpdateUserInfo({
					displayName
				});
			})
			.then(user => {
				this.props.authenticateUser({
					id: user.uid,
					name: user.displayName
				});
			});
	};

	handleSignIn = e => {
		const { email, password } = this.state;
		const { fireBase, authenticateUser } = this.props;
		e.preventDefault();
		fireBase.doSignInWithEmailAndPassword(email, password).then(user => {
			debugger;
			authenticateUser({
				id: user.uid,
				name: user.displayName
			});
			debugger;
		});
	};

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const theme = {
			font: 'Arial'
		};
		//Checks to see if it is the signup page in the URL and sets isSignup : true or false
		const isSignUp = this.props.match.url === '/signup';
		return (
			<ThemeProvider theme={theme}>
				<Form
					onSubmit={e =>
						isSignUp ? this.handleSignUp(e) : this.handleSignIn(e)
					}>
					<StyledimgC>
						<StyledImg src='triviaimg.png' alt='Trivia' />
					</StyledimgC>

					<Container>
						{//Create an array from all of the keys in state
						Object.keys(this.state).map((stateKey, i) => {
							const keyCapitalized =
								stateKey === 'displayName'
									? 'Display Name'
									: capitalizeWord(stateKey);
							if (!isSignUp && stateKey === 'displayName') return null;

							return (
								<div key={i}>
									<label htmlFor={stateKey}>
										<b>{keyCapitalized}</b>
									</label>
									<Input
										type={stateKey === 'password' ? 'password' : 'text'}
										placeholder={`Enter ${keyCapitalized}`}
										name={stateKey}
										onChange={e => this.handleChange(e)}
										value={this.state[stateKey]}
										required
									/>
								</div>
							);
						})}
						<div>
							<Button type='submit'>Sign Up</Button>
							{isSignUp && (
								<label>
									<Input
										type='checkbox'
										defaultChecked
										onClick={e => (e.target.checked = !e.target.checked)}
										name='remember'
									/>{' '}
									Remember me
								</label>
							)}
						</div>
					</Container>
				</Form>
			</ThemeProvider>
		);
	}
}

function capitalizeWord(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export default withFirebase(SignUp);

import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, Input, Button, StyledimgC, StyledImg, Container } from './form';
import { withFirebase } from '../firebase';

class Authenticator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			user: {
				email: '',
				password: '',
				displayName: ''
			}
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
			})
			.catch(e => {
				this.setState({ ...this.state, error: true });
			});
	};

	handleSignIn = e => {
		const { email, password } = this.state.user;
		const { fireBase, authenticateUser } = this.props;
		e.preventDefault();
		fireBase
			.doSignInWithEmailAndPassword(email, password)
			.then(user => {
				authenticateUser({
					id: user.uid,
					name: user.displayName
				});
			})
			.catch(e => {
				this.setState({ ...this.state, error: true });
			});
	};

	handleChange = event => {
		this.setState({
			...this.state,
			user: { ...this.state.user, [event.target.name]: event.target.value }
		});
	};

	render() {
		const theme = {
			font: 'Arial'
		};
		const { error } = this.state;
		//Checks to see if it is the signup page in the URL and sets isSignup : true or false
		const isSignUp = this.props.match.url === '/signup';
		return (
			<ThemeProvider theme={theme}>
				<Form onSubmit={isSignUp ? this.handleSignUp : this.handleSignIn}>
					<StyledimgC>
						<StyledImg src='triviaimg.png' alt='Trivia' />
					</StyledimgC>
					<Container>
						{//Create an array from all of the keys in state
						Object.keys(this.state.user).map((stateKey, i) => {
							if (!isSignUp && stateKey === 'displayName') return null;
							return (
								<div key={i} style={{ textTransform: 'capitalize' }}>
									<label htmlFor={stateKey}>
										<b>{stateKey}</b>
									</label>
									<Input
										type={stateKey === 'password' ? 'password' : 'text'}
										placeholder={`Enter ${stateKey}`}
										name={stateKey}
										onChange={e => this.handleChange(e)}
										value={this.state[stateKey]}
										autoComplete='new-password'
										required
									/>
								</div>
							);
						})}
						<div>
							<Button type='submit'>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
							{!isSignUp && (
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
						{error && (
							<p>There was an error. Please check your email & password.</p>
						)}
						Dont Have an<Link to='/signup'> Account?</Link>
					</Container>
				</Form>
			</ThemeProvider>
		);
	}
}

function capitalizeWord(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export default withFirebase(Authenticator);

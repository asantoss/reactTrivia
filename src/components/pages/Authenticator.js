import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { Form, Input, Button, StyledimgC, StyledImg, Container } from './form';
import { withFirebase } from '../firebase';
import { Button as MaterialButton } from '@material-ui/core';

class Authenticator extends Component {
	constructor(props) {
		super(props);
		this.url = '';
		this.state = {
			error: null,
			user: {
				email: '',
				password: '',
				nickname: ''
			},
			isAuthenticated: false
		};
	}
	componentDidMount() {
		const { match } = this.props;
		const url = match.url;
		if (url === '/signin') {
			this.handleSubmit = this.handleSignIn;
			this.setState({ user: { email: '', password: '' } });
		}
		if (url === '/signup') {
			this.handleSubmit = this.handleSignUp;
			this.setState({ user: { email: '', password: '', nickname: '' } });
		}
		if (url === '/demo') {
			this.handleSubmit = this.handleSignInAnon;
			this.setState({ user: { nickname: '' } });
		}
	}
	handleSignUp = e => {
		const { email, password, nickname } = this.state;
		e.preventDefault();
		this.props.fireBase
			.doCreateUserWithEmailAndPassword(email, password)
			.then(() => {
				return this.props.fireBase.doUpdateUserInfo({
					displayName: nickname
				});
			})
			.then(user => {
				this.props.authenticateUser({
					id: user.uid,
					name: user.nickname
				});
			})
			.catch(e => {
				this.setState({ ...this.state, error: true });
			});
	};

	handleSignIn = e => {
		const { email, password } = this.state.user;
		const { fireBase, authenticateUser } = this.props;
		if ((email, password)) {
			e.preventDefault();
			fireBase
				.doSignInWithEmailAndPassword(email, password)
				.then(user => {
					authenticateUser({
						id: user.uid,
						name: user.nickname
					});
				})
				.catch(e => {
					this.setState({ ...this.state, error: true });
				});
		} else {
			this.setState({ error: true });
		}
	};
	handleSignInAnon = async e => {
		e.preventDefault();
		const { fireBase, authenticateUser } = this.props;
		if (this.state.user['nickname']) {
			const nickname = this.state.user.nickname;
			await fireBase.doSignInAnon();
			const user = await fireBase.doUpdateUserInfo({
				displayName: nickname
			});
			authenticateUser({
				id: user.uid,
				name: user.displayName
			});
		} else {
			this.setState({ user: { nickname: '' } });
		}
	};

	handleChange = event => {
		this.setState({
			...this.state,
			user: { ...this.state.user, [event.target.name]: event.target.value }
		});
	};
	handleSubmit = event => {
		if (this.url) {
		}
	};

	render() {
		const url = this.props.match;
		const theme = {
			font: 'Arial'
		};
		const { error } = this.state;
		//Checks to see if it is the signup page in the URL and sets isSignup : true or false
		const isSignUp = this.props.match.url === '/signup';
		return this.props.user.isLoggedIn ? (
			<Redirect
				to={{
					pathname: this.props.location.state
						? this.props.location.state.from
						: '/',
					state: { isDemo: url === 'demo' && true }
				}}
			/>
		) : (
			<ThemeProvider theme={theme}>
				<Form onSubmit={this.handleSubmit}>
					<StyledimgC>
						<StyledImg src='triviaimg.png' alt='Trivia' />
					</StyledimgC>
					<Container>
						{//Create an array from all of the keys in state
						Object.keys(this.state.user).map((stateKey, i) => {
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
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								minWidth: '200px'
							}}>
							{error && (
								<p>There was an error. Please check your email & password.</p>
							)}
							<div>
								Don't Have an<Link to='/signup'> Account?</Link>
							</div>
							<div>
								Want to try a{' '}
								<MaterialButton
									variant='text'
									onClick={() => {
										this.setState({ user: { nickname: '' } });
										this.handleSubmit = this.handleSignInAnon;
									}}
									style={{ color: 'blue' }}>
									demo Account?
								</MaterialButton>{' '}
							</div>
						</div>
					</Container>
				</Form>
			</ThemeProvider>
		);
	}
}

export default withFirebase(Authenticator);

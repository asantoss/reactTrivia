import React, { Component } from 'react';
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

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			displayName: ''
		};
	}

	onSubmit = e => {
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

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const theme = {
			font: 'Arial'
		};

		return (
			<ThemeProvider theme={theme}>
				<Form onSubmit={e => this.onSubmit(e)}>
					<StyledimgC>
						<StyledImg src='triviaimg.png' alt='Trivia' />
					</StyledimgC>

					<Container>
						{Object.keys(this.state).map((stateKey, i) => {
							return (
								<div key={i}>
									<label htmlFor={stateKey}>
										<b>
											{stateKey === 'displayName'
												? 'Display Name'
												: stateKey.charAt(0).toUpperCase() + stateKey.slice(1)}
										</b>
									</label>
									<Input
										type={stateKey === 'password' ? 'password' : 'text'}
										placeholder={`Enter ${stateKey}`}
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
							<label>
								<Input
									type='checkbox'
									checked={true}
									onChange={e => (e.target.checked = !e.target.checked)}
									name='remember'
								/>{' '}
								Remember me
							</label>
						</div>
					</Container>
				</Form>
			</ThemeProvider>
		);
	}
}

export default withFirebase(SignUp);

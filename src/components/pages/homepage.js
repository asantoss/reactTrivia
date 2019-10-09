import React, { Component, useState } from 'react';
import { ThemeProvider } from "styled-components";
import { Form, Input, Button, StyledimgC, StyledImg, Container, Cancelbtn, Span } from './form'
import { withFirebase } from '../firebase'


const theme = {
	font: 'Arial'
};
class Home extends Component {
	constructor(props) {
		super(props);

        this.state = {
            email: '',
            password: ''

		}
	}

    onSubmit = (e) => {
        e.preventDefault();
        this.props.fireBase.doSignInWithEmailAndPassword(this.state.email, this.state.password).then(console.log)


    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {



        const theme = {
            font: "Arial"
        }
        return (
            <ThemeProvider theme={theme}>
                <Form onSubmit={e => this.onSubmit(e)}>
                    <StyledimgC>
                        <StyledImg src="triviaimg.png" alt="Trivia" />
                    </StyledimgC>

                    <Container>
                        <label htmlFor="user"><b>Username</b></label>
                        <Input type="text" placeholder="Enter Username" name="email" onChange={e => this.handleChange(e)} value={this.state.email} required />

                        <label htmlFor="password"><b>Password</b></label>
                        <Input type="password" placeholder="Enter Password" name='password' value={this.state.password} onChange={e => this.handleChange(e)} required />

                        <Button type="submit">Login</Button>
                        <label>
                            <Input type="checkbox" checked={true} onChange={e => e.target.checked = !e.target.checked} name="remember" /> Remember me
                        </label>
                    </Container>
                    <Container>
                        <Cancelbtn type="button">Cancel</Cancelbtn>
                        <Span className="psw">Forgot <a href="#">password?</a> </Span>
                    </Container>
                </Form>
            </ThemeProvider>
        )
	}
}


export default withFirebase(Home);

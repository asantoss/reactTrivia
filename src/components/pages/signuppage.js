
import React, { Component } from 'react';
import { ThemeProvider } from "styled-components";
import { Form, Input, Button, StyledimgC, StyledImg, Container, Cancelbtn, Span } from './form'
import { withFirebase } from '../firebase'

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.fireBase.doCreateUserWithEmailAndPassword(this.state.email, this.state.password).then

            (console.log)


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
                        <div>

                            <label htmlFor="user"><b>Username</b></label>
                            <Input type="text" placeholder="Enter email" name="email" onChange={e => this.handleChange(e)} value={this.state.email} required />
                        </div>

                        <div>
                            <label htmlFor="password"><b>Password</b></label>
                            <Input type="password" placeholder="Enter Password" name='password' value={this.state.password} onChange={e => this.handleChange(e)} required />

                        </div>
                        <div>
                            <label htmlFor="firstName"><b>First Name</b></label>
                            <Input type="text" placeholder="Enter Name" name='firstName' value={this.state.firstName} onChange={e => this.handleChange(e)} required />

                        </div>
                        <div>
                            <label htmlFor="lastName"><b>Last Name</b></label>
                            <Input type="text" placeholder="Enter Name" name='lastName' value={this.state.lastName} onChange={e => this.handleChange(e)} required />

                        </div>
                        <div>
                            <Button type="submit">Login</Button>
                            <label>
                                <Input type="checkbox" checked={true} onChange={e => e.target.checked = !e.target.checked} name="remember" /> Remember me
                            </label>
                        </div>

                    </Container>

                </Form>
            </ThemeProvider>
        )
    }
}


export default withFirebase(SignUp);
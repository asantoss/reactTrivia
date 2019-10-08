import React, { Component } from 'react';
import { ThemeProvider } from "styled-components";
import { Form, Input, Button, StyledimgC, StyledImg, Container, Cancelbtn, Span } from './form'

class Home extends Component {
    constructor(props) {
        super(props)


    }

    render() {

        const theme = {
            font: "Arial"
        }
        return (
            <ThemeProvider theme={theme}>
                <Form action=" " method=" ">
                    <StyledimgC>
                        <StyledImg src="triviaimg.png" alt="Trivia" />
                    </StyledimgC>

                    <Container>
                        <label htmlFor="uname"><b>Username</b></label>
                        <Input type="text" placeholder="Enter Username" name="unname" required />

                        <label htmlFor="psw"><b>Password</b></label>
                        <Input type="password" placeholder="Enter Password" name="psw" required />

                        <Button type="submit">Login</Button>
                        <label>
                            <Input type="checkbox" checked="checked" name="remember" /> Remember me
                    </label>
                    </Container>
                    <Container>
                        <Cancelbtn type="button">Cancel</Cancelbtn>
                        <Span class="psw">Forgot <a href="#">password?</a> </Span>
                    </Container>
                </Form>
            </ThemeProvider>
        )
    }

}



export default Home;
import React, { useState, useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { FirebaseContext } from '../firebase';
import Scoreboard from './Scoreboard';
import Timer from './Timer';


export default function UserUI(props) {
  const [choice, setChoice] = useState('');

  const pickChoice = (e) => {

    setChoice(e)

  }

  const submitChoice = () => {
    const { currentQuestions } = props.room;
    const response = {
      question: currentQuestions.text,
      userAnswer: choice,
      correctAnwer: currentQuestions.answer,
    }
    props.submitResponse(response)
  }

  const choices = ['React', 'Vue', 'Angular', 'Svelt']

  return (

    <ThemeProvider theme={theme}>


      <DivContainer>
        <DivMain>

          <div className='question'>
            <P>WHats your fav js library/framework?</P>
          </div>

          <Timer startCount={30} />

          <div className='answers'>
            <UList>
              <div>
                {choices.slice(0, 2).map((e, i) => {

                  return <List value={e} color={i} onClick={() => pickChoice(e)}>{e}</List>
                })}
              </div>

              <div>
                {choices.slice(2, 4).map((e, i) => {
                  return <List value={e} color={i + 2} onClick={() => pickChoice(e)}>{e}</List>
                })}
              </div>
            </UList>
          </div>
          <Button onClick={submitChoice}>Submit</Button>

        </DivMain>


        <Scoreboard />


      </DivContainer>

    </ThemeProvider>
  )
}

const theme = {
  fontWeight: 600,
  color: 'white',
}

const P = styled.p`
  border: 1px solid black;
  width: 90%;
  padding: 10px;
  text-align:center;
  box-shadow: 5px 5px #888888;
  font-size: 1.3rem;
  margin: 0 auto;
  margin-bottom: 10vh;
  background: rgb(131,58,180);
  background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
  color: ${props => props.theme.color};
  font-weight: ${props => props.theme.fontWeight};
  
  
`

const DivContainer = styled.div`
          display: flex;
          flex-direction: row;
          
        `
const DivMain = styled.div`
          flex-basis: 65%;
        
        `

export const DivScoreboard = styled.div`
          flex-basis: 35%;
          background: black;
          color: white;
          height: 100vh;
          
        `

const UList = styled.ul`
  list-style: none;
  /* margin-top: 3vh; */
  display: flex;
  flex-direction:row;
  width: 60%;
  margin: 0 auto;
  margin-top: 12vh;
`

const List = styled.li`
  border: 1px white solid; 
  background: ${({ color }) => { if (color === 0) { return 'yellow' } else if (color === 1) { return 'green' } else if (color === 2) { return 'red' } else { return 'royalblue' } }};
/* padding: 2vh 5vh;  */
width: 15vw;
height: 10vh;
margin: 10px 5px;
box-shadow: 3px 3px #888888;
display: flex;
justify-content: center;
align-items: center;
font-weight: ${ props => props.theme.fontWeight};
`

const Button = styled.button`
  
    background-color: white; 
    color: black; 
    border: 2px solid #4CAF50;
    padding: 12px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    cursor: pointer;
    margin-top: 5vh;

    &:hover{
      background-color: #4CAF50;
      color: white;
    }


`


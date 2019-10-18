import React, { useState, useContext, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { FirebaseContext } from '../firebase';
import Scoreboard from './Scoreboard';
import ButtonContainer from '../containers/ButtonContainer';
import TimerContainer from '../containers/TimerContainer';

export default function UserUI({ room, users, submitResponse }) {
  const [choice, setChoice] = useState('');
  const [isDisabled, setDisabled] = useState(false);
  // const timer = 30


  const pickChoice = e => {
    setChoice(e);
  };

  const submitChoice = () => {
    const { currentQuestion } = room;
    const response = {
      question: currentQuestion.text,
      userAnswer: choice,
      correctAnwer: currentQuestion.answer
    };
    submitResponse(response);

    if (isDisabled) {
      return;
    }
    setDisabled(true)
  };

  const { choices } = room.currentQuestion
  return (
    <ThemeProvider theme={theme}>
      <DivContainer>
        <DivMain>
          <div className='question'>
            <P>{room.currentQuestion.text}</P>
          </div>

          <TimerContainer startCount={30} question={room.currentQuestion.text} />

          <div className='answers'>
            <UList>
              <div>
                {choices.slice(0, 2).map((e, i) => {
                  return (
                    <List
                      key={i}
                      value={e}
                      color={i}
                      style={{
                        // border:
                        //   choice === e ? '1px solid black' : '1px solid white',
                        transform:
                          choice === e ? "scale(1.1)" : 'none',
                        boxShadow:
                          choice === e ? "3px 3px #888888" : 'none',
                      }}
                      onClick={() => pickChoice(e)}>
                      {e}
                    </List>
                  );
                })}
              </div>

              <div>
                {choices.slice(2, 4).map((e, i) => {
                  return (
                    <List
                      key={i}
                      value={e}
                      color={i + 2}
                      style={{
                        // border:
                        //   choice === e ? '1px solid black' : '1px solid white',
                        transform:
                          choice === e ? "scale(1.1)" : 'none',
                        boxShadow:
                          choice === e ? "3px 3px #888888" : 'none',


                      }}
                      onClick={() => pickChoice(e)}>
                      {e}
                    </List>
                  );
                })}
              </div>
            </UList>
          </div>
          <ButtonContainer onClick={submitChoice} />
        </DivMain>

        <Scoreboard users={users} />
      </DivContainer>
    </ThemeProvider>
  );
}

const theme = {
  fontWeight: 600,
  color: 'white'
};

const P = styled.p`
	border: 1px solid black;
	width: 90%;
	padding: 10px;
	text-align: center;
	box-shadow: 5px 5px #888888;
	font-size: 1.3rem;
	margin: 0 auto;
	margin-bottom: 10vh;
	background: rgb(131, 58, 180);
	background: linear-gradient(
		90deg,
		rgba(131, 58, 180, 1) 0%,
		rgba(253, 29, 29, 1) 50%,
		rgba(252, 176, 69, 1) 100%
	);
	color: ${props => props.theme.color};
	font-weight: ${props => props.theme.fontWeight};
`;

const DivContainer = styled.div`
	display: flex;
	flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const DivMain = styled.div`
	flex-basis: 65%;
`;

export const DivScoreboard = styled.div`
	flex-basis: 35%;
	background: black;
	color: white;
	height: 100vh;
  
  @media (max-width: 768px) {
    flex-basis: 80%;
    margin: 0 auto;
  }

  
`;




const UList = styled.ul`
	list-style: none;
	/* margin-top: 3vh; */
	display: flex;
	flex-direction: row;
	width: 60%;
	margin: 0 auto;
	margin-top: 12vh;
 

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
	  align-items: center;
    padding: 0;
  }
`;

const List = styled.li`
	/* border: ${({ border }) =>
    border ? '1px solid black' : '1px solid white'}; */
	background: ${({ color }) => {
    if (color === 0) {
      return 'yellow';
    } else if (color === 1) {
      return 'green';
    } else if (color === 2) {
      return 'red';
    } else {
      return 'royalblue';
    }
  }};
	/* padding: 2vh 5vh;  */
	width: 15vw;
	height: 10vh;
	margin: 10px 5px;
	box-shadow: 3px 3px #888888;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: ${props => props.theme.fontWeight};
  cursor: pointer;

  @media (max-width: 768px) {
    width: 35vw;
    height: 12vh;

  }
`;






import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { FirebaseContext } from '../firebase';
import Scoreboard from './Scoreboard';
import Timer from './Timer';


export default function UserUI(props) {

  return (
    <ThemeProvider theme={theme}>


      <DivContainer>
        <DivMain>

          <div className='question'>
            <P>What's your fav JS framework/library?</P>
          </div>

          <Timer startCount={30} />

          <div className='answers'>
            <UList>
              <div>

                <List color='red'>React</List>
                <List color='RoyalBlue'>Angular</List>
              </div>

              <div>

                <List color='yellow'>Vue</List>
                <List color='green'>IDK</List>
              </div>
            </UList>
          </div>

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
  background: ${props => props.color};
  /* padding: 2vh 5vh;  */
  width: 15vw;
  height: 10vh;
  margin: 10px 5px;
  box-shadow: 3px 3px #888888;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${props => props.theme.fontWeight};
`


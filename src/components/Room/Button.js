import styled, { ThemeProvider } from 'styled-components';
import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    const { buttonDisable } = this.props.room;
    return (
      <StyledButton {...this.props} onClick={
        () => { this.props.handleClick(); this.props.onClick(); }
      } disabled={buttonDisable}>
        {!buttonDisable ? "Submit" : "Submitted"}
      </StyledButton>
    )
  }
}

const StyledButton = styled.button`
  background-color: #1F06F0; 
  opacity: .9;
  color: white; 
  /* border: 2px solid #4CAF50; */
  padding: 12px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  cursor: pointer;
  box-shadow: 3px 3px #888888;
  border-radius: 12px;

  @media (max-width: 768px) {
    margin-bottom: 5vh;
    
  }
  
  &:hover{
  background-color: ${({ disabled }) => {
    if (disabled) {
      return '#cccccc';
    } else {
      return '#4CAF50'
    }
  }};
 
    color: ${({ disabled }) => {
    if (disabled) {
      return '#666666'
    } else {
      return 'white'
    }
  }};
    border: ${({ disabled }) => {
    if (disabled) {
      return '2px solid #999999'
    } else {
      return '2px solid transparent'
    }
  }};
  }
`
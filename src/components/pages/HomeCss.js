import styled from "styled-components";



export const Container = styled.div`

height: 100%;


`;
export const ImageContainer = styled.img`


min-height: 100%;
background-position: center;
background-size: cover;
width: 100%;

`;

export const Button = styled.button`

cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  &:hover {
    background-color: palevioletred;
    color: white;
  }
`
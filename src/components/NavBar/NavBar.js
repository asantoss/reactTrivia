import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default function NavBar(props) {
	const [isOpen, setisOpen] = useState(false);
	return (
		<NavBarContainer>
			<div className='Logo_Container'>
				<img src='' alt='' />
				<span>Trivia-DOM</span>
			</div>
			<div className='NavLinks_Container'>
				<NavLink className='NavLink' to='/' activeClassName='NavLink active'>
					Home
				</NavLink>
				<NavLink
					className='NavLink'
					to='/about'
					activeClassName='NavLink active'>
					About
				</NavLink>
				<NavLink
					className='NavLink'
					to='/signIn'
					activeClassName='NavLink active'>
					Sign In
				</NavLink>
				<NavLink
					className='NavLink'
					to='/signout'
					activeClassName='NavLink active'>
					Sign Out
				</NavLink>
			</div>
		</NavBarContainer>
	);
}

const NavBarContainer = styled.div`
	display: flex;
	margin: auto;
	padding: 15px;
	height: 10vh;
	width: 80vw;
	justify-content: space-between;
	align-content: center;
	.NavLinks_Container {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 0px 15px;
		width: 50%;
		.NavLink {
			text-decoration: none;
			color: ${({ color }) => (color ? color : 'black')};
		}
	}
`;

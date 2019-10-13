import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FirebaseContext } from '../firebase';
import { connect } from 'react-redux';
import styled from 'styled-components';

function NavBar(props) {
	const [isOpen, setisOpen] = useState(true);
	const { isLoggedIn } = props.user;
	const fireBase = useContext(FirebaseContext);
	const handleLogout = async () => {
		await fireBase.doSignOut();
		props.logOut();
	};
	return (
		<NavBarContainer>
			<div className='Logo_Container'>
				<img src='' alt='' />
				<span>Trivia-DOM</span>

				<Burger isOpen={true}>
					<span>&nbsp;</span>
					<span>&nbsp;</span>
					<span>&nbsp;</span>
				</Burger>
			</div>

			<div className='NavLinks_Container'>
				<NavLink className='NavLink' to='/' activeClassName='NavLink active'>
					Home
				</NavLink>
				<NavLink
					className='NavLink'
					to='/profile'
					activeClassName='NavLink active'>
					Profile
				</NavLink>
				{isLoggedIn ? (
					<div className='NavLink' onClick={handleLogout}>
						Sign Out
					</div>
				) : (
					<NavLink
						className='NavLink'
						to='/signin'
						activeClassName='NavLink active'>
						Sign In
					</NavLink>
				)}
			</div>
		</NavBarContainer>
	);
}

const Burger = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	height: 100px;
	margin: auto;
	span {
		/* display: block; */
		width: 25px;
		border-bottom: 2px solid black;
		margin: 0;
		line-height: 0.5;
	}
	span:first-child {
		/* border-top: 2px dotted black; */
		transform: ${({ isOpen }) => isOpen && 'rotate(135deg)'};
		transform-origin: top left;
	}
	span:nth-child(2) {
		display: ${({ isOpen }) => isOpen && 'none'};
	}
	span:last-child {
		transform: ${({ isOpen }) => isOpen && 'rotate(-135deg)'};
		transform-origin: bottom left;
	}
`;

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
			&:hover {
				cursor: pointer;
			}
		}
	}
	.Logo_Container {
	}
`;

const mapToState = state => ({
	...state
});

const mapToDispatch = dispatch => payload => ({
	logOut: () => dispatch({ type: 'LOGOUT' }),
	logIn: () => dispatch({ type: 'LOGIN', payload: { ...payload } })
});

export default connect(
	mapToState,
	mapToDispatch
)(NavBar);

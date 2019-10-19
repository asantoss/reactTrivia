import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SignedInLinks from '../containers/LogoutContainer';
import SignedOutLinks from './SignedOutLinks';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { Menu, Home, Close } from '@material-ui/icons';

function Navbar(props) {
	const [state, setState] = useState(false);
	const { user } = props;
	const animatedNavProps = useSpring({
		height: window.innerWidth < 768 && state ? '45vh' : '12vh'
	});
	return (
		<NavigationElement
			style={animatedNavProps}
			isopen={window.innerWidth < 768 && state ? 1 : 0}>
			<div className='nav_logo'>
				<Link to='/'>
					<Home onClick={() => window.innerWidth < 768 && setState(!state)} />
				</Link>
				{window.innerWidth < 768 && state ? (
					<Close
						className='burger'
						onClick={() => window.innerWidth < 768 && setState(!state)}
					/>
				) : (
					<Menu
						className='burger'
						onClick={() => window.innerWidth < 768 && setState(!state)}
					/>
				)}
			</div>
			<animated.div className='nav_links' onClick={() => setState(!state)}>
				{user.isLoggedIn ? <SignedInLinks /> : <SignedOutLinks />}
			</animated.div>
		</NavigationElement>
	);
}

const mapStateToProps = state => ({
	...state
});

const NavigationElement = styled(animated.div)`
	display: flex;
	background: #f18a0b;
	height: 15vh;
	opacity: 1;
	width: 100%;
	margin: 10px auto;
	justify-content: space-between;
	border-radius: 8px;
	align-items: center;
	font-size: 20px;
	font-weight: bold;
	padding: 10px;
	div {
		display: flex;
		align-items: center;
		a {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 10px;
			color: white;
			text-decoration: none;
			:hover {
				opacity: 0.5;
			}
		}
	}
	.burger {
		display: none;
		color: white;
		font-size: 2.5rem;
		&:hover {
			cursor: pointer;
			opacity: 0.7;
		}
	}
	.nav_logo {
		svg {
			font-size: 2.5rem;
		}
	}
	@media (max-width: 768px) {
		flex-direction: column;
		justify-content: flex-start;
		padding: 10px;
		.burger {
			display: block;
		}
		.nav_logo {
			font-size: 2.5rem;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			align-self: center;
			margin: 5px;
		}
		.nav_links {
			flex-direction: column;
			width: 100%;
			display: ${({ isopen }) => (isopen ? 'flex' : 'none')};
			a {
				color: white;
				display: flex;
				padding: 10px;
				justify-content: space-between;
				width: 100%;
				margin: 2px;
				border-top: 2px solid white;
			}
		}
	}
`;

export default connect(mapStateToProps)(Navbar);

import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SignedInLinks from '../containers/LogoutContainer';
import SignedOutLinks from './SignedOutLinks';
import styled from 'styled-components';

class Navbar extends Component {
	render() {
		const { user } = this.props;

		return (
			<NavigationElement className='nav-wrapper red darken-3'>
				<div>
					<Link to='/home'>Home</Link>
				</div>
				{user.isLoggedIn ? <SignedInLinks /> : <SignedOutLinks />}
			</NavigationElement>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

const NavigationElement = styled.div`
	display: flex;
	background-color: #c62828;
	height: 10vh;
	width: 80vw;
	margin: auto;
	justify-content: space-between;
	align-items: center;
	div {
		display: flex;
		a {
			margin: 10px;
			color: white;
			text-decoration: none;
		}
	}
`;

export default connect(mapStateToProps)(Navbar);

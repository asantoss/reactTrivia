import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SignedInLinks from '../containers/LogoutContainer';
import SignedOutLinks from './SignedOutLinks';
import styled from 'styled-components';

class Navbar extends Component {
	render() {
		const { user } = this.props;

		return (
			<NavigationElement>
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
	background: #f18a0b;
	height: 12vh;
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
		a {
			margin: 10px;
			color: white;
			text-decoration: none;
			&:hover {
				opacity: 0.5;
			}
		}
	}
`;

export default connect(mapStateToProps)(Navbar);

import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import SignedInLinks from '../containers/LogoutContainer'
import SignedOutLinks from './SignedOutLinks'


class Navbar extends Component {
	constructor(props) {
		super(props)

	}

	render() {
		const { user } = this.props;

		return (
			<nav className="nav-wrapper red darken-3">
				<div className="container ">
					<Link to='/home' ></Link>
					{user.isLoggedIn ?
						<SignedInLinks />
						: null
					}
					{!user.isLoggedIn ?
						<SignedOutLinks />
						: null
					}
				</div>
			</nav>
		)


	}
}

const mapStateToProps = state => ({
	...state
});

export default connect(
	mapStateToProps,
)(Navbar);
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const Navbar = () => {
	return (
		<nav className="nav-wrapper red darken-3">
			<div className="container ">
				<Link to='/home' ></Link>
				<SignedInLinks />
				<SignedOutLinks />
			</div>
		</nav>
	)
}

export default Navbar
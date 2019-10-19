import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
	return (
		<div>
			<NavLink to='/signup'>Sign up</NavLink>
			<NavLink to='/signin'>Sign In</NavLink>
			<NavLink to='/demo'>Demo</NavLink>
		</div>
	);
};

export default SignedOutLinks;

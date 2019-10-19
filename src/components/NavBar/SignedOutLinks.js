import React from 'react';
import { NavLink } from 'react-router-dom';
import { PermIdentity, Create, HelpOutline } from '@material-ui/icons';
const SignedOutLinks = () => {
	return (
		<>
			<NavLink to='/signup'>
				<Create />
				Sign up
			</NavLink>
			<NavLink to='/signin'>
				<PermIdentity />
				Sign In
			</NavLink>
			<NavLink to='/demo'>
				<HelpOutline />
				Demo
			</NavLink>
		</>
	);
};

export default SignedOutLinks;

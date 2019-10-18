import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
	return (
		<div>
			<NavLink to='/signup'>Sign up</NavLink>
			<NavLink to='/signin'>Login</NavLink>
		</div>
	);
};

export default SignedOutLinks;

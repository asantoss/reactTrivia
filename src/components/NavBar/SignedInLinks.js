import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { withFirebase, FirebaseContext } from '../firebase';

const SignedInLinks = props => {
	//Todo: I am importing the firbase functions in order for the user to be able to logOut
	const firebase = useContext(FirebaseContext);
	const handleLogOut = async () => {
		console.log('HERE I AM!!!!!!!!!!!!!!!!');
		await firebase.doSignOut();
		console.log(props);
		props.logout();
	};

	return (
		<div>
			<Link onClick={handleLogOut}>Log Out</Link>
			<NavLink to='/'>Room</NavLink>
		</div>
	);
};

export default withFirebase(SignedInLinks);

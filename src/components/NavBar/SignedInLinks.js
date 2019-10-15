import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom'

import { withFirebase, FirebaseContext } from '../firebase';



const SignedInLinks = (props) => {

    //Todo: I am importing the firbase functions in order for the user to be able to logOut 
    const firebase = useContext(FirebaseContext);
    const handleLogOut = async () => {
        console.log("HERE I AM!!!!!!!!!!!!!!!!")
        await firebase.doSignOut();
        console.log(props);
        props.logout();
    };

    return (
        <ul className="right">
            <li><a onClick={handleLogOut}>Log Out</a></li>
            <li><NavLink to="/">Room</NavLink></li>
            <li><NavLink to="/" className="btn btn-floating blue lighten-1">JH</NavLink></li>

        </ul>
    )
}




export default withFirebase(SignedInLinks);
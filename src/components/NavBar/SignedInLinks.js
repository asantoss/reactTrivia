import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { doSignOut } from '../firebase/Firebase';
import { withFirebase, FirebaseContext } from '../firebase';
import { async } from 'q';

const SignedInLinks = (props) => {
    const Firebase = useContext(FirebaseContext);
    const handleLogOut = async () => {
        await firebase.doSignOut();
        props.logout()
    }

    return (
        <ul className="right">
            <li><a onClick={handleLogOut} />Log Out</li>
            <li><NavLink to="/">Room</NavLink></li>
            <li><NavLink to="/" className="btn btn-floating blue lighten-1">JH</NavLink></li>

        </ul>
    )
}




export default withFirebase(SignedInLinks);
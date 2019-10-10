import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'

const SignedInLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to="/">Log Out</NavLink></li>
            <li><NavLink to="/">Room</NavLink></li>
            <li><NavLink to="/" className="btn btn-floating blue lighten-1">JH</NavLink></li>

        </ul>
    )
}

export default SignedInLinks
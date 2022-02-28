import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <>
            <nav>
                <div className="logo"><NavLink to="/">Game<strong>Hub</strong></NavLink></div>
                <ul>
                    <li><NavLink className="active" to = "/">Home</NavLink></li>
                    <li><NavLink to = "/login">Sign in</NavLink></li>
                    <li><NavLink to = "/profile">Profile</NavLink></li>
                    <li><NavLink to = "/about">About</NavLink></li>
                    <li><NavLink to = "/logout">Logout</NavLink></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
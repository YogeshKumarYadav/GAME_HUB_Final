import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../App';
import './Navbar.css';

const Navbar = () => {
    const {state, dispatch} = useContext(UserContext);
    const NavbarMenu = () => {
        if(state) {
           return(
                <>
                    <li><NavLink className="active" to = "/">Home</NavLink></li>
                    <li><NavLink to = "/profile">Profile</NavLink></li>
                    <li><NavLink to = "/about">About</NavLink></li>
                    <li><NavLink to = "/logout">Logout</NavLink></li>
                </>
           ) 
        }
        else {
            return(
                <>
                    <li><NavLink className="active" to = "/">Home</NavLink></li>
                    <li><NavLink to = "/login">Sign in</NavLink></li>
                    <li><NavLink to = "/profile">Profile</NavLink></li>
                    <li><NavLink to = "/about">About</NavLink></li>
                </>
           ) 
        }
    }
    return (
        <>
            <nav>
                <div className="logo"><NavLink to="/">Game<strong>Hub</strong></NavLink></div>
                <ul>
                    <NavbarMenu/>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
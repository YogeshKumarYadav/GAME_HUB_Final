import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../App';
import { ImHome } from 'react-icons/im';
import { FaUser } from 'react-icons/fa';
import { RiLoginBoxFill } from 'react-icons/ri';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { TiInfo } from 'react-icons/ti';
import './Navbar.css';

const Navbar = () => {
    const {state, dispatch} = useContext(UserContext);
    const NavbarMenu = () => {
        if(state) {
           return(
                <>
                    <li>
                        <NavLink to = "/"><ImHome size={30}/><h6>Home</h6></NavLink>
                    </li>
                    <li>
                        <NavLink to = "/profile"><FaUser size={30}/><h6>Profile</h6></NavLink>
                    </li>
                    <li>
                        <NavLink to = "/about"><TiInfo size={30}/><h6>About</h6></NavLink>
                        </li>
                    <li>
                        <NavLink to = "/logout"><RiLogoutBoxFill size={30}/><h6>Logout</h6></NavLink>
                    </li>
                </>
           ) 
        }
        else {
            return(
                <>
                    <li><NavLink to = "/"><ImHome size={30}/><h6>Home</h6></NavLink></li>
                    <li><NavLink to = "/login"><RiLoginBoxFill size={30}/><h6>Login</h6></NavLink></li>
                    <li><NavLink to = "/about"><TiInfo size={30}/><h6>About</h6></NavLink></li>
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
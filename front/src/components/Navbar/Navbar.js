import React from 'react'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className="navbardiv">
            <div className="logodiv">
                {"GAME HUB"}
            </div>
            <div className="buttdiv">
                <button className="navbutton">Home</button>
                <button className="navbutton">Sign-in/up</button>
                <button className="navbutton">Profile</button>
                <button className="navbutton">Logout</button>
            </div>
        </div>
    )
}

export default Navbar
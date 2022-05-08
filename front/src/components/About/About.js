import React from 'react';
import './About.css';

const About = () => {
    
    return (
        <>
            <div className='aboutDiv'>
                <div className="aboutHomelogo">Game<strong>Hub</strong></div>
                <p className='aboutTagline'><strong>The Online Fun & Gaming Site.</strong></p>
                <p className='DevsIntro'>This Website is Created and Managed By...</p>
                <p className='Devs'><strong>Harshit Bhatt</strong></p>
                <p className='Devs'><strong>Manav Shishodia</strong></p>
                <p className='Devs'><strong>Milind Pateriya</strong></p>
                <p className='Devs'><strong>Yogesh Kumar Yadav</strong></p>                               
                <p className='ContactUs'>Want to host Games with Us? <a href='mailto:gamehub@gmail.com'>Contact Us.</a></p>
            </div>
    
        </>
    )
}

export default About

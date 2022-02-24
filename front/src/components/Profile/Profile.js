import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {

    const navigate = useNavigate();

    const profilepage = async () => {
        try {
            const res = await fetch('/user/profile', {
                method: 'GET',
                headers: {
                    Accept: "appllication/json",
                    "Content-Type": "application/json" 
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);

            if(!res.status === 200) {
                throw new Error(res.error);
            }

        } catch (err) {
            console.log(err);
            navigate('/login'); 
        }
    }

    useEffect(() => {
        profilepage();
    }, );

    return (
        <>
            <div>
                <p>Profile Page</p>
            </div>
        </>
    )
}

export default Profile

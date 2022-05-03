import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Avatars from '../Avatar/Images.js';
import './Profile.css';

const Profile = () => {

    const navigate = useNavigate();
    const [profile, setprofile] = useState({});
    const [score, setscore] = useState({});
      
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
            
            setprofile(data.profile);
            setscore(data.score);
            
            
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
    },[]);

    return (
        <>
            <div className="page-content page-container" id="page-content">
                <div className="padding">
                    <div className="row container d-flex justify-content-center">
                        <div className="col-xl-6 col-md-12">
                            <div className="card user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    <div className="col-sm-4 bg-c-lite-green user-profile">
                                        <div className="card-block text-center text-white">
                                            <div className="m-b-25"> 
                                            {
                                                Avatars.map((img, i) => (
                                                    i === profile.avatar ?
                                                    <img className='avat' 
                                                        src={img} alt='pic' key={i} 
                                                    />:
                                                    <div></div>
                                                ))
                                            }   
                                            </div>
                                            <h6 className="f-w-600">{profile.name}</h6>
                                            <p>@{profile.userid}</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="card-block">
                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Gender</p>
                                                    <h6 className="text-muted f-w-400">{profile.gender}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Age</p>
                                                    <h6 className="text-muted f-w-400">{profile.age}</h6>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Email</p>
                                                    <h6 className="text-muted f-w-400">{profile.email}</h6>
                                                </div>
                                            </div>
                                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Game Scores</h6>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Total Score</p>
                                                    <h6 className="text-muted f-w-400">{score.total}</h6>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col-sm-12">
                                                    <p className="m-b-10 f-w-600">Individual scores</p>
                                                    <h6 className="text-muted f-w-400">{score.gamescore}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile

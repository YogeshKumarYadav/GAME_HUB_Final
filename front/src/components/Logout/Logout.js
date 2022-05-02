import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const Logout = () => {
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('/user/logout', {
            method: 'GET',
            headers: {
                Accept: "appllication/json",
                "Content-Type": "application/json" 
            },
            credentials: "include"
        }).then((res) => {
            dispatch({type:"USER", payload:false});
            if(res.status === 200)
                navigate('/login');
            else {
                const err = new Error(res.error);
                throw err;
            }    
        }).catch((err) => {
            console.log(err);
        })
    })    

  return (
    <div>Logout</div>
  )
}

export default Logout
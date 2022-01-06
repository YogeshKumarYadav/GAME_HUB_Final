import React from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {

    const navigate = useNavigate();

    const [user, setuser] = useState({
        userid: "",
        password: ""
    })

    let name, value;

    const handlechange = (val) => {
        name = val.target.name;
        value = val.target.value;

        setuser({...user, [name]:value});
    }

    const gotologin = async (val) => {
        
        const logindetail = {
            userid: user.userid,
            password: user.password
        } 

        const data = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logindetail)
        });

        console.log(data);
        if(data.status === 200) {
            console.log("Success");
            navigate('/');
        }
        else if(data.status === 400) {
            console.log("All fields required");
            window.alert("All fields required");
            navigate('/login');
        }
        else if(data.status === 422) {
            console.log("Username not found");
            window.alert("Username not found");
            setuser({
                userid:"",
                password: ""
            })
            navigate('/login');
        }   
        else if(data.status === 401) {
            console.log("Wrong password");
            window.alert("Wrong password");
            navigate('/login');
        }
        
    }

    return (
        <>
            <div className='maindiv'>
                <h1 className='register'>Login</h1>
                <div>
                    <div>
                        <input type='text' name='userid' placeholder='UserID' autoComplete='off'
                            value={user.userid}
                            onChange={handlechange}
                        />
                    </div>
                    <div>
                        <input type='password' name='password' placeholder='Password' autoComplete='off' 
                            value={user.password}
                            onChange={handlechange}
                        />
                    </div>
                    <div>
                        <input type='submit' 
                            value='Login'
                            onClick={gotologin}
                        />
                    </div>
                </div>
                <div className='userfooter'>
                    <p>New User </p>
                    <strong><NavLink to="/register">Sign Up</NavLink></strong>
                </div>
            </div>
        </>
    )
}

export default Login

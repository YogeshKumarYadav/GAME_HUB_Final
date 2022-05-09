import React, { useContext } from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';
import { UserContext } from '../../App';

const Login = () => {
    const {state, dispatch} = useContext(UserContext);
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
            dispatch({type:"USER", payload:true});
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
                <div className='loginBox'>
                    {/* <image className="user" src="https://i.ibb.co/yVGxFPR/2.png" height="100px" width="100px"/> */}
                    <h3>Login here</h3>

                    <div className="inputBox"> 
                        <input id="uname" type="text" name="userid" placeholder="UserID"
                        value={user.userid}
                        onChange={handlechange}/> 

                        <input id="pass" type="password" name="password" placeholder="Password"
                        value={user.password}
                        onChange={handlechange}/> 
                    </div> 
                    <input type="submit" name=""
                    value='Login'
                    onClick={gotologin}/>
                    <div className="text-center">
                        <strong><NavLink to="/register">Sign Up</NavLink></strong>
                    </div>
                </div>        
        </>
    )
}

export default Login
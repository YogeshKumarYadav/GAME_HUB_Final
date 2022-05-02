import React, {useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { useState } from 'react';
import './Register.css';
import Avatars from '../Avatar/Images.js';
import { UserContext } from '../../App';

const Register = () => {
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    const [ava, setava] = useState(0);

    const [user, setUser] = useState({
        name:"",
        userid:"",
        password:"",
        email:"",
        gender:"",
        age:"",
        avatar:""
    });

    let name, value;
    const changeval = (val) => {
        console.log(val);
        name = val.target.name;
        value = val.target.value;

        setUser({...user, [name]:value})
    }

    const saveuser = async (val) => {
        
        val.preventDefault();
        const newdata = {
            name: user.name,
            userid: user.userid,
            password: user.password,
            email: user.email,
            gender: user.gender,
            age: user.age,
            avatar: ava
        }

        const data = await fetch('/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newdata)
        });

        // const data = await res.json();
        console.log(data);
        if(data.status === 201) {
            dispatch({type:"USER", payload:true});
            console.log("Success");
            navigate('/');
        }
        else if(data.status === 409) {
            console.log("Username already registered");
            window.alert("Username already registered");
            setUser({
                name: user.name,
                userid:"",
                password: user.password,
                email: user.email,
                gender: user.gender,
                age: user.age,
                avatar: user.avatar
            })
            navigate('/register');
        }   
        else if(data.status === 422) {
            console.log("All fields required");
            window.alert("All fields required");
            navigate('/register');
        }
    }

    return (
        <>
            <div className="registerbox row">
                <div className='col-sm-6'>
                    <h3>Register here</h3>
                        <div className="inputBox"> 
                            <input type='text' name='name' placeholder='Name' autoComplete='off' 
                                value={user.name}
                                onChange={changeval}
                            />
                            <input type='text' name='userid' placeholder='UserID' autoComplete='off'
                                value={user.userid}
                                onChange={changeval}
                            />
                            <input type='password' name='password' placeholder='Password' autoComplete='off'
                                value={user.password}
                                onChange={changeval}
                            />
                            <input type='email' name='email' placeholder='Email' autoComplete='off'
                                value={user.email}
                                onChange={changeval}
                            />
                            <div>
                                <div className='radioinput'>
                                    <label>Male</label>
                                    <input type='radio' name='gender' value="Male"
                                        onChange={changeval}
                                    />
                                </div>
                                <div className='radioinput'>
                                <label> Female</label>
                                    <input type="radio" name="gender" value="Female"
                                        onChange={changeval}
                                    />
                                </div>
                                <div className='radioinput'>
                                <label> Other</label>
                                    <input type="radio" name="gender" value="Other"
                                        onChange={changeval}
                                    />
                                </div>
                            </div>
                        <input type='number' name='age' placeholder='Age' autoComplete='off'
                                value={user.age}
                                onChange={changeval}
                            />
                        </div>
                        <input type='submit' 
                                value='Register'
                                onClick={saveuser}
                        />
                
                    <div className="text-center">
                    <strong><NavLink to="/login">Sign In</NavLink></strong>
                    </div>
                </div>
                <div className='avatardiv'>
                        {
                            Avatars.map((img, i) => (
                                <img className='avat' 
                                    style={{border: ava === i ? "4px solid darkviolet" : "0", borderRadius: '10px'}}
                                    src={img} alt='pic' key={i} 
                                    onClick={() => setava(i)}/>
                            ))
                        }                    
                </div>
            </div>
        </>
    )
}

export default Register
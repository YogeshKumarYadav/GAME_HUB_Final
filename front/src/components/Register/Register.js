import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { useState } from 'react';
import './Register.css';

const Register = () => {

    const navigate = useNavigate();


    const [user, setUser] = useState({
        name:"",
        userid:"",
        password:"",
        email:"",
        gender:"",
        age:""
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
            age: user.age
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
                age: user.age
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
            <div className='maindiv'>
                <h1 className='register'>Register</h1>
                <div>
                    <div>
                        <input type='text' name='name' placeholder='Name' autoComplete='off' 
                            value={user.name}
                            onChange={changeval}
                        />
                    </div>
                    <div>
                        <input type='text' name='userid' placeholder='UserID' autoComplete='off'
                            value={user.userid}
                            onChange={changeval}
                        />
                    </div>
                    <div>
                        <input type='password' name='password' placeholder='Password' autoComplete='off'
                            value={user.password}
                            onChange={changeval}
                        />
                    </div>
                    <div>
                        <input type='email' name='email' placeholder='Email' autoComplete='off'
                            value={user.email}
                            onChange={changeval}
                        />
                    </div>
                    <div>
                        <label>Male</label>
                        <input type='radio' name='gender' value="Male"
                            onChange={changeval}
                        />
                        <label> Female</label>
                        <input type="radio" name="gender" value="Female"
                            onChange={changeval}
                        />
                        <label> GAY</label>
                        <input type="radio" name="gender" value="Other"
                            onChange={changeval}
                        />
                    </div>
                    <div>
                        <input type='number' name='age' placeholder='Age' autoComplete='off'
                            value={user.age}
                            onChange={changeval}
                        />
                    </div>
                    <div>
                        <input type='submit' 
                            value='register'
                            onClick={saveuser}
                        />
                    </div>
                </div>

                <div className='userfooter'>
                    <p>Already Registered </p>
                    <strong><NavLink to="/login">Sign In</NavLink></strong>
                </div>
            </div>
        </>
    )
}

export default Register
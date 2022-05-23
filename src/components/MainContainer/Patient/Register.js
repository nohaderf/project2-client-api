import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios';

function Register({ handleLogin }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [dob, setDob] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate();


    function handleSubmit(e){
        e.preventDefault();
        const formData = {
            "username": username,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "dob": dob,
            "phoneNum": phone
        }

        axios({
            method: 'post',
            url: 'patient/register',
            data: formData,
            headers: {"Content-Type": "application/json"}
         })
           .then(function (response) {
             console.log(response);
             navigate('/signin');
           })
           .catch(function (response) {
             console.log(response);
           });
    }

    return (
        <div className="login-div">
            <div className="register-form-div">
              <h1 className="new-patient">New Patient</h1> 
              <div className="form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <input 
                        className="form-input"
                        type="text"
                        name="firstName"
                        placeholder="first name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                    />
                    <input 
                        type="text"
                        name="lastName"
                        placeholder="last name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                    />
                    <input 
                        type="text"
                        name="username"
                        placeholder="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <input 
                        type="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <input 
                        type="password"
                        name="confirmPassword"
                        placeholder="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                    <input 
                        type="text"
                        name="phone"
                        placeholder="date of birth (MM-DD-YYYY)"
                        value={dob}
                        onChange={e => setDob(e.target.value)}
                        required
                    />
                    <input 
                        type="text"
                        name="phone"
                        placeholder="phone number (xxx) xxx-xxxx"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                    />

                  <p><button className="sign-in-btn" type="submit">Submit</button></p> 
                </form>
                <p className="small-font">Already have an account? <NavLink exact to="/signin"><span className="text-link">Login here</span></NavLink>.</p>
                </div>
            </div>
        </div>
    )
}

export default Register
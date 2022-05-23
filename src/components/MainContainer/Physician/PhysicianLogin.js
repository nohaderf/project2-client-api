import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Patient/SignIn.css';
import axios from 'axios';


function PhysicianLogin({ handlePhysicianLogin, setUserData, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username: username,
      password: password
    }

    axios.post(`doctor/login`, formData)
      .then(res => {
        console.log(res);
        console.log(res.data)
        setUserData(res.data)
        setToken(res.headers.token)
        console.log(res.headers.token)
        localStorage.setItem('token', res.data.token);  
        handlePhysicianLogin();
        navigate('/provider-profile');
      })
      .catch(err => {
        console.log(err);
        setInvalid(true);
      })
  }

  return (
    <div className="login-div">
      <div className="sign-up-form-div">
          <h1>Physician Login</h1>
          <form className="sign-up-form" onSubmit={handleSubmit}>
            <span>
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
            </span>
            { invalid ?
              <span className="err-msg">Username or Password is incorrect.</span> 
            : null }
            <br/>
            <button className="sign-in-btn" type="submit">Sign In</button>

          </form>
         
      </div>
    </div>  
  )
}

export default PhysicianLogin;
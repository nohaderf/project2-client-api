import React from 'react';
import './Profile.css'

function PhysicianProfile({ userData, token }) {

  return (
    <div className="div-container">
      <h1>Welcome back, Dr. {userData.lastName}.</h1>
      <div className="profile-div">
        <p>First Name: {userData.firstName}</p>
        <p>Last Name: {userData.lastName}</p>
        <p>Specialty: {userData.specialization}</p>
        <p>Contact: {userData.phoneNum}</p>
        <p>Session token: <span className="token-span">{token}</span></p> 
      </div>
    </div>
  )
}

export default PhysicianProfile
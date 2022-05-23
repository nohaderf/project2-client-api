import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import About from './Patient/About';
import Appointments from './Appointment/Appointments';
import NewAppointment from './Appointment/NewAppointment';
import AppSubmitted from './Appointment/AppointmentSubmitted';
import Physicians from './Patient/Physicians';
import PhysiciansNetwork from './Physician/PhysiciansNetwork';
import Chat from './Patient/Chat';
import SignIn from './Patient/SignIn';
import Register from './Patient/Register';
import PhysicianLogin from './Physician/PhysicianLogin';
import PhysicianProfile from './Physician/PhysicianProfile';
import PatientProfile from './Patient/PatientProfile';
import EditProfile from './Patient/EditProfile';
import PhysicianChat from './Physician/PhysicianChat';
import PhysicianAppointments from './Physician/PhysicianAppointments';
import Patients from './Physician/Patients';
// import SearchDiseases from './Patient/SearchDiseases';

function Main({ handleLogin, handlePhysicianLogin, userData, setUserData, token, setToken }) {
  const [currProfile, setCurrProfile] = useState(userData);
  return (
    <div className="main-container">
        <Routes>
            <Route exact path="*" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/appointments" element={<Appointments userData={userData} token={token} />} />
            <Route exact path="/new-appointment" element={<NewAppointment />} />
            <Route exact path="/chat" element={<Chat userData={userData} token={token}/>} />
            <Route exact path="/physicians-list" element={<Physicians />} />
            {/* <Route exact path="/search-medical-conditions" element={<SearchDiseases />} /> */}
            <Route exact path="/signin" element={<SignIn handleLogin={handleLogin} setUserData={setUserData} setToken={setToken} />} />
            <Route exact path="/patient-profile" element={<PatientProfile userData={userData} profile={currProfile} token={token} />} />
            <Route exact path="/edit-profile" element={<EditProfile userData={userData} handleEditedProfile={setCurrProfile} token={token} />} />
            <Route exact path="/register" element={<Register handleLogin={handleLogin}/>} />

            <Route exact path="/provider-login" element={<PhysicianLogin userData={userData} setUserData={setUserData} token={token} setToken={setToken} handlePhysicianLogin={handlePhysicianLogin} />} />
            <Route exact path="/provider-profile" element={<PhysicianProfile userData={userData} token={token} />} />
            <Route exact path="/physicians-network" element={<PhysiciansNetwork token={token} />} />
            <Route exact path="/patients" element={<Patients userData={userData} token={token} />} />
            <Route exact path="/provider-chat" element={<PhysicianChat userData={userData} token={token} />} />
            <Route exact path="/provider-appointments" element={<PhysicianAppointments userData={userData} token={token}/>} />
            <Route exact path="/appointment-scheduled" element={<AppSubmitted userData={userData} token={token}/>} />
            
        </Routes>
    </div>
  )
}

export default Main
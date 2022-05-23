import React, { useState, useEffect } from 'react';
import NewAppointment from '../Appointment/NewAppointment';
import DrAppointmentInfo from './DrAppointmentInfo';
import '../Appointment/Appointments.css';
import './PhysicianAppointments.css';
import axios from 'axios';
import Search from '../../Search/SearchPatient';


function PhysicianAppointments({ userData, token }) {
  const [showNewForm, setShowNewForm] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");

  const id = userData.id

  useEffect(() => {
    axios.get(`http://localhost:8080/appointment/doctor/${id}`, {headers: {"Authorization": `Bearer ${token}`} })
    .then(res => {
      setAppointments(res.data)
    })
  }, [id, token])

  const filterAppointments = appointments.filter(appointment => {
    return appointment.patient.lastName.toLowerCase().includes(search.toLowerCase());
  })

  const handleShowNewForm = () => {
    setShowNewForm(!showNewForm);
  }

  const handleDeleted = (id) => {
    setAppointments(appointments.filter(appointment => {
      return appointment.id !== id
    }))
  }

  const appointmentInfo = filterAppointments.map(appointment => {
      return <DrAppointmentInfo key={appointment.id} appointment={appointment} handleDeleted={handleDeleted} token={token} />
  })

    return (
        <div className="div-container">
          <h1>Virtual Care Visits</h1>
          <div className="upper-cont">
            <button className="new-app-btn" onClick={handleShowNewForm}>New Appointment</button>
            <span className="search-span"><Search search={search} onSearchChange={setSearch}/></span>
          </div>
         
          
          <div>
            { showNewForm ? <NewAppointment token={token} /> : null }
          </div>
          <br/>
 
          <div className="appointments-div">
                <table className="appointments-table">
                    <tbody>
                        <tr>
                            <th className="appointments-header">Date</th>
                            <th className="appointments-header">Time</th>
                            <th className="appointments-header">Patient</th>    
                            <th className="appointments-header">Visit Status</th>    
                            <th className="appointments-header">Note</th>    
                            <th className="appointments-header">Action</th>
                        </tr>
                        {appointmentInfo}
                    </tbody>
                </table>
            </div>
        </div>
      )
}

export default PhysicianAppointments;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientInfo from './PatientInfo';
import './Patients.css';
import Search from '../../Search/SearchPatient';

function Patients({ userData, token }) {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    axios.get(`http://localhost:8080/doctor/getAllPatients`, {headers: {"Authorization": `Bearer ${token}`} })
    .then(res => {
      setPatients(res.data)
    })
  }, [token])

  const filterPatients = patients.filter(patient => {
    return patient.lastName.toLowerCase().includes(search.toLowerCase());
  })

  const patientInfo = filterPatients.map(patient => {
    return <PatientInfo key={patient.id} patient={patient} />
  })


  return (
    <div className="div-container">
          <h1>Patient Registry</h1>
          <div>
            <Search search={search} onSearchChange={setSearch}/>
          </div>
          <div className="patients-div">
                <table className="patients-table">
                    <tbody>
                        <tr>
                            <th className="patients-header">Patient ID</th>
                            <th className="patients-header">Username</th>
                            <th className="patients-header">First Name</th>
                            <th className="patients-header">Last Name</th>
                            <th className="patients-header">DOB</th>    
                            <th className="patients-header">Phone Number</th>
                        </tr>
                        {patientInfo}
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default Patients
import React from 'react'

function PatientInfo({ patient }) {
  return (
    <tr className="patient-info">
        <td>{patient.id}</td>
        <td>{patient.username}</td>
        <td>{patient.firstName}</td>
        <td>{patient.lastName}</td>
        <td>{patient.dob}</td>
        <td>{patient.phoneNum}</td>
    </tr>

  )
}

export default PatientInfo
import React from 'react'

function PhysicianInfo({ physician }) {
  return (
    <tr className="patient-info">
        <td>{physician.id}</td>
        <td>{physician.firstName}</td>
        <td>{physician.lastName}</td>
        <td>{physician.specialization}</td>
        <td>{physician.phoneNum}</td>
    </tr>
  )
}

export default PhysicianInfo
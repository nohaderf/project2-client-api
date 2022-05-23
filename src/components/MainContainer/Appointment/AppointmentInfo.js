import React from 'react';
import axios from 'axios';

function AppointmentInfo({ appointment, handleDeleted }) {
  const id = appointment.id;

  const onDelete = () => {
      axios.delete(`http://localhost:8080/appointment/request/${id}`)
      .then(handleDeleted(id));
  }

  return (
    <tr className="appointment-info">
        <td>{appointment.date}</td>
        <td>{appointment.time}</td>
        <td>Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}</td>
        <td>{appointment.status}</td>
        <td>
            <button className="edit-btn" onClick={onDelete}><i className="fa-solid fa-trash-can"></i></button>
        </td>
    </tr>
  )
}

export default AppointmentInfo
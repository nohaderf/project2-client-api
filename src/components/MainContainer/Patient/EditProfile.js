import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { id } from 'date-fns/locale';

function EditProfile({ userData, handleEditedProfile, token }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [dob, setDob] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // axios.put(`appointment/${id}/note`, newNote, {headers: {"Authorization": `Bearer ${token}`}})

        // handleNewNote(newNote);

        const formData = {
            "id": id,
            "username": username,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "dob": dob,
            "phoneNum": phone
        }

        axios.put('patient/update', formData, {headers: {"Authorization": `Bearer ${token}`}})
           .then(function (response) {
             console.log(response);
             handleEditedProfile(formData)
             navigate('/patient-profile');
           })
           .catch(function (response) {
             console.log(response);
           });

        // axios({
        //     method: 'post',
        //     url: 'patient/update',
        //     data: formData,
        //     headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
        //  })
        //    .then(function (response) {
        //      console.log(response);
        //      navigate('/patient-profile');
        //    })
        //    .catch(function (response) {
        //      console.log(response);
        //    });
    }

  return (
    <div className="login-div">
            <div className="register-form-div">
              <h1 className="new-patient">Edit Profile</h1> 
              <div className="form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <input 
                        className="form-input"
                        type="text"
                        name="id"
                        value={userData.id}
                        readOnly
                    />
                    <input 
                        className="form-input"
                        type="text"
                        name="firstName"
                        placeholder={userData.firstName}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                    />
                    <input 
                        type="text"
                        name="lastName"
                        placeholder={userData.lastName}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                    />
                    <input 
                        type="text"
                        name="username"
                        placeholder={userData.username}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <input 
                        type="password"
                        name="password"
                        placeholder="Enter a new or current password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <input 
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                    <input 
                        type="text"
                        name="phone"
                        placeholder={userData.dob}
                        value={dob}
                        onChange={e => setDob(e.target.value)}
                        required
                    />
                    <input 
                        type="text"
                        name="phone"
                        placeholder={userData.phoneNum}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                    />

                  <p><button className="sign-in-btn" type="submit">Save</button></p> 
                </form>
                </div>
            </div>
        </div>
  )
}

export default EditProfile
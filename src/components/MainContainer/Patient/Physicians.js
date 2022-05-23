import React, { useState, useEffect } from 'react';
import Search from '../../Search/SearchSpecialty';
import PhysicianInfo from './PhysicianInfo';
import '../../Search/Search.css';

function Physicians() {
    const [physicians, setPhysicians] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/doctor/getAllDoctors`)
        .then(r => r.json())
        .then(physicians => {
            setPhysicians(physicians);
        })
    }, [])

    const filterPhysicians = physicians.filter(physician => {
        return physician.specialization.toLowerCase().includes(search.toLowerCase())
    });


    const physicianInfo = filterPhysicians.map(physician => {
        return <PhysicianInfo key={physician.id} physician={physician} />
    })

  return (
    <div className="div-container">
        <h1>Physician Registry</h1>
        <div className="search-div">
            <Search search={search} onSearchChange={setSearch}/>
        </div>
        <div className="patients-div">
            <table className="patients-table">
                <tbody>
                    <tr>
                        <th className="patients-header">Physician ID</th>
                        <th className="patients-header">First Name</th>
                        <th className="patients-header">Last Name</th>
                        <th className="patients-header">Specialty</th>    
                    </tr>
                    {physicianInfo}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Physicians;
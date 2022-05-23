import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewAppointment.css';
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import { DayPicker } from 'react-day-picker'; 
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

function NewAppointment({ token }) {
    const [drId, setDrId] = useState();
    const [ptId, setPtId] = useState();
    const [time, setTime] = useState("");
    const [selected, setSelected] = useState();
    const [seeCalendar, setSeeCalendar] = useState(false);

    const navigate = useNavigate();

    let day = "";
    let footer = <p>Please pick a day.</p>;
    if (selected) {
      footer = <p>You picked {format(selected, 'PPP')}.</p>;
      day = format(selected, 'PPP');
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            "doctorId": parseInt(drId),
            "patientId": parseInt(ptId),
            "date": day,
            "time": time
        }

        axios({
           method: 'post',
           url: 'appointment/request',
           data: formData,
           headers: {"Authorization": `Bearer ${token}` }
        })
          .then(function (response) {
            console.log(response);

          })
          .catch(function (response) {
            console.log(response);
          });

          navigate('/appointment-scheduled');
    }
    

    const handleCalendar = () => {
        setSeeCalendar(!seeCalendar);
    }
    const closeCalendar = () => {
        setSeeCalendar(false);
    }

  return (
    <div>
        <div className="new-app-form">
            <form onSubmit={handleSubmit}>
                <span className="new-app-span">
                    <label>Patient:</label>
                    <span className="input-span">
                        <input 
                            className="new-app-input"
                            placeholder="ID"
                            type="text"
                            name="id"
                            value={ptId}
                            onChange={e =>  setPtId(e.target.value)}
                            required
                        />
                    </span>
                <span className="new-app-span">
                    <label>Physician:</label>
                    <span className="input-span">
                        <input 
                            className="new-app-input"
                            placeholder="ID"
                            type="text"
                            name="id"
                            value={drId}
                            onChange={e =>  setDrId(e.target.value)}
                            required
                        />
                    </span>
                </span>
                <span className="new-app-span">
                    <label>Date:</label>
                    <span className="input-span">
                        <div class="input-wrapper">
                            <input 
                                type="text" 
                                className="new-app-input"
                                name="name"
                                placeholder="MM-DD-YYYY"
                                value={day}
                                onChange={day}
                                onClick={handleCalendar}
                                required
                            />
                            
                            { seeCalendar ? 
                                <div className="calendar" >
                                    <span className="calendar-close-btn" onClick={closeCalendar}>&times;</span>
                                    <DayPicker
                                        mode="single"
                                        required
                                        selected={selected}
                                        onSelect={setSelected}
                                        footer={footer}
                                    /> 
                                </div>
                            : null
                            }
                        </div>
                    </span>
                </span>
            
                <span className="new-app-span">
                    <label>Time:</label>
                    <TimePicker
                        placeholder="Select Time"
                        use12Hours
                        showSecond={false}
                        focusOnOpen={true}
                        format="hh:mm A"
                        onChange={e => setTime(e.format('LT'))}
                    />
                </span>
                </span>
                <button className="new-app-submit-btn" onClick={handleSubmit} type="submit">Submit</button>
            </form>
          </div>
    </div>
  )
}

export default NewAppointment;
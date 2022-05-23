import React, { useState } from 'react';
import axios from 'axios';

function Chat({ userData }) {
  const [phoneNum, setPhoneNum] = useState("9178253973")

  const handleCall = () => {
    axios({
      method: 'post',
      url: '/calls',
      data: phoneNum,
   })
     .then(function (response) {
       console.log(response);
     })
     .catch(function (response) {
       console.log(response);
     });
  }

  return (
    <div className="div-container">
      <div className="chat-container">
        <h1>Call Now</h1>
        <p>Start talking with a trusted physician now.</p> 
        <button onClick={handleCall}>Call</button>
      </div>
    </div>
  )
}

export default Chat
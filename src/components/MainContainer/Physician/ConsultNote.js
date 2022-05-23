import React, { useState } from 'react';
import './ConsultNote.css';
import axios from 'axios';

function ConsultNote({ id, note, handleNewNote, closeModal, token }) {
  const [newNote, setNewNote] = useState();

  const handleSubmit = (e) => {
      e.preventDefault();

      axios.put(`appointment/${id}/note`, newNote, {headers: {"Authorization": `Bearer ${token}`}})

      handleNewNote(newNote);
  } 

  return (
    <div>
        <span className="note-close-btn" onClick={closeModal}>&times;</span>
        <h1>Consultation Note</h1>

          { note ?
            <div>
            <p className="note-p">{note}</p>
            <form onSubmit={handleSubmit}>
                  <textarea 
                    className="consult-textarea" 
                    placeholder={newNote}
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)} 
                  ></textarea>
                  <br/>
                  <button className="consult-save-btn" type="submit">Save</button>
              </form>
              </div>
            : 
            <div>
               <p className="note-p">Please submit your consultation note.</p>
               <form onSubmit={handleSubmit}>
                  <textarea 
                    className="consult-textarea" 
                    placeholder="Type your consult note here."
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)} 
                  ></textarea>
                  <br/>
                  <button className="consult-save-btn" type="submit">Submit</button>
                </form>
            </div>
          }
       
    </div>
  )
}

export default ConsultNote;
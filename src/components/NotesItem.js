import React, { useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";

const NotesItem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;

    // const {note} = props;
    const {note, updateNote } = props;

  return (
    <div className="col-md-3">
        <div className="card my-2">
            <div className="card-body">
                <h5 className="card-title"> {note.title} </h5>
                <p className="card-description"> {note.description}  </p>
                <div className="d-flex align-items-left">
                
                <i className="far fa-edit mx-2" onClick={()=> {updateNote(note)}} ></i>
                <i className="far fa-trash-alt mx-2" onClick={()=> {deleteNote(note._id)}} ></i>
                </div>
            </div>
        </div>     
    </div>
  )
}

export default NotesItem;

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
                <div className="d-flex align-items-right flex-column mb-3">
                  <div className="d-flex align-items-end flex-row-reverse">
                  <div className="mt-auto p-2"><small className="card-footer text-muted"> {note.tag} </small></div>
                    <div className="p-2">
                    <i className="far fa-edit mx-1" onClick={()=> {updateNote(note)}} ></i>
                    </div>
                    <div className="p-2">
                    <i className="far fa-trash-alt mx-1" onClick={()=> {deleteNote(note._id)}} ></i>
                    </div>
                    
                  </div>
                
                
                
            </div>
          </div>
      </div>     </div>
   
  )
}

export default NotesItem;

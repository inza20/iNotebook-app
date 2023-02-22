import React, { useContext, useEffect, useRef, useState} from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NotesItem from "./NotesItem";

const  Notes = () => {
    const context = useContext(NoteContext);
    // const {notes, setNotes} = context;
    // const {notes} = context;
    const {notes, getNotes, editNote} = context;
    useEffect(() => {
      getNotes();     
    })  

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "" , etitle: "", edescripton: "", etag: ""})
    
    const updateNote = (currentnote) => {        
        ref.current.click();
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag} );
    }
    // Now we have to add functionality to ‘update note’ here after editing.
    // For this, we’ll modify edit function in NoteState such that ‘updateNote’ above can use it.

    const handleClick = (e) => {
        console.log("Updating the note...", note) 
        editNote(note.id, note.etitle, note.edescripton, note.etag)
        refClose.current.click();  
    } 

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
        <AddNote/>

        
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>
        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                </div>      
            </form>

            </div>
            <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
            </div>
            </div>
        </div>
        </div>


        <div className="row my-3">                 
            <h1>Your Notes</h1>
            {notes.map((note) => {
                return <NotesItem key={note._id} updateNote={updateNote} note = {note}/>
            })}
            {/* mapping from NoteState.js */}
            </div>
        </>
    )
}

export default Notes
import React, { useContext} from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NotesItem from "./NotesItem";

const  Notes = () => {
    const context = useContext(NoteContext);
    // const {notes, setNotes} = context;
    const {notes} = context;

    return (
        <>
        <AddNote/>
        <div className="row my-3">                 
            <h1>Your Notes</h1>
            {notes.map((note) => {
                return <NotesItem key={note._id} note = {note}/>
            })}
            {/* mapping from NoteState.js */}
            </div>
        </>
    )
}

export default Notes
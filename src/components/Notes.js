import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NotesItem from "./NotesItem";

const  Notes = () => {
    const context = useContext(NoteContext);
    const {notes, setNotes} = context;

    return (
        <div className="row my-3">                 
            <h1>Your Notes</h1>
            {notes.map((note) => {
                return <NotesItem note = {note}/>
            })}
            {/* mapping from NoteState.js */}
            </div>
    )
}

export default Notes
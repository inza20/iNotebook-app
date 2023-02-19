import React, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000"

  const notesInitial = [ ]

  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    // Fetch API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      // host mentione din ThCl has been declared above 
      method: 'GET', 
      mode: 'cors',
      headers: {
        // the headers we require in Fetch Notes request
        'Content-Type': 'application/json',
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNGZlNDEwYWNjMzYzODM4ZTY1NTdjIn0sImlhdCI6MTY3Njc4NzcwMn0.4bBwRarefVHJc2nFFYDVVB13MUF34915EYejwOu5QIs"
        // Here, hardcoding auth-token - of the user whose notes to be fetched as login hasn't been implemented yet        
      },          
    });
    const json = await response.json();
    console.log(json) 
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    //  API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      // host mentione din ThCl has been declared above 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNGZlNDEwYWNjMzYzODM4ZTY1NTdjIn0sImlhdCI6MTY3Njc4NzcwMn0.4bBwRarefVHJc2nFFYDVVB13MUF34915EYejwOu5QIs"
        // the headers we require in Add Note request
      },    
      body: JSON.stringify(title, description, tag) 
    });

    console.log("adding a new note")
    const note={          
            "_id": "63efb099a31c180486c8d633",
            "user": "63e4fe410acc363838e6557c",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "1676652697330",
            "__v": 0
     };
      // setNotes(notes.push(note))
      setNotes(notes.concat(note))
    }    
  

  // Delete a Note
  const deleteNote = (id) => {
    //TODO: API Call
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note)=> {return note._id!==id})
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // Fetch API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      // host mentione din ThCl has been declared above 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNGZlNDEwYWNjMzYzODM4ZTY1NTdjIn0sImlhdCI6MTY3Njc4NzcwMn0.4bBwRarefVHJc2nFFYDVVB13MUF34915EYejwOu5QIs"
        // the headers we require in Update Note request
      },    
      body: JSON.stringify(title, description, tag) 
    });
    const json = response.json(); 
    
    // Logic to edit on client side (UI)
    for (let index = 0; index < notes.length; index++ ){
      const element = notes[index];
      if(element._id === id){
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
}



export default NoteState;

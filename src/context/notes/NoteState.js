import React, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
  
  const notesInitial = [
    {
      "_id": "63e6883eef9a99e163e89b5b",
      "user": "63e4fe410acc363838e6557c",
      "title": "My Title 30",
      "description": "Please wake up early 3",
      "tag": "personal",
      "date": "1676052542524",
      "__v": 0
    },
    {
      "_id": "63e6885eef9a99e163e89b5f",
      "user": "63e4fe410acc363838e6557c",
      "title": "My Title 25",
      "description": "Please wake up early 35",
      "tag": "personal",
      "date": "1676052574153",
      "__v": 0
    },
    {
      "_id": "63ed29ffa4e04a5d91359036",
      "user": "63e4fe410acc363838e6557c",
      "title": "My Title 525",
      "description": "Please wake up early 5635",
      "tag": "personal",
      "date": "1676487167759",
      "__v": 0
    },
    {
      "_id": "63e6883eef9a99e163e89b5b",
      "user": "63e4fe410acc363838e6557c",
      "title": "My Title 30",
      "description": "Please wake up early 3",
      "tag": "personal",
      "date": "1676052542524",
      "__v": 0
    },
    {
      "_id": "63e6885eef9a99e163e89b5f",
      "user": "63e4fe410acc363838e6557c",
      "title": "My Title 25",
      "description": "Please wake up early 35",
      "tag": "personal",
      "date": "1676052574153",
      "__v": 0
    },
    {
      "_id": "63ed29ffa4e04a5d91359036",
      "user": "63e4fe410acc363838e6557c",
      "title": "My Title 525",
      "description": "Please wake up early 5635",
      "tag": "personal",
      "date": "1676487167759",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)

  // Add a Note
  const addNote = (title, description, tag) => {
    // TODO: API Call
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
  const deleteNote = () => {

  }

  // Edit a Note
  const editNote = () => {

  }


  return (
    
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
      {props.children}
    </NoteContext.Provider>
  );
}



export default NoteState;

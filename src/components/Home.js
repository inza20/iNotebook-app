import React from "react";
// import NoteContext from "../context/notes/NoteContext";
import Notes from "./Notes";
// import AddNote from "./AddNote";


export default function Home(props) {

    const {showAlert} = props;    

    return(
        <>
        
        <Notes showAlert= {showAlert} />
                    
        </>
    )
}
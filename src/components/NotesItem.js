import React from 'react';

const NotesItem = (props) => {
    const {note} = props;
  return (
    <div classname="col-md-3">
        <div className='card my-3'>
            <div className="card-body">
                <h5 className='card-title'> {note.title} </h5>
                <p className='card-description'> {note.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            </div>
        </div>     
    </div>
  )
}

export default NotesItem;
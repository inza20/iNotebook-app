import React from 'react';

const NotesItem = (props) => {
    const {note} = props;
  return (
    <div classname="col-md-3">
        <div className="card my-2">
            <div className="card-body">
                <h5 className="card-title"> {note.title} </h5>
                <p className="card-description"> {note.description}  </p>
                <div className="d-flex align-items-left">
                <i className="far fa-trash-alt mx-2"></i>
                <i className="far fa-edit mx-2"></i>
                </div>
            </div>
        </div>     
    </div>
  )
}

export default NotesItem;

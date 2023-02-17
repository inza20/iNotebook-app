import React from "react";

 const Alert = (props) => {    
      
    return(
        <div className="alert alert-primary" role="alert" style={{marginTop: "3.56rem"}}>
            {props.message}            
        </div>
    )
}

export default  Alert;
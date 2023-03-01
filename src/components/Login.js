import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

export const Login = (props) => {
    
    const host = "http://localhost:5000";

    const [credentials, setCredentials] = useState({email:  "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',            
            headers: {              
              'Content-Type': 'application/json',                        
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password })          
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token' , json.authtoken);
            navigate("/");
            props.showAlert("Logged in successfully", "success" )
          } else{
            props.showAlert("Invalid credentials", "danger");
        }   
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value })
    }

  return (
    <div className="my-5">
        <form >
            
            <div className="mb-3 " style={{marginTop: "3.56rem"}}>
                <h2> Login </h2>
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password"/>
            </div>
            
            <button type="submit" className="btn btn-primary" onClick={handleSubmit} >Login</button>
        </form>
    </div>
  )
}

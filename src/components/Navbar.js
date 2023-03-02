import PropTypes from "prop-types";
import React from "react";
// import  { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

  let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]);

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about" ? "active" : ""}`} to="/about">
                  About
                </Link>
              </li>
              </ul> 

              <div className= "d-flex align-items-end flex-row-reverse">
              {!localStorage.getItem('token') ? <form className= "d-flex "> 
              <Link className="btn btn-primary mx-1" to="/login" role="button"> Login </Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button"> Signup </Link> 
            </form> 
            : <button className="btn btn-primary mx-1" onClick={handleLogout} > Logout </button> }

            </div> </div>           
          </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
};

// export default Navbar;

import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import { UserContext } from "./UserContext";

function Nav() {
  
  const { username, signOut } =   useContext(UserContext)
  console.log(username);

  const handleButtonClicksignOut=()=>{
    console.log("Sign out")
    signOut()
    console.log("token",localStorage.token)
  }

  return (
    <nav className="nav">
      <div className="nav-left">
        <NavLink to="/" className="brand" exact="true">
          ExpLookup
        </NavLink>
        <div className="tabs">
          <NavLink to="/" exact="true">
            Search
          </NavLink>
          {username && (
            <NavLink to={"/profile/" + username}>My Profile</NavLink>
          )}
        </div>
      </div>
      <div className="nav-right">
        <details className="dropdown" open="">
          <summary className="button outline" style={{ margin: 0 }}>
            <i className="material-icons">person</i>
          </summary>
          <div
            className="card"
            style={{ zIndex: 1999, right: 0, left: "inherit" }}
          >
            {username && (
              <>
                {" "}
                <NavLink to={"/profile/" + username}>
                  <p>My profile</p>{" "}
                </NavLink>
                <button onClick={handleButtonClicksignOut}>Sign out</button>
              </>
            )}

            {!username && (
              <>
                <NavLink to="/signup">
                  <p>Sign up</p>{" "}
                </NavLink>
                <hr></hr>
                <NavLink to="/signin">
                <p>Sign in</p>
                </NavLink>

              </>
            )}
          </div>
        </details>
      </div>
    </nav>
  );
}

export default Nav;

import React, { useState, useContext } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import "./Nav.css";
import { UserContext } from "./UserContext";

const Nav = () => {
  
  const { username, signOut } =   useContext(UserContext)
  const navigate = useNavigate();

  const handleButtonClicksignOut = () => {
    signOut();
    navigate('/');
  }

  return (
    <nav className="nav">
      <div className="nav-left">
        <NavLink to="/" className="brand" exact="true">
        <i className="material-icons">person_search</i> ExpLookup
        </NavLink>
        
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

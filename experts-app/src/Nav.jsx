import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { UserContext } from "./UserContext";

function Nav() {
  const [activeTab, setActiveTab] = useState("search");
  const username = useContext(UserContext).username;
  console.log(username);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">
          ExpLookup
        </Link>
        <div className="tabs">
          <Link
            to="/"
            className={activeTab === "search" ? "active" : ""}
            onClick={() => handleTabClick("search")}
          >
            Search
          </Link>
          <Link
            to={"/profile/" + username}
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => handleTabClick("profile")}
          >
            My Profile
          </Link>
        </div>
      </div>
      <div className="nav-right">
        <details className="dropdown" open="">
          <summary className="button outline">
            {" "}
            <i className="material-icons">person</i>
          </summary>
          <div className="card">
            <Link to={"/profile/" + username}>
              <p>My profile</p>{" "}
            </Link>
            <Link to="/signup">
              <p>Sign up</p>{" "}
            </Link>
            <hr></hr>
            <Link to="/signin">
              <p>Sign in</p>
            </Link>
          </div>
        </details>
      </div>
    </nav>
  );
}

export default Nav;

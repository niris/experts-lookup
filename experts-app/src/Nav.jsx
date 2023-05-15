import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const [activeTab, setActiveTab] = useState("search");

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
            to="/"
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => handleTabClick("profile")}
          >
            Profile
          </Link>
        </div>
      </div>
      <div className="nav-right">
        <details className="dropdown" open="">
          <summary className="button outline">
            {" "}
            <i className="material-icons">person</i>
          </summary>
          <form className="card row" style={{zIndex:'2'}}>
            <input className="col-12" placeholder="username" />
            <input className="col-12" placeholder="password" type="password" />
            <footer className="is-right">
              <a className="button clear">Sign up</a>
              <button type="submit">Sign in</button>
            </footer>
          </form>
        </details>
      </div>
    </nav>
  );
}

export default Nav;

import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import SearchProfiles from "./SearchProfiles";
import Profile from "./Profile";
import SignIn from "./SignIn";
import SignUp from "./SignUp.jsx";

function App() {
  return (
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<SearchProfiles />} />
          <Route path="/profile/:userId" element={<Profile />} /> 
          <Route path="/signin" element={<SignIn />} /> 
          <Route path="/signup" element={<SignUp />} /> 
        </Routes>
      </Router>
  );
}

export default App;

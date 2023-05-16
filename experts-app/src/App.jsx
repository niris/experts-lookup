import { React, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import SearchExperts from "./SearchExperts";
import Profile from "./Profile";


function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<SearchExperts />} />
        <Route path="/profile" element={<Profile />} /> 
      </Routes>
    </Router>
  );
}

export default App;


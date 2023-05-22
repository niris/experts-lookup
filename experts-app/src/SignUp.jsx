import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      console.log("response", response);

      if (response.ok) {
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setMessage("You are signed up successully");
        navigate("/signin");
      } else {
        const errorMessage = await response.json();
        console.log("Sign up failed");
        setMessage(`Error!!! : ${errorMessage.message} `);
      }
    } catch (error) {
      console.log("Error signing up:", error);
      setMessage("Error signing up. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSignup}>
          Signup
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;

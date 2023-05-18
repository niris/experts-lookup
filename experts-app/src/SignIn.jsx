import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const SignIn = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const {setUsername} = useContext(UserContext);
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username:usernameInput, password:passwordInput }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);
        console.log(usernameInput);
        setUsername(usernameInput);
        console.log("OK with token", token);
        navigate(`/profile/${usernameInput}`)
      } else {
        console.log("Loggin Error", response);
      }
    } catch (error) {
      console.log("Login Error", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="username"
          placeholder="Username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignIn;

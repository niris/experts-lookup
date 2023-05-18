import React, { createContext, useState, useEffect } from "react";
import jwt from 'jwt-decode'

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [isContextReady, setIsContextReady] = useState(false);


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUsername(jwt(storedToken).userId)
      console.log("Stored username", jwt(storedToken).userId);
      setToken(storedToken);
    }
    setIsContextReady(true);

  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, token, setToken, isContextReady }}>
      {children}
    </UserContext.Provider>
  );
};

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from "./UserContext";

const apiUrl = import.meta.env.VITE_API_URL;


fetch(`${apiUrl}/warmup`);

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
    <App />
  </UserContextProvider>
)

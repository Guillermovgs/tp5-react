<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
=======
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
>>>>>>> master
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
<<<<<<< HEAD
  <StrictMode>
    <App />
  </StrictMode>,
)
=======
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
);
>>>>>>> master

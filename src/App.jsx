import { useState } from 'react'
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import './App.css'

function App() {

  return (
    <>
    
    
    
    <Router>
      <Routes>
        <Route path= "/" element={<Inicio/>}/>
        <Route path= "*" element= {<NoEncontrada/>}/> {/*Ruta Comodin utiliza el *(asteriscto) */}
      </Routes>
    </Router>
    </>
  )
}

export default App
/*Create "wildcard" path */
/*3:45*/
/*a*/

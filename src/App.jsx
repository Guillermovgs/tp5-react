import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Inicio from "./pages/InicioPagina/InicioPagina"
import NoEncontrada from "./pages/NoEncontrada/NoEncontrada"
import FormularioPublicacion from "./pages/Formulario/FormularioPublicacion";

import './App.css'

function App() {

  return (
    <>
    
    
    
      <Routes>
        <Route path= "/" element={<Inicio/>}/>
        <Route path= "/nueva" element={<FormularioPublicacion/>}/>
        <Route path= "/editar/:id" element={<FormularioPublicacion/>}/>
        <Route path= "*" element= {<NoEncontrada/>}/> {/*Ruta Comodin utiliza el *(asteriscto) */}
      </Routes>
    </>
  )
}

export default App
/*Create "wildcard" path */
/*3:45*/
/*abc*/ 


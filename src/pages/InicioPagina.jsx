import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { obtenerPublicacion } from "../services/Publicaciones";
import ItemPublicacion from "../components/ItemPublicacion";

export default function Publicacion() {
    const [lista, setLista]= useState([]);
    const [cargando, setCargando]= useState(true);
    const [error, setError]= useState(null);
    
    useEffect(()=>{
        async function cargarPublicacion() {
            try {
                setCargando(true);
                const datos= await obtenerPublicacion();
                setLista(datos || []);

            } catch (error) {
            console.error ("Error al cargar publicaciones:", error);
            } finally {
                setCargando(false);
            }
        }
        
        
    })
}
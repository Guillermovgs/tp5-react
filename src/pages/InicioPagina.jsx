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

            } catch (err) {
            console.error ("Error al cargar publicaciones:", err);
            setError("Hubo un problema al conectar con la base de datos. Intentalo de nuevo")
            } finally {
                setCargando(false);
            }
        }
        cargarPublicacion();
        
    }, []);

    if (cargando) return <div className="loading">Cargando...</div>
    if (error) return (
        <div className="mensaje-error">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="reintentar">Reintentar</button>
        </div>
    );

return (
    <div className="contenedor-publicacion">
        <div className="header-seccion">
            <Link to="/nueva" className="crear">Nueva Publicacion</Link>
            <h1>Publicaciones</h1>
        </div>
        {lista.length ===0 ? (
            <p className="lista vacia"> Todavia no hay publicaciones</p>
        ):(
            <div className="listado-publicaciones">
                {lista.map((publ) =>(
                    <ItemPublicacion key={publ.id} publicacion={publ}/>
                ))}
            </div>
        )}
    </div>
)

}


    
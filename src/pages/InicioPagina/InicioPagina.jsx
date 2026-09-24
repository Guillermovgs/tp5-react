import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { obtenerPublicacion } from "../../services/Publicaciones";
import CardPublicacion from "../../components/CardPublicacion/CardPublicacion";
import styles from "./InicioPagina.module.css";

export default function Publicacion() {
    const [lista, setLista]= useState([]);
    const [cargando, setCargando]= useState(true);
    const [error, setError]= useState(null);
    
    useEffect(()=>{
        async function cargarPublicacion() {
            try {
                setCargando(true);
                const datos= await obtenerPublicacion();
                setLista(Array.isArray(datos) ? datos : []);

            } catch (err) {
            console.error ("Error al cargar publicaciones:", err);
            setError("Hubo un problema al conectar con la base de datos. Intentalo de nuevo")
            } finally {
                setCargando(false);
            }
        }
        cargarPublicacion();
        
    }, []);

    if (cargando) return <div className={styles.loading}>Cargando...</div>
    if (error) return (
        <div className={styles.mensajeError}>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className={styles.reintentar}>Reintentar</button>
        </div>
    );
console.log(styles)
return (
    <div className={styles.contenedorPublicacion}>
        <div className={styles.headerSeccion}>
            <Link to="/nueva" className={styles.crear}>Nueva Publicacion</Link>
            <h1>Publicaciones</h1>
        </div>
        {lista.length ===0 ? (
            <p className={styles.listaVacia}> Todavia no hay publicaciones</p>
        ):(
            <div className={styles.listadoPublicaciones}>
                {lista.map((publ) =>(
                    <CardPublicacion key={publ.id} publicacion={publ} onEliminar={(idBorrado) => {
                        setLista(lista.filter((pub) => pub.id !== idBorrado));
                    }}/>
                ))}
            </div>
        )}
    </div>
)

}
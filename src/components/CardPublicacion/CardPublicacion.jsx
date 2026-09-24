import { Link } from "react-router-dom";
import styles from "./CardPublicacion.module.css";
import {borrarPublicacion} from "../../services/Publicaciones";

export default function ItemPublicacion({ publicacion, onEliminar }) {
  const confirmarBorrar = async () => {
    const seguro = window.confirm("¿Estás seguro de que quieres borrar esta publicación?");
    if (!seguro) return;
    
    try {
      await borrarPublicacion(publicacion.id);
      onEliminar(publicacion.id); 
    } catch (error) {
      console.error("Error al borrar:", error);
      alert("No se pudo borrar la publicación.");
    }
  };

  
  return (
    <div className={styles.tarjetaPublicacion}>
      <h2>{publicacion.titulo}</h2>
      <p>{publicacion.contenido}</p>
      <span className={styles.fecha}>
        {new Date(publicacion.creado_en).toLocaleDateString()}
      </span>
      
      <div className={styles.acciones}>
        <Link to={`/editar/${publicacion.id}`} className={styles.btnEditar}>
          Editar
        </Link>
        <button className={styles.btnBorrar} onClick={() => confirmarBorrar()}>
          Borrar
        </button>
      </div>
    </div>
  );
}
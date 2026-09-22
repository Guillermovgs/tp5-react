import { Link } from "react-router-dom";
import styles from "./CardPublicacion.module.css";

export default function ItemPublicacion({ publicacion }) {
  return (
    <div className={styles.tarjetaPublicacion}>
      <h2>{publicacion.titulo}</h2>
      <p>{publicacion.contenido}</p>
      <span className={styles.fecha}>
        {new Date(publicacion.created_at).toLocaleDateString()}
      </span>
      
      <div className={styles.acciones}>
        <Link to={`/editar/${publicacion.id}`} className={styles.btnEditar}>Editar</Link>
        <button className={styles.btnBorrar}>Borrar</button>
      </div>
    </div>
  );
}

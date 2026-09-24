import { Link } from "react-router-dom";
import styles from "./NoEncontrada.module.css";

export default function NoEncontrada() {
  return (
    <div className={styles.contenedor}>
      <div className={styles.tarjeta}>
        <h1 className={styles.codigo}>404</h1>
        <h2 className={styles.subtitulo}>Página no encontrada</h2>
        <p className={styles.descripcion}>
          Lo sentimos, la publicación o direccion que estás buscando no existe o fue movida.</p>
        
        <Link to="/" className={styles.btnVolver}>
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

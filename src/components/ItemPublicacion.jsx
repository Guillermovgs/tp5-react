import { Link } from "react-router-dom";

export default function ItemPublicacion({ publicacion }) {
  return (
    <div className="tarjeta-publicacion">
      <h2>{publicacion.titulo}</h2>
      <p>{publicacion.contenido}</p>
      <span className="fecha">
        {new Date(publicacion.created_at).toLocaleDateString()}
      </span>
      
      <div className="acciones">
        <Link to={`/editar/${publicacion.id}`} className="btn-editar">Editar</Link>
        <button className="btn-borrar">Borrar</button>
      </div>
    </div>
  );
}

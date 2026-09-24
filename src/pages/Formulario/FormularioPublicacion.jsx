import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { crearPublicacion, obtenerPublicacionPorId, actualizarPublicacion } from "../../services/Publicaciones";
import styles from "./FormularioPublicacion.module.css";

export default function FormularioPagina() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  // controles de carga y error de red generales
  const [cargandoDatos, setCargandoDatos] = useState(esEdicion);
  const [errorServidor, setErrorServidor] = useState(null);

  // inicializamos React Hook Form
  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors, isSubmitting } 
  } = useForm({
    defaultValues: {
      titulo: "",
      contenido: ""
    }
  });

  //si es edición, cargamos los data de Supabase y rellenamos el formulario
  useEffect(() => {
    if (!esEdicion) return;

    async function cargarPublicacion() {
      try {
        setCargandoDatos(true);
        const pub = await obtenerPublicacionPorId(id);
        
        if (pub) {
          // el método 'setValue' inyecta los valores directo en los inputs de react-hook-form
          setValue("titulo", pub.titulo);
          setValue("contenido", pub.contenido);
        } else {
          setErrorServidor("La publicación no existe.");
        }
      } catch (err) {
        console.error("Error al cargar:", err);
        setErrorServidor("No se pudieron cargar los datos.");
      } finally {
        setCargandoDatos(false);
      }
    }

    cargarPublicacion();
  }, [id, esEdicion, setValue]);

  //funcion de envio unificada
  async function onSubmit(data) {
    try {
      setErrorServidor(null);

      if (esEdicion) {
        //Enviar id y los otros campos
        await actualizarPublicacion(id, data);
      } else {
        await crearPublicacion(data.titulo, data.contenido);
      }

      navigate("/"); //volver al inicio
    } catch (err) {
      console.error("Error al guardar:", err);
      setErrorServidor("Ocurrió un error al guardar los data. Inténtalo de nuevo.");
    }
  }

  if (cargandoDatos) return <div className={styles.loading}>Cargando data de la publicacion...</div>;

  return (
    <div className={styles.contenedorForm}>
      <h1>{esEdicion ? "Editar Publicación" : "Nueva Publicación"}</h1>

      {errorServidor && <div className={styles.mensajeError}>{errorServidor}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formularioCrud}>
        
        <div className={styles.campo}>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            {...register("titulo", { required: "El título es obligatorio." })}
            placeholder="Escribe el título aquí..."
            disabled={isSubmitting}
          />
          {errors.titulo && <span className={styles.errorValidacion}>{errors.titulo.message}</span>}
        </div>

        <div className={styles.campo}>
          <label htmlFor="contenido">Contenido</label>
          <textarea
            id="contenido"
            {...register("contenido", { required: "El contenido no puede estar vacío." })}
            placeholder="¿De qué quieres hablar hoy?..."
            rows="6"
            disabled={isSubmitting}
          ></textarea>
          {errors.contenido && <span className={styles.errorValidacion}>{errors.contenido.message}</span>}
        </div>

        <div className={styles.botones}>
          <button 
            type="button" 
            onClick={() => {
              navigate("/");
            }} 
            className={styles.btnCancelar}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          
          <button 
            type="submit" 
            className={styles.btnGuardar}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : esEdicion ? "Guardar Cambios" : "Publicar"}
          </button>
        </div>

      </form>
    </div>
  );
}

import {useForm} from "react-hook-form"

import React from 'react'

export default function FormularioPublicacion() {
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  function guardarPublicacion(datos) {
    console.log("Datos del formulario:", datos)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(guardarPublicacion)}/>
        <input
        placeholder="Titulo de la publicacion"
        {...register("titulo", {requiered: "El titulo es obligatorio"})}
        />
        {errors.titulo && <span>{errors.titulo.message}</span>}
        <textarea
        placeholder="Contendio/descripcion de la publicacion"
        {...register("contenido", {requiered: "El contenido es obligatorio"})}
        />
        {errors.contenido && <span>{errors.contenido.message}</span>}
        <button type="submit" disabled={isSubmitting}>Guardar publicacion</button>
      </form>
    </div>
  )
}

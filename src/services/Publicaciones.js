import { supabase } from "../supabaseClient";

export async function obtenerPublicacion() {
  const { data, error } = await supabase
    .from("publicaciones")
    .select("*")
    .order("creado_en", { ascending: false }); 
    
  if (error) throw error;
  return data; 
}
export async function obtenerPublicacionPorId(id) {
  const { data, error } = await supabase
    .from("publicaciones")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function crearPublicacion(titulo, contenido) {
  const { data, error } = await supabase
    .from("publicaciones")
    .insert({ titulo, contenido })
    .select(); 
    
  if (error) throw error;
  return data;
}

export async function actualizarPublicacion(id, cambios) {
  const { data, error } = await supabase
    .from("publicaciones")
    .update(cambios)
    .eq("id", id)
    .select();
    
  if (error) throw error;
  return data;
}
export async function borrarPublicacion(id) {
  const { data, error } = await supabase
    .from("publicaciones")
    .delete()
    .eq("id", id)
    .select();
    
  if (error) throw error;
  return data;
}

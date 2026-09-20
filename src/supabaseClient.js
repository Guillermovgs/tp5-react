import { createClient } from "@supabase/supabase-js";

const direccion = import.meta.env.VITE_SUPABASE_URL;
const claveAnonima = import.meta.env.VITE_SUPABASE_ANON_KEY;

// aviso temprano si falta configurar el .env
if (!direccion || !claveAnonima) {
  console.error("Faltan las variables de Supabase en el archivo .env");
}

export const supabase = createClient(direccion, claveAnonima);
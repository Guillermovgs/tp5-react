url a utilizar
VITE_SUPABASE_URL=https://qefzivqxwnyxlfbamgxe.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlZnppdnF4d255eGxmYmFtZ3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NDA1NjksImV4cCI6MjEwNTIxNjU2OX0.mqD7JICfZyhc3IUMbn58C6VOCa5lbvPP-ThLRowQyDE


Explicacion del servicio de base de batos (services/publicaciones.js)

Este archivo centraliza toda la interacción con la API de Supabase, aislando la lógica de la base de datos de los componentes visuales de React. A continuación, se detalla el funcionamiento de las cuatro operaciones del CRUD implementadas:

1. obtenerPublicacion() (Lectura)
* ¿Qué hace? Realiza una petición de tipo SELECT a la tabla publicaciones para traer todas las filas existentes. Utiliza el modificador .order("creado_en", { ascending: false }) para asegurarse de que los datos vengan ordenados cronológicamente, mostrando las publicaciones más recientes al principio.
* ¿Dónde se dispara? Se ejecuta dentro del hook useEffect al montar la página principal (InicioPagina.jsx). Al recibir la respuesta, guarda el array de publicaciones en el estado local lista para renderizar las tarjetas en pantalla.

2. obtenerPublicacionPorId(id) / crearPublicacion(datos) (Creación)
* ¿Qué hace? Toma el objeto con el titulo y contenido validado por React Hook Form y realiza un INSERT en la tabla. Incluye el método .select() al final para forzar a Supabase a retornar el objeto exacto que se acaba de guardar con su ID asignado.
* ¿Dónde se dispara?: Se dispara al enviar el formulario híbrido (FormularioPublicacion.jsx) mediante el evento onSubmit, únicamente cuando la aplicación detecta que la URL es /nueva (es decir, el parámetro id de la ruta es undefined).

3. actualizarPublicacion(id, cambios) (Actualización)
* ¿Qué hace? Recibe el identificador único del elemento y un objeto con las modificaciones hechas por el usuario. Ejecuta un comando UPDATE filtrando estrictamente con un .eq("id", id) para alterar solo esa fila, usando también .select() para confirmar los datos actualizados.
* ¿Dónde se dispara? Se ejecuta en la función onSubmit del mismo formulario híbrido (FormularioPublicacion.jsx), pero se activa exclusivamente si la URL contiene un ID válido (ej. /editar/15), lo que significa que el componente está operando en "modo edición".

4. borrarPublicacion(id) o eliminarPublicacion(id) (Baja - D de CRUD)
* ¿Qué hace? Envía una instrucción DELETE orientada por el identificador del registro mediante el filtro .eq("id", id). Esto remueve la publicación de la base de datos de forma permanente.
* ¿Dónde se dispara? Se ejecuta directamente desde el componente individual de la tarjeta (CardPublicacion.jsx). Se acciona al hacer clic en el botón "Borrar", justo después de que el usuario confirma la acción mediante el cuadro de diálogo nativo window.confirm(). Tras completarse en red, se le avisa al componente padre para que remueva el elemento del estado de React de forma instantánea.

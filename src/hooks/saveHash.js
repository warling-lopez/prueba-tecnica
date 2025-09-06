// Función para guardar el hash
export const saveHash = (hash) => {
  try {
    localStorage.setItem("user_data", hash);
  } catch (err) {
    console.error("Error guardando hash:", err);
  }
};
 
// Función para leer el hash
export const getHash = () => {
  try {
    return localStorage.getItem("user_hash");
  } catch (err) {
    console.error("Error leyendo hash:", err);
    return null;
  }
};

// Función para eliminar el hash
export const removeHash = () => {
  try {
    localStorage.removeItem("user_hash");
  } catch (err) {
    console.error("Error eliminando hash:", err);
  }
};

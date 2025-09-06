import { supabase } from "../Supabase/supabaseClient"; // tu cliente de Supabase

// Guardar el token en localStorage
export const saveHash = async (hash) => {
  try {
    localStorage.setItem("user_token", hash);

    // Opcional: setear sesión para poder obtener info del usuario
    await supabase.auth.setSession({ access_token: hash, refresh_token: null });

    // Obtener info del usuario y guardarla también
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error obteniendo info del usuario:", error);
      return;
    }

    localStorage.setItem("user_info", JSON.stringify(user));
    console.log("Usuario guardado:", user);
  } catch (err) {
    console.error("Error guardando hash:", err);
  }
};

// Leer el token
export const getHash = () => {
  try {
    return localStorage.getItem("user_token");
  } catch (err) {
    console.error("Error leyendo hash:", err);
    return null;
  }
};

// Leer info del usuario
export const getUserInfo = () => {
  try {
    const user = localStorage.getItem("user_info");
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.error("Error leyendo info del usuario:", err);
    return null;
  }
};

// Eliminar token e info del usuario
export const removeHash = () => {
  try {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_info");
  } catch (err) {
    console.error("Error eliminando hash:", err);
  }
};

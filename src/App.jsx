import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {supabase} from "./Supabase/supabaseClient"; // Asegúrate de tener este archivo configurado
import { getHash } from "./hooks/saveHash";
import { saveHash } from "./hooks/saveHash";
// Este es el componente principal que contiene toda la landing page.
const App = () => {
  // Estado para controlar la visibilidad del mensaje de éxito
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const params = new URLSearchParams(hash.substring());
    const accessToken = params.get("access_token");
    if (accessToken) {
      saveHash(accessToken);
      console.log("Hash guardado:", accessToken);
    }

    // Limpiar la URL para que no se vea el hash
    window.history.replaceState(null, null, window.location.pathname);
  }, []);

  // Función de login con Google
  // Función para simular el inicio de sesión y mostrar el mensaje
  const handleGoogleLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin }
    });
    console.log(data);
    if (error) {
      console.error("Error en login con Google:", error.message);
      return;
    }

    // Supongamos que recibes un hash/token después del login
    const Hash = getHash(); // aquí iría data.session?.access_token o lo que necesites
    saveHash(Hash); // guardamos en localStorage

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  } catch (err) {
    console.error("Error inesperado:", err);
  }
};



  // Funciones utilitarias para los iconos SVG, ya que no podemos usar data-lucide
  const IconFileText = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-blue-600"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );

  const IconUploadCloud = () => (
    <Link to="/dashboard/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-blue-600"
      >
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M12 12v9" />
        <path d="m8 17 4 4 4-4" />
      </svg>
    </Link>
  );

  const IconMousePointer = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-blue-600"
    >
      <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      <path d="m13 13 6 6" />
    </svg>
  );

  const IconPenTool = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-blue-600"
    >
      <path d="m12 19 7-7 3 3-7 7-3-3z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="m2 2 7.586 7.586" />
      <path d="M10.424 10.424 18 18" />
    </svg>
  );

  const IconShare2 = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-blue-600"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  );

  return (
    <div className="bg-gray-50 text-gray-800 font-sans antialiased">
      {/* Tailwind y la fuente Inter se cargan a través de los CDN y el CSS global en el head del HTML */}
      {/* El script de Lucide lo he reemplazado con SVG de línea para que todo sea self-contained */}

      {/* Header Section */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h1 className="text-2xl font-bold text-gray-800">Warling</h1>
            </div>
            <div>
              <button
                onClick={handleGoogleLogin}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-lg"
              >
                Iniciar Sesión con Google
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Transforma tus y mejora tus Documentos{" "}
            <span
              className="text-gradient"
              style={{
                backgroundImage: "linear-gradient(to right, #2563eb, #3b82f6)",
              }}
            >
              PDFs
            </span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Crea, comparte y gestiona documentos digitales con facilidad. La
            forma más rápida de digitalizar tu negocio sin una sola línea de
            código.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleGoogleLogin}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
            >
              <svg
                className="w-5 h-5 mr-3"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44.44 24.36c0-1.72-.15-3.39-.45-5H24v9.64h11.23c-.49 2.58-1.99 4.79-4.22 6.27l-4.78 3.7c2.78 2.06 6.32 3.29 10.33 3.29 6.01 0 11.1-2.02 14.86-5.46L44.44 24.36z"
                  fill="#4285F4"
                />
                <path
                  d="M24 45c5.38 0 9.87-1.78 13.16-4.83l-4.78-3.7c-1.34 1.05-3.05 1.67-4.77 1.67-3.66 0-6.7-2.46-7.83-5.78H11.23l-5.18 4c3.08 6.1 9.47 10.22 17.95 10.22z"
                  fill="#34A853"
                />
                <path
                  d="M16.17 29.41a8.498 8.498 0 01-.26-2.52c0-.84.09-1.66.26-2.47v-8.24H11.23a19.728 19.728 0 000 20.42l4.94-3.95z"
                  fill="#FBBC05"
                />
                <path
                  d="M24 14.35c2.97 0 5.61 1.03 7.7 3l4.24-4.24c-3.13-2.93-7.23-4.76-11.94-4.76-8.48 0-14.87 4.12-17.95 10.22l4.94 3.95c1.13-3.32 4.17-5.78 7.83-5.78z"
                  fill="#EA4335"
                />
              </svg>
              Regístrate con Google
            </button>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Simplifica tu Flujo de Trabajo
          </h3>
          <p className="max-w-xl mx-auto text-lg text-gray-600 mb-12">
            Digitaliza tus operaciones y haz que la gestión de documentos sea
            más eficiente que nunca.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center items-center h-12 w-12 rounded-full bg-blue-100 mx-auto mb-4">
                <IconUploadCloud />
              </div>
              <h4 className="text-xl font-semibold mb-2">Sube tus PDFs</h4>
              <p className="text-gray-500">
                Importa cualquier documento PDF con un solo clic y prepáralo
                para la digitalización.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center items-center h-12 w-12 rounded-full bg-blue-100 mx-auto mb-4">
                <IconMousePointer />
              </div>
              <h4 className="text-xl font-semibold mb-2">Arrastra y Suelta</h4>
              <p className="text-gray-500">
                Añade campos de texto, fechas, casillas de verificación y firmas
                de forma intuitiva.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center items-center h-12 w-12 rounded-full bg-blue-100 mx-auto mb-4">
                <IconPenTool />
              </div>
              <h4 className="text-xl font-semibold mb-2">
                Firma Digital Segura
              </h4>
              <p className="text-gray-500">
                Recoge firmas legalmente válidas directamente en el formulario
                digital.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center items-center h-12 w-12 rounded-full bg-blue-100 mx-auto mb-4">
                <IconShare2 />
              </div>
              <h4 className="text-xl font-semibold mb-2">
                Comparte en Segundos
              </h4>
              <p className="text-gray-500">
                Genera un enlace único para compartir tus formularios con
                cualquier persona.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Cómo Funciona
          </h3>
          <div className="relative grid grid-cols-2 max-w-5xl mx-auto">
            {/* Timeline/steps */}
            <div className="absolute left-1/2 -ml-0.5 w-1 h-full bg-blue-200 hidden md:block"></div>

            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center md:items-start m-8">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl mr-0 md:mr-6 mb-4 md:mb-0">
                1
              </div>
              <div className="md:text-left text-center">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Sube tu Documento
                </h4>
                <p className="text-gray-600">
                  Comienza subiendo tu PDF, contrato o cualquier otro documento.
                  Nuestra interfaz intuitiva te guiará en el proceso.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center md:items-start m-8 pt-50 pl-3 ">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl ml-0 md:ml-6 mb-4 md:mb-0">
                2
              </div>
              <div className="md:text-right text-center">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Edita con Facilidad
                </h4>
                <p className="text-gray-600">
                  Arrastra y suelta campos de texto, firmas, fechas y casillas
                  de verificación donde los necesites.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center md:items-start m-8">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl mr-0 md:mr-6 mb-4 md:mb-0">
                3
              </div>
              <div className="md:text-left text-center">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Comparte y Recibe
                </h4>
                <p className="text-gray-600">
                  Envía el enlace único a tus clientes. Ellos pueden llenar y
                  firmar desde cualquier dispositivo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Listo para Empezar?</h3>
          <p className="text-blue-200 max-w-xl mx-auto mb-8">
            Digitaliza tus documentos y formularios en minutos. No se requiere
            tarjeta de crédito para empezar.
          </p>
          <button
            onClick={handleGoogleLogin}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-blue-600 bg-white hover:bg-gray-100 transition-colors duration-300 shadow-lg transform hover:scale-105"
          >
            <svg
              className="w-5 h-5 mr-3"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44.44 24.36c0-1.72-.15-3.39-.45-5H24v9.64h11.23c-.49 2.58-1.99 4.79-4.22 6.27l-4.78 3.7c2.78 2.06 6.32 3.29 10.33 3.29 6.01 0 11.1-2.02 14.86-5.46L44.44 24.36z"
                fill="#4285F4"
              />
              <path
                d="M24 45c5.38 0 9.87-1.78 13.16-4.83l-4.78-3.7c-1.34 1.05-3.05 1.67-4.77 1.67-3.66 0-6.7-2.46-7.83-5.78H11.23l-5.18 4c3.08 6.1 9.47 10.22 17.95 10.22z"
                fill="#34A853"
              />
              <path
                d="M16.17 29.41a8.498 8.498 0 01-.26-2.52c0-.84.09-1.66.26-2.47v-8.24H11.23a19.728 19.728 0 000 20.42l4.94-3.95z"
                fill="#FBBC05"
              />
              <path
                d="M24 14.35c2.97 0 5.61 1.03 7.7 3l4.24-4.24c-3.13-2.93-7.23-4.76-11.94-4.76-8.48 0-14.87 4.12-17.95 10.22l4.94 3.95c1.13-3.32 4.17-5.78 7.83-5.78z"
                fill="#EA4335"
              />
            </svg>
            Regístrate con Google
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Warling. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Success Message Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="h-12 w-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">¡Éxito!</h3>
            <p className="text-gray-600">
              Has iniciado sesión correctamente. Esta es una simulación.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

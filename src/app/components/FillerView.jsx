import React from 'react';
import { PenTool } from 'lucide-react';

const FillerView = ({ currentTemplate, setCurrentView, setShowSignatureModal, showSuccessMessage }) => {
  const submitForm = () => {
    console.log("Formulario enviado.");
    showSuccessMessage();
    setCurrentView('dashboard');
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Llenar: {currentTemplate.name}</h2>
          <button onClick={() => setCurrentView('dashboard')} className="text-sm font-medium text-gray-600 hover:text-gray-900">Cerrar</button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex justify-center">
        <div id="filler-pdf-container" className="relative bg-white p-4 rounded-lg shadow-lg">
          <img src="https://dms-shuttle.com/test-pdf-file.pdf" className="max-w-full h-auto" alt="Formulario de Ejemplo" />
          {currentTemplate.fields.map((field) => (
            <div
              key={field.id}
              style={{ position: 'absolute', top: field.y, left: field.x, width: field.width, height: field.height }}
            >
              {field.type === 'text' && <input type="text" placeholder="Escriba aquí..." className="form-element-input" />}
              {field.type === 'date' && <input type="date" className="form-element-input" />}
              {field.type === 'checkbox' && <div className="flex items-center h-full"><input type="checkbox" className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /></div>}
              {field.type === 'signature' && (
                <div onClick={() => setShowSignatureModal(true)} className="w-full h-full bg-yellow-100 border border-yellow-400 rounded-md cursor-pointer flex items-center justify-center text-gray-500 text-sm">
                  <PenTool className="mr-2 h-4 w-4" /> Haz clic para firmar
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-white border-t p-4 flex justify-end">
        <button onClick={submitForm} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Enviar Formulario
        </button>
      </footer>
    </div>
  );
};

export default FillerView;
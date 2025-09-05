import React from 'react';
import { ArrowLeft, Save, Share2, Type, Calendar, CheckSquare, PenTool, Move } from 'lucide-react';

const EditorView = ({ currentTemplate, setCurrentView, openShareModal }) => {
  // Nota: La lógica de arrastrar, soltar y redimensionar requeriría una biblioteca
  // de React como `react-draggable` o `react-resizable`. Aquí solo se presenta la estructura.
  const addField = (type) => {
    // Lógica para añadir un campo al estado
    console.log(`Añadiendo campo de tipo: ${type}`);
    currentTemplate.name == "prueba.pdf"
  };

  const removeField = (index) => {
    // Lógica para remover un campo del estado
    console.log(`Eliminando campo en el índice: ${index}`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <button onClick={() => setCurrentView('dashboard')} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Panel
        </button>
        <div className="text-lg font-semibold text-gray-800">{currentTemplate.name}</div>
        <div className="flex items-center space-x-3">
          <button onClick={() => openShareModal(currentTemplate)} className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
            <Share2 className="mr-2 h-4 w-4" />
            Compartir
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
            <Save className="mr-2 h-4 w-4" />
            Guardar Plantilla
          </button>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 bg-gray-50 p-6 border-r border-gray-200 overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Añadir Campos</h3>
          <div className="space-y-3">
            <div onClick={() => addField('text')} className="flex items-center p-3 rounded-lg bg-white border border-gray-200 cursor-pointer hover:bg-gray-100 hover:border-blue-500 transition-all">
              <Type className="h-5 w-5 text-gray-500 mr-3" />
              <span className="font-medium text-gray-700">Campo de Texto</span>
            </div>
            <div onClick={() => addField('date')} className="flex items-center p-3 rounded-lg bg-white border border-gray-200 cursor-pointer hover:bg-gray-100 hover:border-blue-500 transition-all">
              <Calendar className="h-5 w-5 text-gray-500 mr-3" />
              <span className="font-medium text-gray-700">Fecha</span>
            </div>
            <div onClick={() => addField('checkbox')} className="flex items-center p-3 rounded-lg bg-white border border-gray-200 cursor-pointer hover:bg-gray-100 hover:border-blue-500 transition-all">
              <CheckSquare className="h-5 w-5 text-gray-500 mr-3" />
              <span className="font-medium text-gray-700">Checkbox</span>
            </div>
            <div onClick={() => addField('signature')} className="flex items-center p-3 rounded-lg bg-white border border-gray-200 cursor-pointer hover:bg-gray-100 hover:border-blue-500 transition-all">
              <PenTool className="h-5 w-5 text-gray-500 mr-3" />
              <span className="font-medium text-gray-700">Firma</span>
            </div>
          </div>
        </aside>
        <main className="flex-1 bg-gray-100 p-8 overflow-auto flex justify-center">
          <div id="pdf-container" className="relative">
            {/* El PDF se renderizaría aquí, por ejemplo, con react-pdf */}
            <canvas id="pdf-render"></canvas>
            {currentTemplate.fields.map((field, index) => (
              <div
                key={field.id}
                id={`field-${field.id}`}
                className="draggable-field"
                style={{ top: field.y, left: field.x, width: field.width, height: field.height }}
              >
                <div className="handle"><Move className="h-3 w-3" /></div>
                <div className="w-full h-full flex items-center justify-center text-sm text-blue-800">
                  {field.type === 'text' && <span>Texto</span>}
                  {field.type === 'date' && <span>Fecha</span>}
                  {field.type === 'checkbox' && <div className="w-4 h-4 border-2 border-blue-400"></div>}
                  {field.type === 'signature' && <span>Firma aquí</span>}
                </div>
                <div className="resizable-handle"></div>
                <button onClick={() => removeField(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">&times;</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditorView;
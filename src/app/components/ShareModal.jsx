import React from 'react';
import { X } from 'lucide-react';

const ShareModal = ({ shareLink, setShowShareModal, previewForm, showSuccessMessage }) => {
  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    showSuccessMessage();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-30">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Compartir Formulario</h3>
          <button onClick={() => setShowShareModal(false)}><X className="h-6 w-6 text-gray-500" /></button>
        </div>
        <p className="text-gray-600 mb-4">Cualquiera con este enlace podrá llenar y enviar el formulario.</p>
        <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md">
          <input type="text" readOnly value={shareLink} id="share-link-input" className="bg-transparent w-full text-gray-700 focus:outline-none" />
          <button onClick={copyShareLink} className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600">Copiar</button>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={previewForm} className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Vista Previa</button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
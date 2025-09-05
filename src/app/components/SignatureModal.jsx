import React, { useEffect, useRef } from 'react';
import SignaturePad from 'signature_pad';

const SignatureModal = ({ setShowSignatureModal, showSuccessMessage }) => {
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      signaturePadRef.current = new SignaturePad(canvas, {
        backgroundColor: 'rgb(255, 255, 255)',
      });
    }
  }, []);

  const clearSignature = () => {
    signaturePadRef.current.clear();
  };

  const saveSignature = () => {
    if (signaturePadRef.current.isEmpty()) {
      alert("Por favor, provea una firma.");
    } else {
      // const dataURL = signaturePadRef.current.toDataURL();
      setShowSignatureModal(false);
      showSuccessMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-40">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Firme en el recuadro</h3>
        <canvas ref={canvasRef} id="signature-canvas" className="border border-gray-300 rounded-md w-full h-48"></canvas>
        <div className="mt-4 flex justify-end space-x-3">
          <button onClick={clearSignature} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Limpiar</button>
          <button onClick={saveSignature} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700">Guardar Firma</button>
        </div>
      </div>
    </div>
  );
};

export default SignatureModal;

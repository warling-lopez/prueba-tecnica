import React from 'react';

const SuccessNotification = () => {
  return (
    <div className="fixed top-5 right-5 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md z-50">
      <strong className="font-bold">¡Éxito!</strong>
      <span className="block sm:inline ml-2">Acción completada correctamente.</span>
    </div>
  );
};

export default SuccessNotification;
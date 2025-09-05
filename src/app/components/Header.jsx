import React from 'react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="text-xl font-bold text-gray-800">Formularios Digitales Pro</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Bienvenido, Negocio Pequeño</span>
            <img className="h-9 w-9 rounded-full" src="https://placehold.co/100x100/e2e8f0/475569?text=NP" alt="Avatar" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
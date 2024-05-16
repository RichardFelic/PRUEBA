import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold">
              Mi Aplicación
            </Link>
          </div>
          <div className="flex space-x-4">
            <div className="relative" onClick={toggleDropdown}>
              <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Categorías
              </button>
              {dropdownOpen && (
                <div className="absolute z-10 mt-2 w-40 bg-white rounded-md shadow-lg" onBlur={() => setDropdownOpen(false)}>
                  <Link to="/categorias" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                    Ver Categorías
                  </Link>
                  <Link to="/categoriasform" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                    Crear Categoría
                  </Link>
                </div>
              )}
            </div>
            <Link to="/productos" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Productos
            </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
}

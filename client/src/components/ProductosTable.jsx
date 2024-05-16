import React from "react";
import { useNavigate } from "react-router-dom";

export function ProductosTable({ productos }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-800 uppercase text-sm font-semibold">
          <tr>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Descripción</th>
            <th className="py-3 px-6 text-left">Precio</th>
            <th className="py-3 px-6 text-left">Inventario</th>
            <th className="py-3 px-6 text-left">Categoría</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {productos.map((producto) => (
            <tr
              key={producto.id}
              onClick={() => {
                navigate(`/productos/${producto.id}`);
              }}
              className="bg-gray-50 hover:bg-gray-100 cursor-pointer"
            >
              <td className="py-4 px-6 border-b border-gray-200">{producto.id}</td>
              <td className="py-4 px-6 border-b border-gray-200">{producto.nombre}</td>
              <td className="py-4 px-6 border-b border-gray-200">{producto.descripcion}</td>
              <td className="py-4 px-6 border-b border-gray-200">{producto.precio}</td>
              <td className="py-4 px-6 border-b border-gray-200">{producto.inventario}</td>
              <td className="py-4 px-6 border-b border-gray-200">{producto.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

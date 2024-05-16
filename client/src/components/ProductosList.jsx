import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProductos } from "../api/productos.api";
import { ProductosTable } from "../components/ProductosTable";

export function ProductosList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function loadProductos() {
      try {
        const res = await getAllProductos();
        setProductos(res.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    }
    loadProductos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Productos</h1>
        <Link
          to="/productosform"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Crear Producto
        </Link>
      </div>
      <ProductosTable productos={productos} />
    </div>
  );
}

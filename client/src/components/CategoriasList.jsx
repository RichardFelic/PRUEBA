import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategoria } from "../api/categorias.api";
import { CategoriasTable } from "../components/CategoriasTable";


export function CategoriasList() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function loadCategorias() {
      try {
        const res = await getAllCategoria();
        setCategorias(res.data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    }
    loadCategorias();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Categorías</h1>
        <Link
          to="/categoriasform"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Crear Categoría
        </Link>
      </div>
      <CategoriasTable categorias={categorias} />
    </div>
  );
}

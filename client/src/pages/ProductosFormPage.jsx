import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createProducto, updateProducto, getProducto } from "../api/productos.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getAllCategoria } from "../api/categorias.api";

export function ProductosFormPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();
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

  useEffect(() => {
    async function loadProducto() {
      if (params.id) {
        try {
          const { data } = await getProducto(params.id);
          setValue("nombre", data.nombre);
          setValue("descripcion", data.descripcion);
          setValue("precio", data.precio);
          setValue("inventario", data.inventario);
          setValue("categoria", data.categoria.id ? data.categoria.id.toString() : '');
        } catch (error) {
          console.error("Error al cargar producto:", error);
        }
      }
    }
    loadProducto();
  }, [params.id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        await updateProducto(params.id, data);
        toast.success('Producto actualizado');
      } else {
        await createProducto(data);
        toast.success('Producto creado');
      }
      navigate("/productos");
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Formulario de Productos</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Nombre" {...register("nombre", { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500 text-black" />
        {errors.nombre && <span className="text-red-500">Este campo es requerido</span>}
        <input type="text" placeholder="Descripción" {...register("descripcion", { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500 text-black" />
        {errors.descripcion && <span className="text-red-500">Este campo es requerido</span>}
        <input type="number" placeholder="Precio" {...register("precio", { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500 text-black" />
        {errors.precio && <span className="text-red-500">Este campo es requerido</span>}
        <input type="number" placeholder="Inventario" {...register("inventario", { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500 text-black" />
        {errors.inventario && <span className="text-red-500">Este campo es requerido</span>}
        <select {...register("categoria", { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500 text-black">
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
          ))}
        </select>
        {errors.categoria && <span className="text-red-500">Este campo es requerido</span>}
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Guardar</button>
      </form>
    </div>
  );
}

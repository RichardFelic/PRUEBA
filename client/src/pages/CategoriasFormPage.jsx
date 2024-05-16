// CategoriasFormPage.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createCategorias, deleteCategorias, updateCategorias, getCategorias} from "../api/categorias.api";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-hot-toast";

export function CategoriasFormPage() {
  const { register, handleSubmit, formState: { errors }, setValue} = useForm();
  const navigate = useNavigate ();
  const params = useParams();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        await updateCategorias(params.id, data);
        toast.success('Categoria actualizada', {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff"
          }
        })
      } else {
        await createCategorias(data);
        toast.success('Categoria creada', {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff"
          }
        })
      }
      navigate("/categorias");
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  }; 

  useEffect(() => {
    async function loadCategorias(){
      if (params.id) {
        const {data} = await getCategorias(params.id);
        setValue("nombre", data.nombre)
    }
  }
    loadCategorias();
 }, []);

 return (
  <div className="max-w-md mx-auto mt-8">
    <h2 className="text-xl font-semibold mb-4">Formulario de Categorías</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Nombre" {...register("nombre", { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500  text-black" />
      {errors.nombre && <span className="text-red-500">Este campo es requerido</span>}
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Guardar</button>
    </form>
    {
      params.id && (
        <button onClick={async () => {
          const accepted = window.confirm('¿Estás seguro?');
          if (accepted) {
            await deleteCategorias(params.id);
            toast.success('Categoría eliminada', {
              position: "bottom-right",
              style: {
                background: "#38a169",
                color: "#fff"
              }
            });
            navigate("/categorias");
          }
        }} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4">
          Borrar
        </button>
      )
    }
  </div>
);
}
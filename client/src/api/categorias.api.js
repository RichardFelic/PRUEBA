import axios from "axios";

const categoriasApi = axios.create({
  baseURL: "http://localhost:8000/sistvent/api/v1/categorias/",
});

export const getAllCategoria = () => categoriasApi.get("/");

export const getCategorias = (id) => categoriasApi.get(`/${id}/`)

export const createCategorias = (categorias) => categoriasApi.post("/", categorias);

export const deleteCategorias = (id) => categoriasApi.delete(`/${id}`);

export const updateCategorias = (id, categorias) => categoriasApi.put(`/${id}/`, categorias);
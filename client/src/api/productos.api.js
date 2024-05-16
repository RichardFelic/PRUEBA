import axios from "axios";

const productosApi = axios.create({
  baseURL: "http://localhost:8000/sistvent/api/v1/productos/",
});

export const getAllProductos = () => productosApi.get("/");

export const getProducto = (id) => productosApi.get(`/${id}/`);

export const createProducto = (producto) => productosApi.post("/", producto);

export const deleteProducto = (id) => productosApi.delete(`/${id}`);

export const updateProducto = (id, producto) => productosApi.put(`/${id}/`, producto);

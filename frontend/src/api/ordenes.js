import api from "./api";

export const obtenerOrdenes = async () => {
  const res = await api.get("/ordenes");
  
  return res.data;
};

export const obtenerOrden = async (id) => {
  const res = await api.get(`/ordenes/${id}`);
  console.log(res)
  return res.data;
};

export const completarDetalle = async (id) => {
  const res = await api.patch(`/ordenes/detalles/${id}`);
  return res.data;
};
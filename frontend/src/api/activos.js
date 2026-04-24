import api from "./api";

export const obtenerActivos = async () => {
  const res = await api.get("/activos");
  return res.data;
};
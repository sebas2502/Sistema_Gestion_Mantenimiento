import api from "./api";

export const obtenerIncidencias = async () => {
  const res = await api.get("/incidencias");
  return res.data;
};

export const crearIncidencia = async (data) => {
  const res = await api.post("/incidencias", data);
  return res.data;
};
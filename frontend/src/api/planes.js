import api from "./api";



export const ejecutarPlanes = async () => {
  try {
    const res = await api.post('/planes/ejecutar');

    return res.data; 
  } catch (error) {
    console.error("ERROR BACK:", error.response?.data);

    throw new Error(
      error.response?.data?.error || "Error al ejecutar planes"
    );
  }
};

export const crearPlan = async (data) => {
  return await api.post('/planes/crear', data);
};

export const desactivarPlan = async (id) => {
  return await api.patch(
    `/planes/${id}/desactivar`
  );
};

export const obtenerPlanes = async () => {

  try {
    const res = await api.get('/planes');
    
    return res.data; 
  } catch (error) {
    console.error("ERROR BACK:", error.response?.data);

    throw new Error(
      error.response?.data?.error || "Error al obtener planes"
    );
  }
};